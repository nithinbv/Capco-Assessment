import { Component, OnInit } from "@angular/core";
import { HttpClient } from '@angular/common/http';

@Component({
    templateUrl: 'infinite.component.html'
})
export class InfiniteComponent implements OnInit {

    private gridApi;
    private gridColumnApi;
    private columnDefs;
    private components;
    private rowBuffer;
    private rowSelection;
    private rowModelType;
    private paginationPageSize;
    private cacheOverflowSize;
    private maxConcurrentDatasourceRequests;
    private infiniteInitialRowCount;
    private maxBlocksInCache;
    apiHost: string = '/assets/sample_data.json';
    
    constructor(private httpClient: HttpClient) {
        this.columnDefs =
            this.ConstructColumnDefination();
        this.rowBuffer = 0;
        this.rowSelection = "multiple";
        this.rowModelType = "infinite";
        this.paginationPageSize = 20;
        this.cacheOverflowSize = 2;
        this.maxConcurrentDatasourceRequests = 2;
        this.infiniteInitialRowCount = 1;
        this.maxBlocksInCache = 2;
        this.components = {
            loadingRenderer: function(params) {
            if (params.value !== undefined) {
            return params.value;
            } else {
            return '<img src="../images/download.gif">';
            }
            }
        }
            
    }

    ngOnInit() { }

    ConstructColumnDefination(): any 
    { 
        return [
            { headerName: "Name", field: "name", width: 150, tooltipField: "name" }, 
            { headerName: "Phone", field: "phone", width: 140 }, 
            { headerName: "Email", field: "email", width: 120, tooltipField: "email" }, 
            { headerName: "Company", field: "company", width: 120, tooltipField: "company" }, 
            { headerName: "Date Entry", field: "date_entry", width: 150, tooltipField: "date_entry", }, 
            { headerName: "Org Number", field: "org_num", width: 150, tooltipField: "org_num", }, 
            { headerName: "Address", field: "address_1", width: 120, tooltipField: "address_1" },
            { headerName: "City", field: "city", width: 120, tooltipField: "city" },
            { headerName: "Zip", field: "zip", width: 120, tooltipField: "zip" }, 
            { headerName: "GEO", field: "geo", width: 120, tooltipField: "geo" }, 
            { headerName: "PAN", field: "pan", width: 120, tooltipField: "pan" }, 
            { headerName: "PIN", field: "pin", width: 120, tooltipField: "pin" },
            { headerName: "Id", field: "id", width: 80 }, 
            { headerName: "Status", field: "status", width: 120, tooltipField: "status" }, 
            { headerName: "Fee", field: "fee", width: 120, tooltipField: "fee" },
            { headerName: "Guid", field: "guid", width: 120, tooltipField: "guid" },
            { headerName: "Date Exit", field: "date_exit", width: 120, tooltipField: "date_exit" }, 
            { headerName: "Date First", field: "date_first", width: 120, tooltipField: "date_first" },
            { headerName: "Date Recent", field: "date_recent", width: 150, tooltipField: "date_recent" }, 
            { headerName: "URL", field: "url", width: 200, tooltipField: "url" }]; 
        }

        onGridReady(params) 
        {
            console.log("asking for ");params.endRow = 50;
            console.log(params.endRow );
            this.gridApi = params.api;
            this.gridColumnApi = params.columnApi;
            
            this.httpClient.get(this.apiHost)
            .subscribe((res: any) => 
                {
                    let data = {
                                rowCount: null,
                                getRows: function(params)
                                {
                                    console.log("asking for " + params.startRow + " to " + params.endRow);
                                    setTimeout(function() 
                                    {
                                        var rowsThisPage = res.slice(params.startRow, params.endRow);
                                        var lastRow = -1;
                                        if (res.length <= params.endRow) 
                                        {
                                            lastRow = res.length;
                                        }
                                        params.successCallback(rowsThisPage, lastRow);
                                    }, 500);
                                }
                            };
                            params.api.setDatasource(data); 
                        });
                }
}


import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GridOptions } from 'ag-grid';
import { ColDef } from 'ag-grid/main';
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/catch'
import { ClickableComponent } from '../shared/clickable.component';
import { PagerService } from '../services/pager.services';

@Component({
    templateUrl: 'normal.component.html',
    styleUrls: ['normal.component.css']
})
export class NormalComponent implements OnInit {
         gridOptions: GridOptions; 
         rowData: any = {}; 
         columnDefs: any[]; 
         apiHost: string = '/assets/sample_data.json';
         pager: any = {};
         pageditems: any[];

        constructor(private httpClient:HttpClient,private pagerService: PagerService) 
        {//Defining data for columns
            this.columnDefs = this.ConstructColumnDefination();
        }  

        ngOnInit() 
        { 
            this.LoadData(); 
            this.gridOptions = <GridOptions>
            { 
                onGridReady: () => 
                { 
                    this.gridOptions.api.sizeColumnsToFit(); 
                } 
            }; 
        }

        ConstructColumnDefination(): any{ 
            return [
                { headerName: "", field: "id", cellRendererFramework: ClickableComponent, width: 140 }, 
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

        LoadData()
        { 
            this.httpClient.get(this.apiHost)
                    .map((response: Response) => response)
                    .subscribe(data => {
                        // set items to json response
                        this.rowData = data;

                        // initialize to page 1
                        this.setPage(1);
                    });

                setTimeout(() => 
                { 
                    this.setPage(1); 
                }, 1000); 
        }

        setPage(page: number) {
            if (page < 1 || page > this.pager.totalPages) { return; }
            // get pager object from service
            this.pager = this.pagerService.getPager(this.rowData.length, page);
            // get current page of items
            this.pageditems = this.rowData.slice(this.pager.startIndex, this.pager.endIndex + 1);
        }
}

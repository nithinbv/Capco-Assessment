import { Component, EventEmitter, Input, Output } from "@angular/core"; 
import { ICellRendererAngularComp } from "ag-grid-angular";


@Component(
    { selector: 'child-cell', 
      template: `<span><button style="height: 20px" (click)="postRequest()" class="btn btn-info">Status</button></span>`, 
      styles: [`.btn {line-height: 0.5}`] }) 

export class ClickableComponent implements ICellRendererAngularComp {
    public params: any;

    agInit(params: any): void 
    { 
        this.params = params; 
    }
    
    public postRequest() 
    {
         alert("postRequest/ " + this.params.value); 
    }

    refresh(): boolean 
    { 
        return false; 
    }
}
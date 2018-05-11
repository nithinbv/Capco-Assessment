import {NgModule} from "@angular/core";
import {BrowserModule} from "@angular/platform-browser";
import {FormsModule} from "@angular/forms";
import {HttpClientModule} from "@angular/common/Http";
// ag-grid
import {AgGridModule} from "ag-grid-angular/main";
// application
import {AppComponent} from "./app.component";

//Routing
import { AppRountingModule } from "./app-rounting.module";

// Component grid
import { NormalComponent } from '../app/normal-component/normal.component';
import { InfiniteComponent } from '../app/infinite-component/infinite.component';

//Services
import { PagerService } from '../app/services/pager.services';

//Shared 
import { ClickableComponent } from '../app/shared/clickable.component';

@NgModule({
    imports: [
        BrowserModule,
        FormsModule,
        AppRountingModule,
        HttpClientModule,
        AgGridModule.withComponents(
            [
              ClickableComponent
            ])
    ],
    declarations: [
        AppComponent,
        NormalComponent,
        InfiniteComponent ,     
        ClickableComponent 
    ],
    providers:[PagerService],
    bootstrap: [AppComponent]
})
export class AppModule {
}

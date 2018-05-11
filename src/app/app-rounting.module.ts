import{ NgModule } from '@angular/core';
import{ RouterModule,Routes, Route } from '@angular/router';

import { NormalComponent } from '../app/normal-component/normal.component';
import { InfiniteComponent } from '../app/infinite-component/infinite.component';

const routes: Routes = [
    { path: '',redirectTo:'/normal',pathMatch:'full'},
    { path: 'normal', component: NormalComponent},
    { path:'infinite',component: InfiniteComponent}
];

@NgModule({
    imports : [RouterModule.forRoot(routes)],
    exports : [RouterModule]
})

export class AppRountingModule {}


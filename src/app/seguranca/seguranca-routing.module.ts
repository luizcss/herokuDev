import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginFormComponent } from './login/login.component';

const routes: Routes = [
    {path: 'login', component: LoginFormComponent},
];

@NgModule({
    imports: [
        RouterModule.forChild(routes)
    ],
    exports: [RouterModule]
})
export class SegurancaRoutingModule{

}
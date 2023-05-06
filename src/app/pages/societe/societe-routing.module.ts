import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SocieteComponent } from './societe.component';
import { PopupComponent } from "./popup/popup.component";
import {AddSocieteComponent } from "./add-societe/add-societe.component";
const routes: Routes = [
  {
    path: '',
    component: SocieteComponent,
  
  children: [
    {
      path: 'popup',
      component: PopupComponent,
    },
    {
      path: 'add-societe',
      component: AddSocieteComponent,
    },
  ],},
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
  ],
  exports: [
    RouterModule,
  ],
})
export class SocieteRoutingModule {
}

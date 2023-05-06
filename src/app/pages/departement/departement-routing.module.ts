import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DepartementComponent } from './departement.component';
import { AddDepartementComponent } from "./add-departement/add-departement.component";
import { EditDepartementComponent } from "./edit-departement/edit-departement.component";
const routes: Routes = [
  {
    path: '',
    component: DepartementComponent,
  
  children: [
    {
      path: 'add-departement',
      component: AddDepartementComponent,
    },
    {
      path: 'edit-departement',
      component: EditDepartementComponent,
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
export class DepartementRoutingModule {
}


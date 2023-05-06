import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProjetComponent } from "./projet.component";
import { AddProjetComponent } from "./add-projet/add-projet.component";
import { EditProjetComponent } from "./edit-projet/edit-projet.component";
const routes: Routes = [
  {
    path: '',
    component: ProjetComponent,
  
  children: [
    {
      path: 'add-Projet',
      component: AddProjetComponent,
    },
    {
      path: 'edit-Projet',
      component: EditProjetComponent,
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
export class ProjetRoutingModule { }
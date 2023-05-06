import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TacheComponent } from "./tache.component";
import { AddTacheComponent } from "./add-tache/add-tache.component";
import { EditTacheComponent } from "./edit-tache/edit-tache.component";
const routes: Routes = [
  {
    path: '',
    component: TacheComponent,
  
  children: [
    {
      path: 'add-Tache',
      component: AddTacheComponent,
    },
    {
      path: 'edit-Tache',
      component: EditTacheComponent,
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
export class TacheRoutingModule { }
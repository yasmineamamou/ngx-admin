import { DepartementComponent } from './departement/departement.component';
import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { PagesComponent } from './pages.component';
import { SocieteComponent } from "./societe/societe.component";
import { TypeComponent } from "./type/type.component"; 
import { TacheComponent } from "./tache/tache.component";
import { ProjetComponent } from "./projet/projet.component";
import { UserComponent } from "./user/user.component";
import { FactureComponent } from './facture/facture.component';
const routes: Routes = [{
  path: '',
  component: PagesComponent,
  children: [
    {
      path: 'Departement',
      component: DepartementComponent,
    },
    {
      path: 'Societe',
      component: SocieteComponent,
    },
    {
      path: 'Type',
      component: TypeComponent,
    },
    {
      path: 'Employer',
      component: UserComponent,
    },
    {
      path: 'Tache',
      component: TacheComponent,
    },
    {
      path: 'Projet',
      component: ProjetComponent,
    },
    {
      path: 'Facture',
      component: FactureComponent,
    },
    {
      path: '',
      redirectTo: 'Type',
      pathMatch: 'full',
    },
    {
      path: '**',
      component: TypeComponent,
    },
  ],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesRoutingModule { }
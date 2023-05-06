import { DepartementComponent } from './departement/departement.component';
import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { NotFoundComponent } from './miscellaneous/not-found/not-found.component';
import { SocieteComponent } from "./societe/societe.component";
import { TypeComponent } from "./type/type.component";
import { CompteComponent } from './compte/compte.component';
import { TacheComponent } from "./tache/tache.component";
import { ProjetComponent } from "./projet/projet.component";
const routes: Routes = [{
  path: '',
  component: PagesComponent,
  children: [
    {
      path: 'iot-dashboard',
      component: DashboardComponent,
    },
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
      path: 'Compte',
      component: CompteComponent,
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
      path: 'miscellaneous',
      loadChildren: () => import('./miscellaneous/miscellaneous.module')
        .then(m => m.MiscellaneousModule),
    },
    {
      path: '',
      redirectTo: 'Departement',
      pathMatch: 'full',
    },
    {
      path: '**',
      component: NotFoundComponent,
    },
  ],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesRoutingModule { }
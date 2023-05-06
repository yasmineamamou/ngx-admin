
import { NgModule } from '@angular/core';
import { NbMenuModule } from '@nebular/theme';
import { DepartementModule } from "./departement/departement.module";
import { ThemeModule } from '../@theme/theme.module';
import { PagesComponent } from './pages.component';
import { DashboardModule } from './dashboard/dashboard.module';
import { PagesRoutingModule } from './pages-routing.module';
import { MiscellaneousModule } from './miscellaneous/miscellaneous.module';
import { SocieteModule } from "./societe/societe.module";
import { TypeModule } from "./type/type.module";
import { CompteModule } from "./compte/compte.module";
import { TacheModule } from "./tache/tache.module";
import { ProjetModule } from "./projet/projet.module";
@NgModule({
  imports: [
    PagesRoutingModule,
    ThemeModule,
    NbMenuModule,
    DashboardModule,
    DepartementModule,
    MiscellaneousModule, 
    TypeModule,
    CompteModule,
    SocieteModule,
    TacheModule,
    ProjetModule,
    
  ],
  declarations: [
    PagesComponent,
  ],
})
export class PagesModule {
}

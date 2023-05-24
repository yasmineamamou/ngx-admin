
import { NgModule } from '@angular/core';
import { NbMenuModule } from '@nebular/theme';
import { DepartementModule } from "./departement/departement.module";
import { ThemeModule } from '../@theme/theme.module';
import { PagesComponent } from './pages.component';
import { PagesRoutingModule } from './pages-routing.module';
import { SocieteModule } from "./societe/societe.module";
import { TypeModule } from "./type/type.module";
import { TacheModule } from "./tache/tache.module";
import { ProjetModule } from "./projet/projet.module";
import { UserModule } from "./user/user.module";
import { FactureModule } from "./facture/facture.module";
@NgModule({
  imports: [
    PagesRoutingModule,
    ThemeModule,
    NbMenuModule,
    DepartementModule,
    TypeModule, 
    SocieteModule,
    TacheModule,
    ProjetModule,
    UserModule,
    FactureModule,
  ],
  declarations: [
    PagesComponent,
  ],
})
export class PagesModule {
}

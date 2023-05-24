import { NgModule } from '@angular/core';
import { 
  NbCardModule,
  NbIconModule,
  NbInputModule,
  NbTreeGridModule
} from '@nebular/theme';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { NgxEchartsModule } from 'ngx-echarts';
import { FormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
import { ThemeModule } from '../../@theme/theme.module';
import { UserComponent } from "./user.component";
import { AddUserComponent } from "./add-user/add-user.component";
import { EditUserComponent } from './edit-user/edit-user.component';
import { ReactiveFormsModule } from '@angular/forms';
@NgModule({
  imports: [
    NbCardModule,
    NbTreeGridModule,
    NbIconModule,
    NbInputModule,
    ThemeModule,
    Ng2SmartTableModule,
    NgxEchartsModule,
    FormsModule,
    NgxPaginationModule,
    ReactiveFormsModule
  ],
  declarations: [
    UserComponent,
    AddUserComponent,
    EditUserComponent,
  ],
})
export class UserModule { }

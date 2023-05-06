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
import { TypeComponent } from "./type.component";
import { AddTypeComponent } from "./add-type/add-type.component";
import { EditTypeComponent } from './edit-type/edit-type.component';
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
  ],
  declarations: [
    TypeComponent,
    AddTypeComponent,
    EditTypeComponent,
  ],
})
export class TypeModule { }

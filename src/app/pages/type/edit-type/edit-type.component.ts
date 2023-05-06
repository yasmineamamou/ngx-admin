import { Component, Inject } from '@angular/core';
import { TypeService } from '../../../services/type.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { TypeComponent } from "../type.component";
@Component({
  selector: 'ngx-edit-type',
  templateUrl: './edit-type.component.html',
  styleUrls: ['./edit-type.component.scss']
})
export class EditTypeComponent {
  type_nom: any;
  editedTypName: string;
  type: any;

  constructor(private typeService: TypeService, public dialog: MatDialogRef<TypeComponent>, @Inject(MAT_DIALOG_DATA) public data: any) { }

  async ngOnInit() {
    await this.typeService.getTypeById(this.data).then(async data => {
      this.type = data.data;
      console.log(this.type)
      this.type_nom = this.type.attributes.type;
    })
  }
  close() {
    this.dialog.close({ success: true });
  }
  async editType() {
    console.log(this.editedTypName);
    let typData = { type: this.type_nom};
    await this.typeService.editType(this.type.id, typData).then(res => {
      console.log("new typ " + res.data);
      this.dialog.close({ success: true, type: res.data });
    }).catch(err => {
      console.log(err);
    });
    location.reload();
  }
}
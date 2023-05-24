import { Component, Inject } from '@angular/core';
import { TypeService } from '../../../services/type.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { TypeComponent } from "../type.component";
import { NbToastrService } from '@nebular/theme';
@Component({
  selector: 'ngx-edit-type',
  templateUrl: './edit-type.component.html',
  styleUrls: ['./edit-type.component.scss']
})
export class EditTypeComponent {
  type_nom: any;
  editedTypName: string;
  type: any;
  errorMessage: string;

  constructor(private typeService: TypeService, private toastrService: NbToastrService, public dialog: MatDialogRef<TypeComponent>, @Inject(MAT_DIALOG_DATA) public data: any) { }

  async ngOnInit() {
    await this.typeService.getTypeById(this.data).then(async data => {
      this.type = data.data;
      console.log(this.type)
      this.type_nom = this.type.attributes.type;
    })
  }
  async editType() {
    if (this.type_nom.trim() ===''){
      this.toastrService.warning("Erreur!! Veuillez écrire quelque chose", "Champs obligatoires");
    }
    else{
    console.log(this.editedTypName);
    let typData = { type: this.type_nom};
    await this.typeService.editType(this.type.id, typData).then(res => {
      console.log("new typ " + res.data);
      this.dialog.close({ success: true, type: res.data });
      this.toastrService.success("Type modifier", "Modification");
    }).catch(err => {
      this.toastrService.danger("Erreur!! can't create type", "Erreur"); 
    });
  }
  }
}
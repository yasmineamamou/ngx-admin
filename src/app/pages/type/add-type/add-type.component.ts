import { Component, Inject } from '@angular/core';
import { TypeService } from "./../../../services/type.service";
import { NbToastrService } from '@nebular/theme';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { TypeComponent } from '../type.component';
@Component({
  selector: 'ngx-add-type',
  templateUrl: './add-type.component.html',
  styleUrls: ['./add-type.component.scss']
})
export class AddTypeComponent {
  type_nom: any;
  newTypeName: string='';  
  errorMessage: string;

  constructor(private typeService: TypeService, private toastrService: NbToastrService, public dialog: MatDialogRef<TypeComponent>, @Inject(MAT_DIALOG_DATA) public data: any){}
 
  ngOnInit() {
  }
  async addType() {
    if (this.newTypeName.trim() ==''){
      this.toastrService.warning("Erreur!! Veuillez écrire quelque chose", "Champs obligatoires");
    }
    else{
    console.log(this.newTypeName);
    let typeData = { type: this.newTypeName};
    await this.typeService.addType(typeData).then(res => {
      console.log("new typ "+res.data);
        this.newTypeName = ""
        this.dialog.close({ success: true, type: res.data });
        this.toastrService.success("Type crée", "Création");
    }).catch(err => {
         this.toastrService.danger("Erreur!! can't create type", "Erreur");
         this.errorMessage = "Vous n'avez pas le droit pour cette action.";
    });}
  }
}
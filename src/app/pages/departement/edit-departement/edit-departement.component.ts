import { Component, Inject } from '@angular/core';
import { DepartementService } from './../../../services/departement.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DepartementComponent } from "./../departement.component";
import { NbToastrService } from '@nebular/theme';
@Component({
  selector: 'ngx-edit-departement',
  templateUrl: './edit-departement.component.html',
  styleUrls: ['./edit-departement.component.scss']
})
export class EditDepartementComponent {
  dep_nom: any;
  editedDepName: string;
  departement: any;
  societiesList: any[] = [];

  constructor(private departementService: DepartementService, private toastrService: NbToastrService, public dialog: MatDialogRef<DepartementComponent>, @Inject(MAT_DIALOG_DATA) public data: any) { }

  async ngOnInit() {
    await this.departementService.getDepartementById(this.data).then(async data => {
      this.departement = data.data;
      console.log(this.departement)
      this.dep_nom = this.departement.attributes.nom;
      await this.departementService.getSocietes().then(res => {
        this.societiesList = res.data;
        console.log(this.societiesList);
        let id_soc =this.departement.attributes.societe.data.id;
        this.societiesList.forEach(element => {
          if(element.id == id_soc){
            element.checked =true;
          }else{
            element.checked =false;
          }
        })
        console.log(this.societiesList);
      })
    })
  }
  async editDepartement() {
    if (this.dep_nom.trim() ===''){
      this.toastrService.warning("Erreur!! Veuillez écrire quelque chose", "Champs obligatoires");
    }
    else{
    console.log(this.editedDepName);
    let depSocietes: any[] = [];
    this.societiesList.forEach(element => {
      if (element.checked == true) {
        depSocietes=element;
        console.log(element)
      }
    });
    console.log("list soci dep " + depSocietes);

    let depData = { nom: this.dep_nom, societe: depSocietes};
    await this.departementService.editDepartement(this.departement.id, depData).then(res => {
      console.log("new dep " + res.data);
      this.dialog.close({ success: true, departement: res.data });
      this.toastrService.success("Departement modifier", "Modification");
    }).catch(err => {
      this.toastrService.danger("Erreur!! can't Modify Departement", "Erreur");
    });
  }}
  async selectSociety(societe){
    this.societiesList.forEach(element => {
      if (element.id == societe.id) {
        element.checked = true;
      }else{
        element.checked = false;
      }
    });
  } 
}

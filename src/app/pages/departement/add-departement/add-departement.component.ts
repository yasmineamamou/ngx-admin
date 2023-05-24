import { Component, EventEmitter, Inject, Output } from '@angular/core';
import { DepartementService } from './../../../services/departement.service';
import { NbToastrService } from '@nebular/theme';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { DepartementComponent } from '../departement.component';
@Component({
  selector: 'ngx-add-departement',
  templateUrl: './add-departement.component.html',
  styleUrls: ['./add-departement.component.scss']
})
export class AddDepartementComponent {
  newDepName: string='';
  societe_nom: any;
  errorMessage: string;

  constructor(private departementService: DepartementService, private toastrService: NbToastrService, public dialog: MatDialogRef<DepartementComponent>, @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit() {
    this.getSocietes();
  }
  async addDepartement() {
    let depSocietes: any[] = [];
    this.societe_nom.forEach(element => {
      if (element.checked == true) {
        depSocietes.push(element);
      }
    });

    if (this.newDepName.trim() ==='' || depSocietes.length ==0){
      this.toastrService.warning("Erreur!! Veuillez écrire quelque chose", "Champs obligatoires");
    }
    else{
    let departementData = { nom: this.newDepName, societe: depSocietes};
    await this.departementService.addDepartement(departementData).then(res => {
      console.log("new dep " + res.data);
      this.getSocietes();
      this.newDepName = '';
      this.dialog.close({ success: true, departement: res.data });
      this.toastrService.success("Departement crée", "Création"); 
     
    }).catch(err => {
      this.toastrService.danger("Erreur!! can't create Departement", "Erreur");
      this.errorMessage = "Vous n'avez pas le droit pour cette action.";
    });
  }
  }
  async getSocietes() {
    await this.departementService.getSocietes().then(res => {
      this.societe_nom = res.data;
      this.societe_nom.forEach(soci => {
        soci.societiesList = soci.attributes.societe.data;
        console.log(JSON.stringify(soci.societiesList));
      });
    }).catch(err => {
      console.log(err);
    });
  }
  async selectSociety(societe){
    societe.checked = !societe.checked;
  }

}
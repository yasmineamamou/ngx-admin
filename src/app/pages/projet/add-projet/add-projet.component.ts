import { Component, EventEmitter, Inject, Output  } from '@angular/core';
import { ProjetService } from "./../../../services/projet.service";
import { NbToastrService } from '@nebular/theme';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ProjetComponent } from '../projet.component';

@Component({
  selector: 'ngx-add-projet',
  templateUrl: './add-projet.component.html',
  styleUrls: ['./add-projet.component.scss']
})
export class AddProjetComponent {
  soci_nom: any;
  newProjetName: string='';
  newProjetDescription: string=''; 
  newProjetDebut: Date;
  newProjetFin: Date;
  newProjetCout: any=0;
  dep_nom: any;
  selectedDepartementId: any;

  constructor(private projetService: ProjetService, private toastrService: NbToastrService, public dialog: MatDialogRef<ProjetComponent>, @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit() {
    this.getSocietes();
    this.getDepartements();
  }
  async addProjet() {
    let projetSociete: any[]=[];
    this.soci_nom.forEach(element => {
      if(element.checked == true){
        projetSociete.push(element);
      }
    });
    let projetDepartement: any[]=[];
    this.dep_nom.forEach(element => {
      if(element.checked == true){
        projetDepartement.push(element);
      }
    });
    if (this.newProjetName.trim() ==='' || this.newProjetCout==0|| projetSociete.length ==0 || projetDepartement.length ==0 ||this.newProjetDescription.trim()===''  || !this.newProjetDebut || !this.newProjetFin){
      this.toastrService.warning("Erreur!! Veuillez écrire quelque chose", "Champs obligatoires");
    }
    else{
    let projetData = { nom_projet: this.newProjetName , Description: this.newProjetDescription, date_debut: this.newProjetDebut, date_fin: this.newProjetFin, estimation_cout: this.newProjetCout, societe: projetSociete, departement: projetDepartement};
    await this.projetService.addProjet(projetData).then(res => {
        console.log("new projet "+res.data);
        this.getSocietes();
        this.getDepartements();
        this.newProjetName = '';
        this.newProjetDescription = '';
        this.newProjetCout = 0;
        this.dialog.close({ success: true, projet: res.data });
        this.toastrService.success("projet crée", "Création"); 
       
      }).catch(err => {
        this.toastrService.danger("Erreur!! can't create projet", "Erreur");
      });}
  }
  async getSocietes() {
    await this.projetService.getSocietes().then(res => {
      this.soci_nom = res.data;
      this.soci_nom.forEach(soci => {
        soci.societesList = soci.attributes.societes.data;
        console.log(JSON.stringify(soci.societesList));
        }); 
    }).catch(err => {
        console.log(err);
    });
  }
  async selectSociete(societe){
    societe.checked = !societe.checked;
  }
  async getDepartements() {
    await this.projetService.getDepartements().then(res => {
      this.dep_nom = res.data;
      this.dep_nom.forEach(dep => {
        dep.departementsList = dep.attributes.departement.data;
        console.log(JSON.stringify(dep.departementsList));
        }); 
    }).catch(err => {
        console.log(err);
    });
  }
  async selectDepartement(departement) {
    this.dep_nom.forEach((dep) => {
      if (dep.id === departement.id) {
        dep.checked = true;
        this.selectedDepartementId = dep.id;
      } else {
        dep.checked = false;
      }
    });
  }
}

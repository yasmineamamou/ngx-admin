import { Component, Inject } from '@angular/core';
import { ProjetComponent } from "../projet.component";
import { ProjetService } from "../../../services/projet.service";
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NbToastrService } from '@nebular/theme';
@Component({
  selector: 'ngx-edit-projet',
  templateUrl: './edit-projet.component.html',
  styleUrls: ['./edit-projet.component.scss']
})
export class EditProjetComponent {
  projet_nom: any;
  projet_description: any;
  projet_debut: any;
  projet_cout: any;
  projet_fin: any;
  editedProjetName: string;
  editedProjetDescription: string;
  editedProjetDebut: any;
  editedProjetFin: any;
  editedProjetCout: any;
  projet: any;
  societesList: any[]=[];
  departementsList: any[] = [];
  
  constructor(private projetService: ProjetService, private toastrService: NbToastrService, public dialog: MatDialogRef<ProjetComponent>, @Inject(MAT_DIALOG_DATA) public data: any) { }
  
  async ngOnInit() {
    await this.projetService.getProjetsById(this.data).then(async data => {
      this.projet = data.data;
      console.log(this.projet)
      this.projet_nom = this.projet.attributes.nom_projet;
      this.projet_description = this.projet.attributes.Description;
      this.projet_debut = this.projet.attributes.date_debut;
      this.projet_fin = this.projet.attributes.date_fin;
      this.projet_cout = this.projet.attributes.estimation_cout;
      await this.projetService.getSocietes().then(res=>{
        this.societesList = res.data;
        console.log(this.societesList);
        let id_soc =this.projet.attributes.societe.data.id;
        this.societesList.forEach(element => {
          if(element.id == id_soc){
            element.checked =true;
          }else{
            element.checked =false;
          }
        })
        console.log(this.societesList);
      })
      await this.projetService.getDepartements().then(res=>{
        this.departementsList = res.data;
        console.log(this.departementsList);
        let id_dep =this.projet.attributes.departement.data.id;
        this.departementsList.forEach(element => {
          if(element.id == id_dep){
            element.checked =true;
          }else{
            element.checked =false;
          }
        })
        console.log(this.departementsList);
      })
    })
  }
  async editProjet() {
  
    if(this.projet_nom.trim() ===''|| this.projet_description.trim() ===''|| this.projet_cout==0 || !this.projet_fin || !this.projet_debut){
        this.toastrService.warning("Erreur!! Veuillez écrire quelque chose", "Champs obligatoires");
    }
    else{
      let projetsocietes: any[] = [];
      this.societesList.forEach(element => {
        if (element.checked == true) {
          projetsocietes=element;
          console.log(element)
        }
      });
      let projetdepartements: any[] = [];
      this.departementsList.forEach(element => {
        if (element.checked == true) {
          projetdepartements=element;
          console.log(element)
        }
      });
    let ProjetData = { nom_projet: this.projet_nom , Description: this.projet_description, date_debut: this.projet_debut, date_fin: this.projet_fin, estimation_cout: this.projet_cout, departement: projetdepartements, societe: projetsocietes};
    await this.projetService.editProjet(this.projet.id, ProjetData).then(res => {
      console.log("new projet " + res.data);
      this.dialog.close({ success: true, projet: res.data });
      this.toastrService.success("Projet modifier", "Modification");

    }).catch(err => {
      this.toastrService.danger("Erreur!! can't Modify Projet", "Erreur");
    });}
  }
  async selectSociete(societe){
    this.societesList.forEach(element => {
      if(element.id == societe.id){
        element.checked = true;
      }else{
        element.checked =false;
      }
    });
  }
  async selectDepartement(departement){
    this.departementsList.forEach(element => {
      if(element.id == departement.id){
        element.checked = true;
      }else{
        element.checked =false;
      }
    });
  }
}

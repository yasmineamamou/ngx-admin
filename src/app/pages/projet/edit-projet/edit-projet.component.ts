import { Component, Inject } from '@angular/core';
import { ProjetComponent } from "../projet.component";
import { ProjetService } from "../../../services/projet.service";
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
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
  
  constructor(private projetService: ProjetService, public dialog: MatDialogRef<ProjetComponent>, @Inject(MAT_DIALOG_DATA) public data: any) { }
  
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
    })
  }
  async editProjet() {
    console.log(this.editedProjetName, this.editedProjetDescription, this.editedProjetDebut, this.editedProjetFin, this.editedProjetCout);
    let projetsocietes: any[] = [];
    this.societesList.forEach(element => {
      if (element.checked == true) {
        projetsocietes=element;
        console.log(element)
      }
    });
    console.log("list projet soci " + projetsocietes);

    let ProjetData = { nom_projet: this.projet_nom , Description: this.projet_description, date_debut: this.projet_debut, date_fin: this.projet_fin, estimation_cout: this.projet_cout, societe: projetsocietes};
    await this.projetService.editProjet(this.projet.id, ProjetData).then(res => {
      console.log("new projet " + res.data);
      this.dialog.close({ success: true, projet: res.data });
    }).catch(err => {
      console.log(err);
    });
    location.reload();
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
}

import { Component, Inject } from '@angular/core';
import { CompteComponent } from "../compte.component";
import { CompteService } from "../../../services/compte.service";
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'ngx-edit-compte',
  templateUrl: './edit-compte.component.html',
  styleUrls: ['./edit-compte.component.scss']
})
export class EditCompteComponent {
  compte: any;
  compte_nom: any;
  departementsList: any[]=[];
  societesList: any[]=[];
  compte_email: any;
  compte_telephone: any;
  compte_user_name: any;
  editedCompteTelephone: string;
  editedCompteEmail: string;
  editedCompteNom: string;

  constructor(private compteService: CompteService, public dialog: MatDialogRef<CompteComponent>, @Inject(MAT_DIALOG_DATA) public data: any) { }

  async ngOnInit() {
    await this.compteService.getCompteById(this.data).then(async data => {
      this.compte = data.data;
      console.log(this.compte)
      this.compte_user_name = this.compte.attributes.user_name;
      this.compte_email = this.compte.attributes.email;
      this.compte_telephone = this.compte.attributes.telephone;
      
      await this.compteService.getSocietes().then(res => {
        this.societesList = res.data;
        console.log(this.societesList);
        let id_soc =this.compte.attributes.societe.data.id;
        this.societesList.forEach(element => {
          if(element.id == id_soc){
            element.checked =true;
          }else{
            element.checked =false;
          }
        })
        console.log(this.societesList);
      })
      await this.compteService.getDepartements().then(res => {
        this.departementsList = res.data;
        console.log(this.departementsList);
        let id_dep =this.compte.attributes.departements.data.id;
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
  async editCompte() {
    console.log(this.editedCompteNom, this.editedCompteEmail, this.editedCompteTelephone);
    let compSocietes: any[] = [];
    this.societesList.forEach(element => {
      if (element.checked == true) {
        compSocietes=element;
        console.log(element)
      }
    });
    console.log("list comp soci " + compSocietes);
    let compDepartements: any[] = [];
    this.departementsList.forEach(element => {
      if (element.checked == true) {
        compDepartements=element;
        console.log(element)
      }
    });
    console.log("list comp dep " + compDepartements);
    
    let compData = { user_name: this.compte_user_name, email: this.compte_email, telephone: this.compte_telephone, societe: compSocietes, departements: compDepartements};
    await this.compteService.editCompte(this.compte.id, compData).then(res => {
      console.log("new comp " + res.data);
      this.dialog.close({ success: true, compte: res.data });
    }).catch(err => {
      console.log(err);
    });
    location.reload();
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
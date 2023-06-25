import { Component, Inject } from '@angular/core';
import { TacheComponent } from "../tache.component";
import { TacheService } from "../../../services/tache.service";
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NbToastrService } from '@nebular/theme';
@Component({
  selector: 'ngx-edit-tache',
  templateUrl: './edit-tache.component.html',
  styleUrls: ['./edit-tache.component.scss']
})
export class EditTacheComponent {
  tache_nom: any;
  tache_description: any;
  tache_type: any;
  tache_cout: any;
  tache_nbre: any;
  editedTacheName: string;
  editedTacheDescription: string;
  editedTachetype: any;
  editedTacheCout: any;
  editedTacheNbre: any;
  tache: any;
  societesList: any[] = [];
  departementsList: any[] = [];
  tache_Date: any;
  editedTachedate: any;
  
  constructor(private tacheService: TacheService, private toastrService: NbToastrService, public dialog: MatDialogRef<TacheComponent>, @Inject(MAT_DIALOG_DATA) public data: any) { }
  
  async ngOnInit() {
    await this.tacheService.getTachesById(this.data).then(async data => {
      this.tache = data.data;
      console.log(this.tache)
      this.tache_nom = this.tache.attributes.nom_tache;
      this.tache_description = this.tache.attributes.Description;
      this.tache_Date = this.tache.attributes.date;
      this.tache_cout = this.tache.attributes.cout_par_piece;
      this.tache_nbre = this.tache.attributes.nombre_de_tache;
      await this.tacheService.getDepartements().then(res => {
        this.departementsList = res.data;
        console.log(this.departementsList);
        let id_dep =this.tache.attributes.departement.data.id;
        this.departementsList.forEach(element => {
          if(element.id == id_dep){
            element.checked =true;
          }else{
            element.checked =false;
          }
        })
        console.log(this.departementsList);
      })
      await this.tacheService.getSocietes().then(res => {
        this.societesList = res.data;
        console.log(this.societesList);
        let id_soc =this.tache.attributes.societe.data.id;
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
  async editTache() {
    if (this.tache_nom.trim() ==='' ||this.tache_nbre==0 || this.tache_cout==0){
      this.toastrService.warning("Erreur!! Veuillez écrire quelque chose", "Champs obligatoires");
    }
    else{
    console.log(this.editedTacheName, this.editedTacheDescription, this.editedTacheCout, this.editedTacheNbre, this.editedTachedate);
    let tacheDepartements: any;
    this.departementsList.forEach(element => {
      if (element.checked == true) {
        tacheDepartements=element;
        console.log(element)
      }
    });
    console.log("list tache dep " + tacheDepartements);
    let tacheSocietes: any;
    this.societesList.forEach(element => {
      if (element.checked == true) {
        tacheSocietes=element;
        console.log(element)
      }
    });
    console.log("list tache soci " + tacheSocietes);
    let TacheData = { nom_tache: this.tache_nom , Description: this.tache_description, cout_par_piece: this.tache_cout, date: this.tache_Date, nombre_de_tache: this.tache_nbre, societe: tacheSocietes, departement: tacheDepartements};
    await this.tacheService.editTache(this.tache.id, TacheData).then(res => {
      console.log("new tache " + res.data);
      this.dialog.close({ success: true, tache: res.data });
      this.toastrService.success("Tache modifier", "Modification");

  }).catch(err => {
       this.toastrService.danger("Erreur!! can't modify tache", "Erreur");
  });}
  }
  async selectSociety(societe){
    this.societesList.forEach(element => {
      if (element.id == societe.id) {
        element.checked = true;
      }else{
        element.checked = false;
      }
    });
  } 
  async selectDepartement(departement){
    this.departementsList.forEach(element => {
      if (element.id == departement.id) {
        element.checked = true;
      }else{
        element.checked = false;
      }
    });
  } 
}

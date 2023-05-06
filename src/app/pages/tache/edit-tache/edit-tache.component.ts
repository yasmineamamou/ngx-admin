import { Component, Inject } from '@angular/core';
import { TacheComponent } from "../tache.component";
import { TacheService } from "../../../services/tache.service";
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
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
  societesList: any;
  
  constructor(private tacheService: TacheService, public dialog: MatDialogRef<TacheComponent>, @Inject(MAT_DIALOG_DATA) public data: any) { }
  
  async ngOnInit() {
    await this.tacheService.getTachesById(this.data).then(async data => {
      this.tache = data.data;
      console.log(this.tache)
      this.tache_nom = this.tache.attributes.nom_tache;
      this.tache_description = this.tache.attributes.Description;
      this.tache_type = this.tache.attributes.type_tache;
      this.tache_cout = this.tache.attributes.cout_par_piece;
      this.tache_nbre = this.tache.attributes.nombre_de_tache;
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
    console.log(this.editedTacheName, this.editedTacheDescription, this.editedTacheCout, this.editedTacheNbre, this.editedTachetype);
    let tacheSocietes: any;
    this.societesList.forEach(element => {
      if (element.checked == true) {
        tacheSocietes=element;
        console.log(element)
      }
    });
    console.log("list tache soci " + tacheSocietes);
    let TacheData = { nom_tache: this.tache_nom , Description: this.tache_description, cout_par_piece: this.tache_cout, type_tache: this.tache_type, nombre_de_tache: this.tache_nbre, societe: tacheSocietes};
    await this.tacheService.editTache(this.tache.id, TacheData).then(res => {
      console.log("new tache " + res.data);
      this.dialog.close({ success: true, tache: res.data });
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

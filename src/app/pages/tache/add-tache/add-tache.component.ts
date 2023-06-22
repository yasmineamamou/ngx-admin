import { Component, EventEmitter, Inject, Output  } from '@angular/core';
import { TacheService } from "./../../../services/tache.service";
import { NbToastrService } from '@nebular/theme';
import { TacheComponent } from '../tache.component';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
@Component({
  selector: 'ngx-add-tache',
  templateUrl: './add-tache.component.html',
  styleUrls: ['./add-tache.component.scss']
})
export class AddTacheComponent {
  newTacheName: string='';
  newTacheDescription: string=''; 
  newTacheType: any='';
  newTacheNbre: any=0;
  newTacheCout: any=0;
  soci_nom: any;
  dep_nom: any;
  selectedDepartementId: any;
  user_nom: any;
  selectedUserId: any;
  newTacheDate: any;

  constructor(private tacheService: TacheService, private toastrService: NbToastrService, public dialog: MatDialogRef<TacheComponent>, @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit() {
    this.getSocietes();
    this.getDepartements();
  }
  async addTache() {
    let tacheSociete: any[]=[];
    this.soci_nom.forEach(element => {
      if(element.checked == true){
        tacheSociete.push(element);
      }
    });
    let tacheDepartement: any[]=[];
    this.dep_nom.forEach(element => {
      if(element.checked == true){
        tacheDepartement.push(element);
      }
    });
    if ( this.newTacheName.trim() ==='' || tacheSociete.length ==0 || tacheDepartement.length ==0 || this.newTacheCout==0 || this.newTacheNbre==0 || this.newTacheType.trim()===''){
      this.toastrService.warning("Erreur!! Veuillez écrire quelque chose", "Champs obligatoires");
    }
    else{
      
    let tacheData = { nom_tache: this.newTacheName , Description: this.newTacheDescription, date:this.newTacheDate, cout_par_piece: this.newTacheCout, type_tache: this.newTacheType, nombre_de_tache: this.newTacheNbre, departement: tacheDepartement, societe: tacheSociete};
    await this.tacheService.addTache(tacheData).then(res => {
        console.log("new tache "+res.data);
        this.getSocietes();
        this.getDepartements();

        this.newTacheName = '';
        this.newTacheDescription = '';
        this.newTacheCout = 0;
        this.newTacheType = '';
        this.newTacheNbre = 0;
        this.dialog.close({ success: true, tache: res.data });
      this.toastrService.success("Tache crée", "Création");
  }).catch(err => {
       this.toastrService.danger("Erreur!! can't Add tache", "Erreur");
  });}
  }
  async getSocietes() {
    await this.tacheService.getSocietes().then(res => {
      this.soci_nom = res.data;
      this.soci_nom.forEach(soci => {
        soci.societesList = soci.attributes.societe.data;
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
    await this.tacheService.getDepartements().then(res => {
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
  }}



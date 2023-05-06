import { Component, EventEmitter, Output } from '@angular/core';
import { CompteService } from '../../../services/compte.service';

@Component({
  selector: 'ngx-add-compte',
  templateUrl: './add-compte.component.html',
  styleUrls: ['./add-compte.component.scss']
})
export class AddCompteComponent {
  compte_nom: any;
  newCompteEmail: string;
  newCompteNom: any; 
  newComptePassword: any;
  newCompteTel: any;
  societe_nom: any;
  dep_nom: any;
  selectedDepartementId: any;
  selectedSocieteId: any;
  
  constructor(private compteService: CompteService){}
  @Output() onClose = new EventEmitter<void>();
  closeAddPopup() {
    this.onClose.emit();
  }
  ngOnInit() {
    this.getComptes();
    this.getSocietes();
    this.getDepartements();
  }
  async getComptes() {
    await this.compteService.getComptes().then(res => {
        this.compte_nom = res.data;
        this.compte_nom.forEach(comp => { 
          comp.societesList = comp.attributes.societe.data;
          console.log(JSON.stringify(comp.societesList));
        });
        this.compte_nom.forEach(comp => { 
          comp.departementsList = comp.attributes.departements.data;
          console.log(JSON.stringify(comp.departementsList));
        });
      })
      .catch(err => {
        console.log(err);
    });
  }
  async addCompte() {
    console.log(this.newCompteEmail);
    let compSocietes: any[]=[];
    this.societe_nom.forEach(element => {
      if(element.checked == true){
        compSocietes.push(element);
      }
    });
    console.log("list comp soci "+compSocietes);
    let compDepartements: any[]=[];
    this.dep_nom.forEach(element => {
      if(element.checked == true){
       compDepartements.push(element);
      }
    });
    console.log("list comp dep"+compDepartements);
    
    let compteData = { user_name: this.newCompteNom, telephone: this.newCompteTel, email: this.newCompteEmail , password: this.newComptePassword, societe: compSocietes, departements: compDepartements};
    await this.compteService.addCompte(compteData).then(res => {
      console.log("new comp "+res.data);
        this.getSocietes();
        this.getComptes();
        this.getDepartements();
        this.newCompteNom = '';
        this.newCompteTel = '';
        this.newCompteEmail = '';
        this.newComptePassword = '';
    }).catch(err => {
        console.log(err);
    });
    location.reload();
  }
  async getSocietes() {
    await this.compteService.getSocietes().then(res => {
      this.societe_nom = res.data;
      this.societe_nom.forEach(soci => {
        soci.societesList = soci.attributes.societes.data;
        console.log(JSON.stringify(soci.societesList));
        }); 
    }).catch(err => {
        console.log(err);
    });
  }
  async getDepartements() {
    await this.compteService.getDepartements().then(res => {
      this.dep_nom = res.data;
      this.dep_nom.forEach(dep => {
        dep.departementsList = dep.attributes.departements.data;
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
  async selectSociete(societe) {
    this.societe_nom.forEach((soc) => {
      if (soc.id === societe.id) {
        soc.checked = true;
        this.selectedSocieteId = soc.id;
      } else {
        soc.checked = false;
      }
    });
  }
  
}

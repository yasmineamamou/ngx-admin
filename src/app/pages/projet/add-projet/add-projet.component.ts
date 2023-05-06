import { Component, EventEmitter, Output  } from '@angular/core';
import { ProjetService } from "./../../../services/projet.service";

@Component({
  selector: 'ngx-add-projet',
  templateUrl: './add-projet.component.html',
  styleUrls: ['./add-projet.component.scss']
})
export class AddProjetComponent {
  soci_nom: any;
  newProjetName: string;
  newProjetDescription: any; 
  newProjetDebut: any;
  newProjetFin: any;
  newProjetCout: number;

  constructor(private projetService: ProjetService) { }
  @Output() onClose = new EventEmitter<void>();

  closeAddPopup() {
    this.onClose.emit();
  }
  ngOnInit() {
    this.getSocietes();
  }
  async addProjet() {
    console.log(this.newProjetName);
    let projetSociete: any[]=[];
    this.soci_nom.forEach(element => {
      if(element.checked == true){
        projetSociete.push(element);
      }
    });
    console.log("list projet soci"+projetSociete);

    let projetData = { nom_projet: this.newProjetName , Description: this.newProjetDescription, date_debut: this.newProjetDebut, date_fin: this.newProjetFin, estimation_cout: this.newProjetCout, societe: projetSociete};
    await this.projetService.addProjet(projetData).then(res => {
        console.log("new projet "+res.data);
        this.getSocietes();
        this.newProjetName = '';
        this.newProjetDescription = '';
        this.newProjetCout = 0;
        this.newProjetDebut = '';
        this.newProjetFin = '';
    }).catch(err => {
        console.log(err);
    });
    location.reload();
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
}

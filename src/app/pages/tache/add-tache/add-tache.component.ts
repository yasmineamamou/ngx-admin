import { Component, EventEmitter, Output  } from '@angular/core';
import { TacheService } from "./../../../services/tache.service";

@Component({
  selector: 'ngx-add-tache',
  templateUrl: './add-tache.component.html',
  styleUrls: ['./add-tache.component.scss']
})
export class AddTacheComponent {
  newTacheName: string;
  newTacheDescription: any; 
  newTacheType: any;
  newTacheNbre: any;
  newTacheCout: any;
  soci_nom: any;

  constructor(private tacheService: TacheService) { }
  @Output() onClose = new EventEmitter<void>();

  closeAddPopup() {
    this.onClose.emit();
  }
  ngOnInit() {
    this.getSocietes();
  }
  async addTache() {
    console.log(this.newTacheName);
    let tacheSociete: any[]=[];
    this.soci_nom.forEach(element => {
      if(element.checked == true){
        tacheSociete.push(element);
      }
    });
    console.log("list tache societe"+tacheSociete);

    let tacheData = { nom_tache: this.newTacheName , Description: this.newTacheDescription, cout_par_piece: this.newTacheCout, type_tache: this.newTacheType, nombre_de_tache: this.newTacheNbre, societe: tacheSociete};
    await this.tacheService.addTache(tacheData).then(res => {
        console.log("new tache "+res.data);
        this.getSocietes();
        this.newTacheName = '';
        this.newTacheDescription = '';
        this.newTacheCout = 0;
        this.newTacheType = '';
        this.newTacheNbre = 0;
    }).catch(err => {
        console.log(err);
    });
    location.reload();
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
}

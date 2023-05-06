import { Component, EventEmitter, Output } from '@angular/core';
import { DepartementService } from './../../../services/departement.service';
@Component({
  selector: 'ngx-add-departement',
  templateUrl: './add-departement.component.html',
  styleUrls: ['./add-departement.component.scss']
})
export class AddDepartementComponent {
  newDepName: string;
  societe_nom: any;
  selectedSocieteId: any;

  constructor(private departementService: DepartementService) { }

  @Output() onClose = new EventEmitter<void>();
  closeAddPopup() {
    this.onClose.emit();
  }
  ngOnInit() {
    this.getSocietes();
  }
  async addDepartement() {
    console.log(this.newDepName);
    let depSocietes: any[] = [];
    this.societe_nom.forEach(element => {
      if (element.checked == true) {
        depSocietes.push(element);
      }
    });
    console.log("list dep soc " + depSocietes);

    let departementData = { nom: this.newDepName, societe: depSocietes};
    await this.departementService.addDepartement(departementData).then(res => {
      console.log("new dep " + res.data);
      this.getSocietes();
      this.newDepName = '';
    }).catch(err => {
      console.log(err);
    });
    location.reload();
  }
  async getSocietes() {
    await this.departementService.getSocietes().then(res => {
      this.societe_nom = res.data;
      this.societe_nom.forEach(soci => {
        soci.societiesList = soci.attributes.societe.data;
        console.log(JSON.stringify(soci.societiesList));
      });
    }).catch(err => {
      console.log(err);
    });
  }
  async selectSociety(societe) {
    this.societe_nom.forEach((soci) => {
      if (soci.id === societe.id) {
        soci.checked = true;
        this.selectedSocieteId = soci.id;
      } else {
        soci.checked = false;
      }
    });
  }
}
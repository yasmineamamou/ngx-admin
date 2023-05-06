import { Component, EventEmitter, Output  } from '@angular/core';
import { SocieteService } from "../../../services/societe.service";
@Component({
  selector: 'ngx-add-societe',
  templateUrl: './add-societe.component.html',
  styleUrls: ['./add-societe.component.scss']
})
export class AddSocieteComponent {
  newSocieteName: string;
  newSocieteDescription: any; 
  type_nom: any;
  selectedTypeId: any;

  constructor(private societeService: SocieteService) { }
  @Output() onClose = new EventEmitter<void>();

  closeAddPopup() {
    this.onClose.emit();
  }
  ngOnInit() {
    this.getTypes();
  }
  async addSociete() {
    console.log(this.newSocieteName);
    let sociType: any[]=[];
    this.type_nom.forEach(element => {
      if(element.checked == true){
        sociType.push(element);
      }
    });
    console.log("list soc typ"+sociType);

    let societeData = { Nom: this.newSocieteName, Description:this.newSocieteDescription, types: sociType};
    await this.societeService.addSociete(societeData).then(res => {
        console.log("new soc "+res.data);
        this.getTypes();
        this.newSocieteName = '';
        this.newSocieteDescription = '';
    }).catch(err => {
        console.log(err);
    });
    location.reload();
  }
  async getTypes() {
    await this.societeService.getTypes().then(res => {
      this.type_nom = res.data;
      this.type_nom.forEach(typ => {
        typ.typesList = typ.attributes.types.data;
        console.log(JSON.stringify(typ.typesList));
        }); 
    }).catch(err => {
        console.log(err);
    });
  }
  async selectType(type) {
    this.type_nom.forEach((typ) => {
      if (typ.id === type.id) {
        typ.checked = true;
        this.selectedTypeId = typ.id;
      } else {
        typ.checked = false;
      }
    });
  }
}

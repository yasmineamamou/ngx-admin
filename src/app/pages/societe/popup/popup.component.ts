import { Component, Inject } from '@angular/core';
import { SocieteComponent } from "../societe.component";
import { SocieteService } from "../../../services/societe.service";
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
 
@Component({
  selector: 'ngx-popup',
  templateUrl: './popup.component.html',
  styleUrls: ['./popup.component.scss']
})
export class PopupComponent {
  societe_nom: any;
  editedSocieteName: string;
  editedSocieteDescription: string;
  societe: any;
  typesList: any[]=[];
  societe_description: any;
  
  constructor(private societeService: SocieteService, public dialog: MatDialogRef<SocieteComponent>, @Inject(MAT_DIALOG_DATA) public data: any) { }

  async ngOnInit() {
    await this.societeService.getSocieteById(this.data).then(async data => {
      this.societe = data.data;
      console.log(this.societe)
      this.societe_nom = this.societe.attributes.Nom;
      this.societe_description = this.societe.attributes.Description;
      await this.societeService.getTypes().then(res=>{
        this.typesList = res.data;
        console.log(this.typesList);
        let id_type =this.societe.attributes.types.data.id;
        this.typesList.forEach(element => {
          if(element.id == id_type){
            element.checked =true;
          }else{
            element.checked =false;
          }
        })
        console.log(this.typesList);
      })
    })
  }
  async editSociete() {
    console.log(this.editedSocieteName, this.editedSocieteDescription);
    let sociTypes: any[] = [];
    this.typesList.forEach(element => {
      if (element.checked == true) {
        sociTypes=element;
        console.log(element)
      }
    });
    console.log("list tache soci " + sociTypes);
    let sociData = { Nom: this.societe_nom, Description: this.societe_description, types: sociTypes};
    await this.societeService.editSociete(this.societe.id, sociData).then(res => {
      console.log("new soci " + res.data);
      this.dialog.close({ success: true, societe: res.data });
    }).catch(err => {
      console.log(err);
    });
    location.reload();
  }
  async selectType(type){
    this.typesList.forEach(element => {
      if(element.id == type.id){
        element.checked = true;
      }else{
        element.checked =false;
      }
    });
  }
}
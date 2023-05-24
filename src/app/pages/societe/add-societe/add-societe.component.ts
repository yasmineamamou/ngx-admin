import { Component, EventEmitter, Inject, Output  } from '@angular/core';
import { SocieteService } from "../../../services/societe.service";
import { NbToastrService } from '@nebular/theme';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { SocieteComponent } from '../societe.component';
import { AuthService } from "./../../../services/auth.service";
@Component({
  selector: 'ngx-add-societe',
  templateUrl: './add-societe.component.html',
  styleUrls: ['./add-societe.component.scss']
})
export class AddSocieteComponent {
  newSocieteName: string='';
  newSocieteDescription: String=''; 
  type_nom: any;
  selectedTypeId: any;
  errorMessage: string;

  constructor(private authService: AuthService, private societeService: SocieteService,private toastrService: NbToastrService, public dialog: MatDialogRef<SocieteComponent>, @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit() {
    this.getTypes();
  }
  async addSociete() {
    const userStr = sessionStorage.getItem('user');
    const currentUser = userStr ? JSON.parse(userStr) : null;
    const createdBy = currentUser ? currentUser.id : null;
    let sociType: any[]=[];
    this.type_nom.forEach(element => {
      if(element.checked == true){
        sociType.push(element);
      }
    });
    if ( sociType.length ==0||this.newSocieteName.trim() ==='' || this.newSocieteDescription.trim() ==='' ){
      this.toastrService.warning("Erreur!! Veuillez écrire quelque chose", "Champs obligatoires");
    }
    else{
    let societeData = { Nom: this.newSocieteName, Description:this.newSocieteDescription, types: sociType,createdBy: createdBy};
    await this.societeService.addSociete(societeData).then(res => {
        console.log("new soc "+res.data);
        this.getTypes();
        this.newSocieteName = '';
        this.newSocieteDescription = '';
        this.dialog.close({ success: true, societe: res.data });
        this.toastrService.success("Société crée", "Création");
    }).catch(err => {
      this.toastrService.danger("Erreur!! can't create societe", "Erreur");
      this.errorMessage = "Vous n'avez pas le droit pour cette action.";
    });}
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
  selectType(type){
    type.checked = !type.checked;
  }
}

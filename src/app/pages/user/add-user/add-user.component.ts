import { Component, Inject} from '@angular/core';
import { UserService } from '../../../services/user.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { NbToastrService } from '@nebular/theme';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { UserComponent } from '../user.component';
@Component({
  selector: 'ngx-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.scss']
})
export class AddUserComponent {
  User_nom: any;
  newUserEmail: string='';
  newUserNom: string=''; 
  newUserPassword: string='';
  newUserTel: any=0;
  societe_nom: any;
  dep_nom: any;
  selectedDepartementId: any;
  userForm: FormGroup;
  role: any;


  constructor(private UserService: UserService, private formBuilder: FormBuilder, private toastrService: NbToastrService, public dialog: MatDialogRef<UserComponent>, @Inject(MAT_DIALOG_DATA) public data: any){
    this.userForm = formBuilder.group(
      {"username": '',
        "email": '',
        "password": '',
        "telephone": ''
      }
    )
  }

  ngOnInit() {
    this.getDepartements();
  }
  
  async addUser() {
    let userDepartements: any;
    this.dep_nom.forEach(element => {
      if(element.checked == true){
       userDepartements=element;
      }
    });
    let username = this.userForm.controls.username.value;
    let email = this.userForm.controls.email.value;
    let password = this.userForm.controls.password.value;
    let telephone = this.userForm.controls.telephone.value;
    if (username ==='' ||  email ==='' || password ==='' ){
      this.toastrService.warning("Erreur!! Veuillez écrire quelque chose", "Champs obligatoires");
    }
    else{
    let UserData = { username: username, telephone: Number(telephone), email: email , password: password, role: 3, departement: userDepartements.id};
    await this.UserService.addUser(UserData).then(res => {
      console.log("new comp "+res.data);
        /*this.getDepartements();
        this.newUserNom = '';
        this.newUserTel = 0;
        this.newUserEmail = '';
        this.newUserPassword = '';*/
        this.dialog.close({ success: true, user: res.data });
        this.toastrService.success("compte crée", "Création"); 
      }).catch(err => {
        this.toastrService.danger("Erreur!! can't create compte", "Erreur");
    });}
  }
  async getDepartements() {
    await this.UserService.getDepartements().then(res => {
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
}

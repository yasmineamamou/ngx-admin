import { Component, Inject } from '@angular/core';
import { UserComponent } from "../user.component";
import { UserService } from "../../../services/user.service";
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormGroup } from '@angular/forms';
import { NbToastrService } from '@nebular/theme';
@Component({
  selector: 'ngx-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.scss']
})
export class EditUserComponent {
  user: any;
  user_email: any;
  user_name: any;
  user_telephone: any;
  departementsList: any[]=[];
  editedUserNom: any;
  editedUserEmail: any;
  editedUserTelephone: any;
  userForm: FormGroup;

  constructor(private userService: UserService , private toastrService: NbToastrService, private formBuilder: FormBuilder, public dialog: MatDialogRef<UserComponent>, @Inject(MAT_DIALOG_DATA) public data: any) { 
    this.userForm = formBuilder.group(
      {"username": '',
        "email": '',
        "password": '',
        "telephone": ''
      }
    )
  }
  async ngOnInit() {
    await this.userService.getUserById(this.data).then(async data => {
      this.user = data;
      console.log(this.user)
      this.user_name = this.user.username;
      this.user_email = this.user.email;
      this.user_telephone = this.user.telephone;
      
      await this.userService.getDepartements().then(res => {
        this.departementsList = res.data;
        console.log(this.departementsList);
        let id_dep =this.user.departement.id;
        this.departementsList.forEach(element => {
          if(element.id == id_dep){
            element.checked =true;
          }else{
            element.checked =false;
          }
        })
        console.log(this.departementsList);
      })
    })
  }
  async editUser() {
    console.log(this.editedUserNom, this.editedUserEmail, this.editedUserTelephone);
    let userDepartements: any[] = [];
    this.departementsList.forEach(element => {
      if (element.checked == true) {
        userDepartements=element;
        console.log(element)
      }
    });
    console.log("list user dep " + userDepartements);
    
    let userData = { username: this.user_name, email: this.user_email, telephone: this.user_telephone, departement: userDepartements};
    await this.userService.editUser(this.user.id, userData).then(res => {
      console.log("new user " + res.data);
      this.dialog.close({ success: true, user: res.data });
      this.toastrService.success("Compte user modifier", "Modification"); 
    }).catch(err => {
      this.toastrService.danger("Erreur!! can't Modify compte", "Erreur");
    });
  }
  async selectDepartement(departement){
    this.departementsList.forEach(element => {
      if(element.id == departement.id){
        element.checked = true;
      }else{
        element.checked =false;
      }
    });
  }
}
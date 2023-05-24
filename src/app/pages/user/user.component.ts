import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { AuthService } from '../../services/auth.service';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { AddUserComponent } from "./add-user/add-user.component";
import { EditUserComponent } from "./edit-user/edit-user.component";
import { NbToastrService } from '@nebular/theme';

@Component({
  selector: 'ngx-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent {
  p: number = 1;
  user_nom: any;
  dep_nom: any;
  errorMessage: string;

  constructor(private userService: UserService,private toastrService: NbToastrService, public dialog: MatDialog,  private authService: AuthService){}

  openAddPopup() {
    const dialogRef = this.dialog.open(AddUserComponent, {
      width: '52%',
      height: '75%',
    });
    dialogRef.afterClosed().subscribe(async result => {
      this.getUsers();
    });
  }
  ngOnInit() {
    this.getUsers();
  }
  async getUsers() {
    await this.userService.getUsers().then(res => {
      
      this.user_nom = res;
      console.log(this.user_nom[0].departement);
      })
      .catch(err => {
        this.toastrService.danger("Erreur!! can't delete user", "Erreur");
        this.errorMessage = "Vous n'avez pas l'accès à cette page.";
    });
  }
  edit(users) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;
    dialogConfig.height="75%";
    dialogConfig.width = "52%";
    dialogConfig.data = users.id;
    const dialogRef = this.dialog.open(EditUserComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(async result => {
      this.getUsers();
    });
  }
  async deleteUser(id_user) {
    if(confirm("Are you sure to delete "+name)) {
      await this.userService.deleteUser(id_user).then(res => {
        console.log("deleted dep " +id_user);
        this.toastrService.success("User supprimée", "Supression");
      }).catch(err => {
        this.toastrService.danger("Erreur!! can't delete user", "Erreur");
        
      });
    }
    this.getUsers();
  }
}

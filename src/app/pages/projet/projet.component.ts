import { Component } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ProjetService } from "./../../services/projet.service";
import { AddProjetComponent } from "./add-projet/add-projet.component";
import { EditProjetComponent } from "./edit-projet/edit-projet.component";
import { NbToastrService } from '@nebular/theme';
import { UserService } from '../../services/user.service';
@Component({
  selector: 'ngx-projet',
  templateUrl: './projet.component.html',
  styleUrls: ['./projet.component.scss']
})
export class ProjetComponent {
  p: number = 1;
  projet_nom: any;
  soci_nom: any;
  dep_proj_nom: any;
 // matchingProjects: any[] = [];
  // admin: any = JSON.parse(sessionStorage.getItem('user'));
  constructor(private projetService: ProjetService,private toastrService: NbToastrService,private userService: UserService, public dialog: MatDialog){}

  openAddPopup() {
    const dialogRef = this.dialog.open(AddProjetComponent, {
      width: '65%',
      height: '100%',
    });
    dialogRef.afterClosed().subscribe(async result => {
      this.getProjets();
    });
  }
  ngOnInit() {
    this.getProjets();
  }
  async getProjets() {
    await this.projetService.getProjets().then(res => {
      this.projet_nom = res.data;
      this.projet_nom.forEach(projet => { 
        projet.societesList = projet.attributes.societe.data;
        projet.departementsList = projet.attributes.departement.data; 
        console.log(JSON.stringify(projet.societesList), JSON.stringify(projet.departementsList));
      }); 
    })
    .catch(err => {
      this.toastrService.danger("Erreur!! can't get projet", "Erreur");
    });
  }
  edit(projet) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;
    dialogConfig.height="100%";
    dialogConfig.width = "65%";
    dialogConfig.data = projet.id;
    const dialogRef = this.dialog.open(EditProjetComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(async result => {
      this.getProjets();
    });
  }
  async deleteProjet(id_projet) {
    if(confirm("Are you sure to delete "+name)) {
      await this.projetService.deleteProjet(id_projet).then(res => {
        console.log("deleted projet " +id_projet);
        this.toastrService.success("Projet supprimée", "Supression");
      }).catch(err => {
        this.toastrService.danger("Erreur!! can't delet projet", "Erreur");
      });
    }
    this.getProjets();
  }
}
/*
async getUserProjects() {
  try {
    const projetRes = await this.projetService.getProjets();
    this.projet_nom = projetRes.data;
    const userRes = await this.userService.getUsersMe();
    this.dep_proj_nom = userRes.data;
    this.matchingProjects = [];

    for (const projet of this.projet_nom) {
      projet.societesList = projet.attributes.societe.data;
      projet.departementsList = projet.attributes.departement.data;

      for (const user of this.dep_proj_nom) {
        user.departementsList = user.attributes.departement.data;

        if (
          user.departementsList &&
          projet.departementsList &&
          user.departementsList.attributes.nom === projet.departementsList.attributes.nom
        ) {
          this.matchingProjects.push(projet);
          break; // Exit the inner loop since a match is found
        }
      }
    }
  } catch (err) {
    this.toastrService.danger("Erreur!! can't get projet", "Erreur");
  }

hasMatchingDepartments(): boolean {
  return this.matchingProjects.length > 0;
}
*/


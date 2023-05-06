import { Component } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ProjetService } from "./../../services/projet.service";
import { AddProjetComponent } from "./add-projet/add-projet.component";
import { EditProjetComponent } from "./edit-projet/edit-projet.component";

@Component({
  selector: 'ngx-projet',
  templateUrl: './projet.component.html',
  styleUrls: ['./projet.component.scss']
})
export class ProjetComponent {
  p: number = 1;
  projet_nom: any;
  soci_nom: any;

  constructor(private projetService: ProjetService, public dialog: MatDialog){}

  openAddPopup() {
    const dialogRef = this.dialog.open(AddProjetComponent, {
      width: '62%',
      height: '90%',
    });
  }
  ngOnInit() {
    this.getProjets();
    this.getSocietes();
  }
  async getProjets() {
    await this.projetService.getProjets().then(res => {
        this.projet_nom = res.data;
        this.projet_nom.forEach(projet => { 
          projet.societesList = projet.attributes.societe.data;
          console.log(JSON.stringify(projet.societesList));
        }); 
      })
      .catch(err => {
        console.log(err);
    });
  }
  edit(projet) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;
    dialogConfig.height="90%";
    dialogConfig.width = "62%";
    dialogConfig.data = projet.id;
    const dialogRef = this.dialog.open(EditProjetComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(async result => {
      console.log(result);
      projet = result.projet;
    });
  }
  async deleteProjet(id_projet) {
    if(confirm("Are you sure to delete "+name)) {
      await this.projetService.deleteProjet(id_projet).then(res => {
        console.log("deleted projet " +id_projet);
      }).catch(err => {
        console.log(err);
      });
    }
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
}

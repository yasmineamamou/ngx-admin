import { Component } from '@angular/core';
import { CompteService } from '../../services/compte.service';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { AddCompteComponent } from "./add-compte/add-compte.component";
import { EditCompteComponent } from "./edit-compte/edit-compte.component";
@Component({
  selector: 'ngx-compte',
  templateUrl: './compte.component.html',
  styleUrls: ['./compte.component.scss']
})
export class CompteComponent{
  p: number = 1;
  compte_nom: any;
  societe_nom: any;
  dep_nom: any;

  constructor(private compteService: CompteService, public dialog: MatDialog){}

  openAddPopup() {
    const dialogRef = this.dialog.open(AddCompteComponent, {
      width: '52%',
      height: '75%',
    });
  }
  ngOnInit() {
    this.getComptes();
    this.getSocietes();
    this.getDepartements();
  }
  async getComptes() {
    await this.compteService.getComptes().then(res => {
        this.compte_nom = res.data;
        this.compte_nom.forEach(comp => { 
          comp.societesList = comp.attributes.societe.data;
          comp.departementsList = comp.attributes.departements.data;
          console.log(JSON.stringify(comp.societesList),JSON.stringify(comp.departementsList));
        }); 
      })
      .catch(err => {
        console.log(err);
    });
  }
  edit(compte) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;
    dialogConfig.height="75%";
    dialogConfig.width = "52%";
    dialogConfig.data = compte.id;
    const dialogRef = this.dialog.open(EditCompteComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(async result => {
      console.log(result);
      compte = result.compte;
    });
  }
  async deleteCompte(id_com) {
    if(confirm("Are you sure to delete "+name)) {
      await this.compteService.deleteCompte(id_com).then(res => {
        console.log("deleted dep " +id_com);
      }).catch(err => {
        console.log(err);
      });
    }
    location.reload();
  }
  async getSocietes() {
    await this.compteService.getSocietes().then(res => {
      this.societe_nom = res.data;
      this.societe_nom.forEach(soci => {
        soci.societesList = soci.attributes.societes.data;
        console.log(JSON.stringify(soci.societesList));
        }); 
    }).catch(err => {
        console.log(err);
    });
  }
  async getDepartements() {
    await this.compteService.getDepartements().then(res => {
      this.dep_nom = res.data;
      this.dep_nom.forEach(dep => {
        dep.departementsList = dep.attributes.departements.data;
        console.log(JSON.stringify(dep.departementsList));
        }); 
    }).catch(err => {
        console.log(err);
    });
  }
}
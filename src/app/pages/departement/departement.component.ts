import { Component } from '@angular/core';
import { DepartementService } from './../../services/departement.service';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { AddDepartementComponent } from "./add-departement/add-departement.component";
import { EditDepartementComponent } from "./edit-departement/edit-departement.component";
@Component({
  selector: 'ngx-departement',
  templateUrl: './departement.component.html',
  styleUrls: ['./departement.component.scss']
})
export class DepartementComponent {
  p: number = 1;
  dep_nom: any;
  societe_nom: any;
  departement: any;

  constructor(private departementService: DepartementService, public dialog: MatDialog) { }
  openAddPopup() {
    const dialogRef = this.dialog.open(AddDepartementComponent, {
      width: '40%',
      height: '60%',
    });
  }
  ngOnInit() {
    this.getDepartements();
    this.getSocietes();
  }
  async getDepartements() {
    await this.departementService.getDepartements().then(res => {
      this.dep_nom = res.data;
      this.dep_nom.forEach(dep => {
        dep.societiesList = dep.attributes.societe.data;
        console.log(JSON.stringify(dep.societiesList));
      });
    })
      .catch(err => {
        console.log(err);
      });
  }
  edit(departement) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;
    dialogConfig.height = "60%";
    dialogConfig.width = "40%";
    dialogConfig.data = departement.id;
    const dialogRef = this.dialog.open(EditDepartementComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(async result => {
      console.log(result)
      departement = result.departement;
    })
  }
  async deleteDepartement(id_dep) {
    if(confirm("Are you sure to delete "+name)) {
      await this.departementService.deleteDepartement(id_dep).then(res => {
        console.log("deleted dep " +id_dep);
      }).catch(err => {
        console.log(err);
      });
    }
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
    societe.checked = !societe.checked;
  }
}
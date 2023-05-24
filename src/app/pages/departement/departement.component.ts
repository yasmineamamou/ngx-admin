import { Component } from '@angular/core';
import { DepartementService } from './../../services/departement.service';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { AddDepartementComponent } from "./add-departement/add-departement.component";
import { EditDepartementComponent } from "./edit-departement/edit-departement.component";
import { NbToastrService } from '@nebular/theme';
@Component({
  selector: 'ngx-departement',
  templateUrl: './departement.component.html',
  styleUrls: ['./departement.component.scss']
})
export class DepartementComponent {
  p: number = 1;
  dep_nom: any;

  constructor(private departementService: DepartementService, private toastrService: NbToastrService, public dialog: MatDialog) { }
  openAddPopup() {
    const dialogRef = this.dialog.open(AddDepartementComponent, {
      width: '40%',
      height: '60%',
    });
    dialogRef.afterClosed().subscribe(async result => {
      this.getDepartements();
    })
  }
  ngOnInit() {
    this.getDepartements();
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
        this.toastrService.danger("Erreur!! can't get departement", "Erreur");
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
      this.getDepartements();
    })
  }
  async deleteDepartement(id_dep) {
    if(confirm("Are you sure to delete "+name)) {
      await this.departementService.deleteDepartement(id_dep).then(res => {
        console.log("deleted dep " +id_dep);
        this.toastrService.success("Departement supprimée", "Supression");
      }).catch(err => {
        this.toastrService.danger("Erreur!! can't Delete departement", "Erreur");
      });
    }
    this.getDepartements();
  }
}
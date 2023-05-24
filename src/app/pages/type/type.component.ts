import { Component } from '@angular/core';
import { TypeService } from "./../../services/type.service";
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { AddTypeComponent } from "./add-type/add-type.component";
import { EditTypeComponent } from "./edit-type/edit-type.component";
import { NbToastrService } from '@nebular/theme';
@Component({
  selector: 'ngx-type',
  templateUrl: './type.component.html',
  styleUrls: ['./type.component.scss']
})
export class TypeComponent {
  p: number = 1;
  type_nom: any;
  type: any[] = [];
  createdByName: string[] = [];
  constructor(private typeService: TypeService, private toastrService: NbToastrService, public dialog: MatDialog) { }
  openAddPopup() {
    const dialogRef = this.dialog.open(AddTypeComponent, {
      width: '48%',
      height: '60%',
    });
    dialogRef.afterClosed().subscribe(async result => {
      this.getTypes();
    })
  }
  ngOnInit() {
    this.getTypes();
  }
  async getTypes() {
    this.typeService.getTypes().then(res => {
      this.type_nom = res.data;
    })
      .catch(err => {
        this.toastrService.danger("Erreur!! can't get type", "Erreur");
      });
  }

  edit(type) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;
    dialogConfig.height = "60%";
    dialogConfig.width = "48%";
    dialogConfig.data = type.id;
    const dialogRef = this.dialog.open(EditTypeComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(async result => {
      this.getTypes();
    })
  }
  async deleteType(id_typ) {
    if(confirm("Are you sure to delete "+name)) {
      await this.typeService.deleteType(id_typ).then(res => {
        console.log("deleted typ " +id_typ);
        this.toastrService.success("Type supprimée", "Supression");
      }).catch(err => {
        this.toastrService.danger("Erreur!! can't delete type", "Erreur");
      });
    }
    this.getTypes();
  }
}
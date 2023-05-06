import { Component } from '@angular/core';
import { TypeService } from "./../../services/type.service";
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { AddTypeComponent } from "./add-type/add-type.component";
import { EditTypeComponent } from "./edit-type/edit-type.component";
@Component({
  selector: 'ngx-type',
  templateUrl: './type.component.html',
  styleUrls: ['./type.component.scss']
})
export class TypeComponent {
  p: number = 1;
  type_nom: any;

  constructor(private typeService: TypeService, public dialog: MatDialog) { }
  openAddPopup() {
    const dialogRef = this.dialog.open(AddTypeComponent, {
      width: '48%',
      height: '60%',
    });
  }
  ngOnInit() {
    this.getTypes();
  }
  async getTypes() {
    await this.typeService.getTypes().then(res => {
      this.type_nom = res.data;
    })
      .catch(err => {
        console.log(err);
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
      console.log(result)
      type = result.type;
    })
  }
  async deleteType(id_typ) {
    if(confirm("Are you sure to delete "+name)) {
      await this.typeService.deleteType(id_typ).then(res => {
        console.log("deleted typ " +id_typ);
      }).catch(err => {
        console.log(err);
      });
    }
    location.reload();
  }
}
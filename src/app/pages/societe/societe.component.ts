import { Component} from '@angular/core';
import { SocieteService } from "./../../services/societe.service";
import { PopupComponent } from './popup/popup.component';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { AddSocieteComponent } from "./add-societe/add-societe.component";
@Component({
  selector: 'ngx-societe',
  templateUrl: './societe.component.html',
  styleUrls: ['./societe.component.scss', ]
})
export class SocieteComponent {
  p: number = 1;
  societe_nom: any;
  dep_nom: any;
  type_nom: any;

  constructor(private societeService: SocieteService, public dialog: MatDialog){}

  openAddPopup() {
    const dialogRef = this.dialog.open(AddSocieteComponent, {
      width: '60%',
      height: '80%',
    });
  }
  ngOnInit() {
    this.getTypes();
    this.getSocietes();
  }
  async getSocietes() {
    await this.societeService.getSocietes().then(res => {
        this.societe_nom = res.data;
        this.societe_nom.forEach(soci => {
          soci.typesList = soci.attributes.types.data;
          console.log(JSON.stringify(soci.typesList));
        }); 
      })
      .catch(err => {
        console.log(err);
    });
  }
  edit(societe) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;
    dialogConfig.height="80%";
    dialogConfig.width = "60%";
    dialogConfig.data = societe.id;
    const dialogRef = this.dialog.open(PopupComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(async result => {
      console.log(result)
      societe = result.societe;
    })
  }
  async deleteSociete(id_soc) {
    if(confirm("Are you sure to delete "+name)) {
      await this.societeService.deleteSociete(id_soc).then(res => {
        console.log("deleted soc " +id_soc);
      }).catch(err => {
        console.log(err);
      });
    }
    location.reload();
  }
  async getTypes() {
    await this.societeService.getTypes().then(res => {
      this.type_nom = res.data;
      this.type_nom.forEach(typ => {
        typ.typesList = typ.attributes.types.data;
        console.log(JSON.stringify(typ.typesList));
        }); 
    }).catch(err => {
        console.log(err);
    });
  }
}
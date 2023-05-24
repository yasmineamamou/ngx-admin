import { Component} from '@angular/core';
import { SocieteService } from "./../../services/societe.service";
import { PopupComponent } from './popup/popup.component';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { AddSocieteComponent } from "./add-societe/add-societe.component";
import { NbToastrService } from '@nebular/theme';
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

  constructor(private societeService: SocieteService, private toastrService: NbToastrService, public dialog: MatDialog){}

  openAddPopup() {
    const dialogRef = this.dialog.open(AddSocieteComponent, {
      width: '60%',
      height: '80%',
    });
    dialogRef.afterClosed().subscribe(async result => {
      this.getSocietes();
    })
  }
  ngOnInit() {
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
        this.toastrService.danger("Erreur!! can't get societie ", "Erreur");
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
      this.getSocietes();
    })
  }
  async deleteSociete(id_soc) {
    if(confirm("Are you sure to delete "+name)) {
      await this.societeService.deleteSociete(id_soc).then(res => {
        console.log("deleted soc " +id_soc);
        this.toastrService.success("Société supprimée", "Supression");
      }).catch(err => {
        this.toastrService.danger("Erreur!! can't delete societie", "Erreur");
      });
    }
    this.getSocietes();
  }
}
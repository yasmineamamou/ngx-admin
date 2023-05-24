import { Component } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { TacheService } from "./../../services/tache.service";
import { AddTacheComponent } from "./add-tache/add-tache.component";
import { EditTacheComponent } from "./edit-tache/edit-tache.component";
import { NbToastrService } from '@nebular/theme';

@Component({
  selector: 'ngx-tache',
  templateUrl: './tache.component.html',
  styleUrls: ['./tache.component.scss']
})
export class TacheComponent {
  p: number = 1;
  tache_nom: any;

  constructor(private tacheService: TacheService,private toastrService: NbToastrService, public dialog: MatDialog){}

  openAddPopup() {
    const dialogRef = this.dialog.open(AddTacheComponent, {
      width: '58%',
      height: '95%',
    });
    dialogRef.afterClosed().subscribe(async result => {
      this.getTaches();
    });
  }
  ngOnInit() {
    this.getTaches();
  }
  async getTaches() {
    await this.tacheService.getTaches().then(res => {
        this.tache_nom = res.data;
        this.tache_nom.forEach(tache => { 
          tache.societesList = tache.attributes.societe.data;
          tache.departementsList = tache.attributes.departement.data;
          console.log(JSON.stringify(tache.societesList),JSON.stringify(tache.departementsList));
        }); 
      })
      .catch(err => {
        this.toastrService.danger("Erreur!! can't get tache", "Erreur");
    });
  }
  edit(tache) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;
    dialogConfig.height="95%";
    dialogConfig.width = "58%";
    dialogConfig.data = tache.id;
    const dialogRef = this.dialog.open(EditTacheComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(async result => {
      this.getTaches();
    });
  } 
  async deleteTache(id_tache) {
    if(confirm("Are you sure to delete "+name)) {
      await this.tacheService.deleteTache(id_tache).then(res => {
        console.log("deleted tache " +id_tache);
        this.toastrService.success("Tache supprimée", "Supression");
      }).catch(err => {
        this.toastrService.danger("Erreur!! can't delete tache", "Erreur");
      });
    }
    this.getTaches();
  }

}

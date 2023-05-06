import { Component } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { TacheService } from "./../../services/tache.service";
import { AddTacheComponent } from "./add-tache/add-tache.component";
import { EditTacheComponent } from "./edit-tache/edit-tache.component";

@Component({
  selector: 'ngx-tache',
  templateUrl: './tache.component.html',
  styleUrls: ['./tache.component.scss']
})
export class TacheComponent {
  p: number = 1;
  tache_nom: any;
  soci_nom: any;

  constructor(private tacheService: TacheService, public dialog: MatDialog){}

  openAddPopup() {
    const dialogRef = this.dialog.open(AddTacheComponent, {
      width: '58%',
      height: '95%',
    });
  }
  ngOnInit() {
    this.getTaches();
    this.getSocietes();
  }
  async getTaches() {
    await this.tacheService.getTaches().then(res => {
        this.tache_nom = res.data;
        this.tache_nom.forEach(tache => { 
          tache.societesList = tache.attributes.societe.data;
          console.log(JSON.stringify(tache.societesList));
        }); 
      })
      .catch(err => {
        console.log(err);
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
      console.log(result);
      tache = result.tache;
    });
  } 
  async deleteTache(id_tache) {
    if(confirm("Are you sure to delete "+name)) {
      await this.tacheService.deleteTache(id_tache).then(res => {
        console.log("deleted tache " +id_tache);
      }).catch(err => {
        console.log(err);
      });
    }
    location.reload();
  }
  async getSocietes() {
    await this.tacheService.getSocietes().then(res => {
      this.soci_nom = res.data;
      this.soci_nom.forEach(soci => {
        soci.societesList = soci.attributes.societe.data;
        console.log(JSON.stringify(soci.societesList));
        }); 
    }).catch(err => {
        console.log(err);
    });
  }
}

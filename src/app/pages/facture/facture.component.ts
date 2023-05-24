import { Component, OnInit } from '@angular/core';
import { TacheService } from './../../services/tache.service';
import { ProjetService } from './../../services/projet.service';
import { DepartementService } from './../../services/departement.service';
import { NbToastrService } from '@nebular/theme';
import { MatDialog } from '@angular/material/dialog';
import { SocieteService } from '../../services/societe.service';
@Component({
  selector: 'ngx-facture',
  templateUrl: './facture.component.html',
  styleUrls: ['./facture.component.scss']
})
export class FactureComponent{
  p: number = 1;
  startDate: Date;
  endDate: Date;
  numberOfMonths: number;
  dep_nom: any;
  societe_nom: any;
  tache_nom: any;
  projet_nom: any;
  
  taches: any;
  companyDepartments: any;
  groupedTaches: any[] = [];
  groupedData: any[] = [];
  filteredGroupedData: any[] = [];
  buttonPressed: boolean = false;


  constructor(private tacheService: TacheService,private projetService: ProjetService, private toastrService: NbToastrService, public dialog: MatDialog) { }
  ngOnInit() {
    this.getTaches();
    this.getProjets();
  }
  async calculateMonthsTache() {
    const start = new Date(this.startDate);
    const end = new Date(this.endDate);
    const diffYears = end.getFullYear() - start.getFullYear();
    const diffMonths = end.getMonth() - start.getMonth();
    const totalMonths = diffYears * 12 + diffMonths;
    this.numberOfMonths = totalMonths;
  }
 
  calculateTache(type_tache: string, nombre_de_tache: number, cout_par_piece: number): number{
    if (type_tache === 'Journalier') {
      return nombre_de_tache * cout_par_piece * 30 * this.numberOfMonths;
    }else if (type_tache === 'Hebdomadaire') {
      return nombre_de_tache * cout_par_piece * 4 * this.numberOfMonths;
    } else if (type_tache === 'Mensuel') {
      return nombre_de_tache * cout_par_piece * this.numberOfMonths;
    } else if (type_tache === 'Trimestriel') {
      return ((nombre_de_tache * cout_par_piece)/3) * this.numberOfMonths ;
    } else if (type_tache === 'Semestriel') {
      return ((nombre_de_tache * cout_par_piece)/6) * this.numberOfMonths;
    } else if (type_tache === 'Annuel') {
      return ((nombre_de_tache * cout_par_piece)/12) * this.numberOfMonths;
    } 
  }
  calculateTotalDepartementTaches(departements: any[]): number {
  let total = 0;
  for (const departement of departements) {
    for (const tache of departement.taches) {
      const cost = this.calculateTache(tache.attributes.type_tache, tache.attributes.nombre_de_tache, tache.attributes.cout_par_piece);
      total += cost;
    }
  }
  return total;
}
calculateTotalDepartmentProjet(data: any[]): number {
  let cumulativeTotalCost = 0;

  for (const item of data) {
    for (const projet of item.projets) {
      cumulativeTotalCost += projet.totalcost;
    }
  }

  return cumulativeTotalCost;
}

  async getTaches() {
  await this.tacheService.getTaches().then(res => {
    this.tache_nom = res.data;
    this.tache_nom.forEach(tache => { 
      tache.societesList = tache.attributes.societe.data;
      tache.departementsList = tache.attributes.departement.data;
      
      // Find the index of the societe in the groupedTaches array
      const societeIndex = this.groupedTaches.findIndex(group => group.societe === tache.societesList.attributes.Nom);
      
      if (societeIndex === -1) {
        // If the societe is not found, create a new entry in the groupedTaches array
        this.groupedTaches.push({
          societe: tache.societesList.attributes.Nom,
          departements: [{
            nom: tache.departementsList.attributes.nom,
            taches: [tache]
          }]
        });
      } else {
        // If the societe is found, check if the departement exists
        const departementIndex = this.groupedTaches[societeIndex].departements.findIndex(dep => dep.nom === tache.departementsList.attributes.nom);
        
        if (departementIndex === -1) {
          // If the departement is not found, create a new entry in the departements array
          this.groupedTaches[societeIndex].departements.push({
            nom: tache.departementsList.attributes.nom,
            taches: [tache]
          });
        } else {
          // If the departement is found, push the tache to the existing departement's taches array
          this.groupedTaches[societeIndex].departements[departementIndex].taches.push(tache);
        }
      }
      
    }); 
  })
  .catch(err => {
    this.toastrService.danger("Erreur!! can't get tache", "Erreur");
  });
}
async getProjets() {
  await this.projetService.getProjets().then(res => {
    const updatedGroupedData: any[] = [];
    this.projet_nom = res.data;
    this.projet_nom.forEach(projet => { 
      projet.societesList = projet.attributes.societe.data;
      projet.departementsList = projet.attributes.departement.data;

      const projectEndDate = new Date(projet.attributes.date_fin);
      const today = new Date();

      // Skip printing projects whose date_fin has not passed
      if (projectEndDate > today) {
        return;
      }
    
      const societeIndex = this.groupedData.findIndex(group => group.societe === projet.societesList.attributes.Nom);

      if (societeIndex === -1) {
        updatedGroupedData.push({
          societe: projet.societesList.attributes.Nom,
          data: [{
            departement: projet.departementsList.attributes.nom,
            projets: [projet]
          }]
        });
      } else {
        const departementIndex = this.groupedData[societeIndex].data.findIndex(item => item.departement === projet.departementsList.attributes.nom);

        if (departementIndex === -1) {
          this.groupedData[societeIndex].data.push({
            departement: projet.departementsList.attributes.nom,
            projets: [projet]
          });
        } else {
          this.groupedData[societeIndex].data[departementIndex].projets.push(projet);
        }
      }
      
      this.groupedData = updatedGroupedData;
      this.calculateMatchingMonthsAndTotalCost(projet);
    });
  })
  .catch(err => {
    this.toastrService.danger("Erreur!! can't get projet", "Erreur");
  });
}

calculateMatchingMonthsAndTotalCost(projet: any) {

  const projectStartDate = new Date(projet.attributes.date_debut);
  const projectEndDate = new Date(projet.attributes.date_fin);
  const selectedStartDate = new Date(this.startDate);
  const selectedEndDate = new Date(this.endDate);
  projet.numberOfMonths = this.calculateNumberOfMonths(projectStartDate, projectEndDate);
  const startYear = selectedStartDate.getFullYear();
  const endYear = selectedEndDate.getFullYear();
  const startMonth = selectedStartDate.getMonth();
  const endMonth = selectedEndDate.getMonth();

  let matchingMonths = 0;

  for (let year = startYear; year <= endYear; year++) {
    const monthStart = year === startYear ? startMonth : 0;
    const monthEnd = year === endYear ? endMonth : 11;

    for (let month = monthStart; month <= monthEnd; month++) {
      const currentDate = new Date(year, month);

      if (currentDate >= projectStartDate && currentDate <= projectEndDate) {
        matchingMonths++;
      }
    }
  }
  projet.matchingMonths = matchingMonths; 
  projet.costPerMonth = projet.attributes.estimation_cout / projet.numberOfMonths;
  projet.totalcost = matchingMonths*projet.costPerMonth;
}


updateGroupedData() {
  this.groupedData = []; // Clear the existing data before updating

  this.getProjets();
}

calculateMonths() {
  if (this.startDate && this.endDate) {
    this.updateGroupedData();
  }
}
calculateNumberOfMonths(startDate: Date, endDate: Date): number {
  const startYear = startDate.getFullYear();
  const startMonth = startDate.getMonth();
  const endYear = endDate.getFullYear();
  const endMonth = endDate.getMonth();

  return (endYear - startYear) * 12 + (endMonth - startMonth);
}
hasNonZeroTotalCost(projets: any[]): boolean {
  return projets.some(projet => projet.totalcost !== 0);
}

}

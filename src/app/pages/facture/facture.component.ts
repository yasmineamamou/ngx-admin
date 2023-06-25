import { FactureService } from './../../services/facture.service';
import { Component } from '@angular/core';
import { TacheService } from './../../services/tache.service';
import { ProjetService } from './../../services/projet.service';
import { NbToastrService } from '@nebular/theme';
import { MatDialog } from '@angular/material/dialog';
import { HttpClient } from '@angular/common/http';


import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
pdfMake.vfs = pdfFonts.pdfMake.vfs;
import axios from 'axios';
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
  tache_nom: any;
  projet_nom: any;
  
  taches: any;
  groupedTaches: any[] = [];
  groupedData: any[] = [];
  nombreOfDays: number;
  totalCost: any;
  selectedGroup: any;
  newtotalHT: number;
  newTVA: number;
  newtimbre: number;
  newtotalTTC: number;
  newdateFacturation: DateConstructor;
  pdfBlob: any;
  matchingMonths: boolean = false;
  constructor(private tacheService: TacheService,private factureService: FactureService,private http: HttpClient,private projetService: ProjetService, private toastrService: NbToastrService, public dialog: MatDialog) { }
  ngOnInit() {
    this.getTaches();
    this.getProjets();
  }

selectGroup(group: any) {
  this.selectedGroup = group;
}

  generatePDFDetails(group: any) {
    const url = 'http://localhost:4200//generate-pdf'; // Replace with your server endpoint for generating the PDF
    const payload = { group };
  
    this.http.post(url, payload, { responseType: 'blob' }).subscribe((response: any) => {
      const blob = new Blob([response], { type: 'application/pdf' });
      const url = window.URL.createObjectURL(blob);
      window.open(url);
    });
  }
  async calculateMonthsTache() {
    const start = new Date(this.startDate);
    const end = new Date(this.endDate);
    const diffYears = end.getFullYear() - start.getFullYear();
    const diffMonths = end.getMonth() - start.getMonth();
    const totalMonths = diffYears * 12 + diffMonths;
    this.numberOfMonths = totalMonths;
    let totalDays = 0;
    for (let date = start; date <= end; date.setDate(date.getDate() + 1)) {
      if (date.getDay() !== 0) { // Exclude Sundays (Sunday is represented by 0)
        totalDays++;
      }
    }
    this.nombreOfDays = totalDays - 1 ;
  }
  
  calculateTache(type_tache: string, nombre_de_tache: number, cout_par_piece: number): number{
    if (type_tache === 'Journalier') {
      return nombre_de_tache * cout_par_piece * this.nombreOfDays;
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
    } else if (type_tache === 'Occasionnelle') {
        return nombre_de_tache * cout_par_piece;
    }
}
        
  calculeTacheDate(nombre_de_tache: number, cout_par_piece: number): number{
    return nombre_de_tache * cout_par_piece;
  }

  async openPDFDetailsTache() {
    if (!this.selectedGroup) {
      return;
    }
    const totalHT = this.calculateTotalDepartementTaches(this.selectedGroup.departements);
    const TVA = 0.19 * totalHT;
    const timbre = TVA === 0 ? 0 : 1;
    const montantTotalTTC = totalHT + TVA + timbre;
    const docDefinition = {
      content: [
        {
          columns: [
          
            {
              width: '100%',
              text: [
                { text: 'ZENGroupe\n\n', bold: true },
                { text: 'ROUTE GREMDA KM 3 CEINTURE BOURGUIBA \n', margin: [0, 10, 0, 0] },
                '3042 - SFAX\n',
                { text: 'Tél: (+216) 70147680 \n', margin: [0, 10, 0, 0] },
                { text: 'Fax: (+216) 74870248 \n', margin: [0, 10, 0, 0] },
                { text: 'M.F: 1719347/Z/A/M/000 - R.C B08135412021 \n', margin: [0, 10, 0, 0] },
                { text: 'RIB BANQUE ZITOUNA : 25105000000001014072 \n\n', margin: [0, 10, 0, 0] },
                { text: `Société ${this.selectedGroup.societe}\n`, alignment: 'right', bold: true },
                { text: `Date: ${new Date().toLocaleDateString()}\n\n`, alignment: 'right',bold: true },
              ]
            },
          
          ]
        },
        {
          table: {
            headerRows: 1,
            widths: ['*', 'auto', 'auto', 'auto', 'auto'],
            body: [
              // Table header
              ['DESIGNATION', 'Type de tache', 'QUANTITÉ', 'PRIX UNIT. HT', 'PRIX TOTAL. HT'],
              // Table rows
              ...this.selectedGroup.departements.reduce((rows: any[], departement: any) => {
                departement.taches.forEach((tache: any) => {
                 
                    const tacheDate = new Date(tache.attributes.date);
                    const selectedStartDate = new Date(this.startDate);
                    const selectedEndDate = new Date(this.endDate);
                    
                    if (tacheDate >= selectedStartDate && tacheDate <= selectedEndDate) {
                      rows.push([
                        tache.attributes.nom_tache,
                        tache.attributes.type_tache,
                        tache.attributes.nombre_de_tache,
                        tache.attributes.cout_par_piece,
                        this.calculeTacheDate(tache.attributes.nombre_de_tache, tache.attributes.cout_par_piece)
                      ]);
                    }
                
                });
                return rows;
              }, []),
              ['', '','', { text: 'TOTAL HT', bold: true, alignment: 'left', margin: [0, 2, 0, 0] }, { text: `${totalHT}`, bold: true, alignment: 'left', margin: [0, 2, 0, 0] }],
              ['', '','', { text: 'TVA 19%', bold: true, alignment: 'left', margin: [0, 2, 0, 0] }, { text: `${TVA}`, bold: true, alignment: 'left', margin: [0, 2, 0, 0] }],
              ['', '','', { text: 'Timbre', bold: true, alignment: 'left', margin: [0, 2, 0, 0] }, { text: `${timbre}`, bold: true, alignment: 'left', margin: [0, 2, 0, 0] }],
              ['', '','', { text: 'Montant Total TTC', bold: true, alignment: 'left', margin: [0, 2, 0, 0] }, { text: `${montantTotalTTC}`, bold: true, alignment: 'left', margin: [0, 2, 0, 0] }]
            ]
          },
          layout: {
            hLineWidth: (i: number, node: any) => {
              if (i === 0 || i === 1 ) {
                return 2; // Apply thicker border for the first two rows and the last two rows
              } else {
                return 1; 
              }
            },
            vLineWidth: (i: number, node: any) => {
              if (i === 0 || i === node.table.body.length) {
                return 2; // Apply thicker border for the first and last columns
              } else {
                return 1; // Remove the border for other columns
              }},
            hLineColor: () => 'black',
            vLineColor: () => 'black'
          }
        },
      
      ],
      styles: {
        header: {
          fontSize: 18,
          bold: true,
          margin: [0, 0, 0, 10]
        },
        total: {
          fontSize: 14,
          bold: true,
          margin: [0, 10, 0, 0]
        }
      }
    };
  pdfMake.createPdf(docDefinition).open();
  // pdfMake.createPdf(docDefinition).download('facture.pdf');
  }
  openPDFDetailsProjet() {
    if (!this.selectedGroup) {
      return;
    }
    const totalHT = this.calculateTotalDepartmentProjet(this.selectedGroup.data);
    const TVA = 0.19 * totalHT;
     const timbrE = TVA === 0 ? 0 : 1; // Set timbre based on the value of TVA
    const montantTotalTTC = totalHT + TVA + timbrE;
    const docDefinition = {
      content: [
    
        {
          columns: [
            {
              width: '100%',
              text: [
                { text: 'ZENGroupe\n\n', bold: true },
                { text: 'ROUTE GREMDA KM 3 CEINTURE BOURGUIBA \n', margin: [0, 10, 0, 0] },
                '3042 - SFAX\n',
                { text: 'Tél: (+216) 70147680 \n', margin: [0, 10, 0, 0] },
                { text: 'Fax: (+216) 74870248 \n', margin: [0, 10, 0, 0] },
                { text: 'M.F: 1719347/Z/A/M/000 - R.C B08135412021 \n', margin: [0, 10, 0, 0] },
                { text: 'RIB BANQUE ZITOUNA : 25105000000001014072 \n\n', margin: [0, 10, 0, 0] },
                { text: `Société ${this.selectedGroup.societe}\n`, alignment: 'right', bold: true },
                { text: `Date: ${new Date().toLocaleDateString()}\n\n`, alignment: 'right',bold: true },
              ]
            },
           
          ]
        },
        {
          table: {
            headerRows: 1,
            widths: ['*', 'auto', 'auto', 'auto'],
            body: [
              // Table header
              ['Nom du Projet', 'Date Début', 'Date Fin', 'Coût'],
              // Table rows
              ...this.selectedGroup.data.reduce((rows: any[], item: any) => {
                item.projets.forEach((projet: any) => {
                  rows.push([projet.attributes.nom_projet, projet.attributes.date_debut, projet.attributes.date_fin, projet.totalcost]);
                });
                return rows;
              }, []),
              // Total row
              ['', '', { text: 'Total:', bold: true, alignment: 'left', margin: [0, 2, 0, 0] }, { text: `${this.calculateTotalDepartmentProjet(this.selectedGroup.data)}`, bold: true, alignment: 'left', margin: [0, 2, 0, 0] }],
              ['', '', { text: 'TVA 19%', bold: true, alignment: 'left', margin: [0, 2, 0, 0] }, { text: `${TVA}`, bold: true, alignment: 'left', margin: [0, 2, 0, 0] }],
              ['', '', { text: 'Timbre', bold: true, alignment: 'left', margin: [0, 2, 0, 0] }, { text: `${timbrE}`, bold: true, alignment: 'left', margin: [0, 2, 0, 0] }],
              ['', '', { text: 'Montant Total TTC', bold: true, alignment: 'left', margin: [0, 2, 0, 0] }, { text: `${montantTotalTTC}`, bold: true, alignment: 'left', margin: [0, 2, 0, 0] }]
            
            ]
          },
          layout: {
            hLineWidth: (i: number, node: any) => (i === 0 || i === 1) ? 2 : 1,
            vLineWidth: (i: number, node: any) => (i === 0 || i === node.table.body.length) ? 2 : 1,
            hLineColor: () => 'black',
            vLineColor: () => 'black'
          }
        }
      ],
      styles: {
        header: {
          fontSize: 18,
          bold: true,
          margin: [0, 0, 0, 10]
        },
        total: {
          fontSize: 14,
          bold: true,
          margin: [0, 10, 0, 0]
        }
      }
    };
  
    pdfMake.createPdf(docDefinition).open();
  }
  async addFactureTache(){
    const currentDate = new Date();
    const formattedDate = currentDate.toISOString().split('T')[0];
    let factureData = { DateFacture: formattedDate ,totalHT: this.calculateTotalDepartementTaches(this.selectedGroup.departements) , TVA: this.calculateTotalDepartementTaches(this.selectedGroup.departements)*0.19, timbre: 1, totalTTC: this.calculateTotalDepartementTaches(this.selectedGroup.departements)+this.calculateTotalDepartementTaches(this.selectedGroup.departements)*0.19+1};
    await this.factureService.addFacture(factureData).then(res => {
        console.log("new tache "+res.data);
        this.newtotalHT = 0;
        this.newTVA = 0;
        this.newtimbre = 0;
        this.newtotalTTC = 0;
  }).catch(err => {
      console.log(err)
  });
  }
  async addFactureProjet(){
    const currentDate = new Date();
    const formattedDate = currentDate.toISOString().split('T')[0];
    let factureData = { DateFacture: formattedDate ,totalHT: this.calculateTotalDepartmentProjet(this.selectedGroup.data) , TVA: this.calculateTotalDepartmentProjet(this.selectedGroup.data)*0.19, timbre: 1, totalTTC: this.calculateTotalDepartmentProjet(this.selectedGroup.data)+this.calculateTotalDepartmentProjet(this.selectedGroup.data)*0.19+1};
    await this.factureService.addFacture(factureData).then(res => {
        console.log("new tache "+res.data);
        this.newtotalHT = 0;
        this.newTVA = 0;
        this.newtimbre = 0;
        this.newtotalTTC = 0;
  }).catch(err => {
      console.log(err)
  });
  }
  calculateTotalAllDepartementsTaches(): number {
    let total = 0;
    for (const group of this.groupedTaches) {
      total += this.calculateTotalDepartementTaches(group.departements);
    }
    return total;
  }
  calculateTotalDepartementTaches(departements: any[]): number {
  let total = 0;
  const startDate = new Date(this.startDate);
  const endDate = new Date(this.endDate);
  for (const departement of departements) {
    for (const tache of departement.taches) {
      const tacheDate = new Date(tache.attributes.date);
      if (tacheDate < startDate || tacheDate > endDate){
        continue; // Skip the tache if it's not within the date range
      }

      const cost = this.calculeTacheDate(tache.attributes.nombre_de_tache, tache.attributes.cout_par_piece);
      total += cost;
    }
  }

  return total;
}

calculateTotalAllDepartmentsProjets(): number {
  let cumulativeTotalCost = 0;
  for (const group of this.groupedData) {
    cumulativeTotalCost += this.calculateTotalDepartmentProjet(group.data);
  }
  return cumulativeTotalCost;
}
calculateTotalDepartmentProjet(data: any[]): number {
  let cumulativeTotalCost = 0;
  for (const item of data) {
    for (const projet of item.projets) {
      cumulativeTotalCost += parseInt(projet.attributes.estimation_cout, 10);
    }
  }
  return cumulativeTotalCost;
}



  async getTaches() {
  await this.tacheService.getTachesFacture().then(res => {
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
            taches: [tache],
            showDetails: false,
          }]
        });
      } else {
        // If the societe is found, check if the departement exists
        const departementIndex = this.groupedTaches[societeIndex].departements.findIndex(dep => dep.nom === tache.departementsList.attributes.nom);
        
        if (departementIndex === -1) {
          // If the departement is not found, create a new entry in the departements array
          this.groupedTaches[societeIndex].departements.push({
            nom: tache.departementsList.attributes.nom,
            taches: [tache],
            showDetails: false,
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
  await this.projetService.getProjetsFacture().then(res => {
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
  projet.totalcost = projet.attributes.estimation_cout;
  this.totalCost = projet.totalcost;
}

calculateMonths() {
  if (this.startDate && this.endDate) {
    this.groupedData = []; // Clear the existing data before updating
    this.getProjets();
  }
}
calculateNumberOfMonths(startDate: Date, endDate: Date): number {
  const startYear = startDate.getFullYear();
  const startMonth = startDate.getMonth();
  const endYear = endDate.getFullYear();
  const endMonth = endDate.getMonth();
  return (endYear - startYear) * 12 + (endMonth - startMonth);
}
}
/*
openPDFTache() {
  if (!this.startDate || !this.endDate) {
    return;
  }
  const tableRows = this.groupedTaches.reduce((rows: any[], group: any) => {
    const groupRows = group.departements.map((departement: any, index: number) => {
      if (index === 0) {
        // First row for each group
        return [
          { text: group.societe, rowSpan: group.departements.length, style: 'societeCell' },
          { text: departement.nom, style: 'departementCell' },
          this.calculateTacheRows(departement.taches),
          { text: this.calculateTotalDepartementTaches(group.departements), rowSpan: group.departements.length, style: 'totalCell' },
        ];
      } else {
        // Empty rows for subsequent departments within the same group
        return [
          { text: '', style: 'societeCell' },
          { text: departement.nom, style: 'departementCell' },
          this.calculateTacheRows(departement.taches),
          ''
        ];
      }
    });
    return rows.concat(groupRows);
  }, []);
  const totalAllDepartments = this.calculateTotalAllDepartementsTaches();
  // Add the total line at the bottom of the table
  tableRows.push([
    { text: 'Total:', colSpan: 3, alignment: 'right', bold: true },
    '',
    '',
    { text: totalAllDepartments, style: 'totalCell', bold: true }
  ]);
  const docDefinition = {
    content: [
      {
        text: 'Facture Totale des Taches \n\n',
        style: 'title',
        alignment: 'center',
        margin: [0, 0, 0, 10],
        bold:true
      },
      {
        columns: [
          {
            width: '50%',
            text: [
              { text: 'ZENGroupe\n\n', bold: true },
              { text: 'Adresse: Gremda-Caïd, Ceinture Bourguiba\n', margin: [0, 10, 0, 0] },
              'Code Postal: 3062\n',
              { text: 'Ville/Pays: Sfax, Tunisie\n\n', margin: [0, 10, 0, 0] },
              { text: `Facturation du ${this.startDate} jusqu'au ${this.endDate}\n\n`, bold: true }
            ]
          },
        ]
      },
      {
        table: {
          headerRows: 1,
          widths: ['auto', 'auto', '*', 'auto'],
          body: [
            // Table header
            [
              { text: 'Société bénéficiaire', bold: true },
              { text: 'Département exécutant', bold: true },
              { text: 'Coût', bold: true },
              { text: 'Total', bold: true }
            ],
            // Table rows
            ...tableRows,

          ]
        },
        layout: {
          hLineWidth: () => 1,
          vLineWidth: () => 1, // Add a vertical line between each cell
          hLineColor: () => 'black',
          vLineColor: () => 'black', // Set the color of the vertical line
        }
      }
    ],
    // ...
  };
  pdfMake.createPdf(docDefinition).open();
}
calculateTacheRows(taches: any[]) {
  return taches.map((tache: any) => {
    return {
      text: this.calculateTache(tache.attributes.type_tache, tache.attributes.nombre_de_tache, tache.attributes.cout_par_piece),
      style: 'tacheCell'
    };
  });
}
openPDFProjet() {
  if (!this.startDate || !this.endDate) {
    return;
  }
  const tableRows = this.groupedData.reduce((rows: any[], group: any) => {
    const groupRows = group.data.map((departements: any, index: number) => {
      if (index === 0) {
        // First row for each group
        return [
          { text: group.societe, rowSpan: group.data.length, style: 'societeCell' },
          { text: departements.departement, style: 'departementCell' },
           departements.projets.map((projet: any) => {
            return projet.totalcost;
          }),
          { text: this.calculateTotalDepartmentProjet(group.data), rowSpan: group.data.length, style: 'totalCell' },
        ];
      } else {
        // Empty rows for subsequent departments within the same group
        return [
          { text: '', style: 'societeCell' },
          { text: departements.departement, style: 'departementCell' },
          departements.projets.map(() => ''),
          ''
        ];
      }
    });
    return rows.concat(groupRows);
  }, []);
  const totalAllDepartments = this.calculateTotalAllDepartmentsProjets();
  // Add the total line at the bottom of the table
  tableRows.push([
    { text: 'Total:', colSpan: 3, alignment: 'right', bold: true },
    '',
    '',
    { text: totalAllDepartments, style: 'totalCell', bold: true }
  ]);
  const docDefinition = {
    content: [
      {
        text: 'Facture Totale des projets \n\n',
        style: 'title',
        alignment: 'center',
        margin: [0, 0, 0, 10],
        bold:true
      },
      {
        columns: [
          {
            width: '50%',
            text: [
              { text: 'ZENGroupe\n\n', bold: true },
              { text: 'Adresse: Gremda-Caïd, Ceinture Bourguiba\n', margin: [0, 10, 0, 0] },
              'Code Postal: 3062\n',
              { text: 'Ville/Pays: Sfax, Tunisie\n\n', margin: [0, 10, 0, 0] },
              { text: `Facturation du ${this.startDate} jusqu'au ${this.endDate}\n\n`, bold: true }
            ]
          },
        ]
      },
      {
        table: {
          headerRows: 1,
          widths: ['auto', 'auto', '*', 'auto'],
          body: [
            // Table header
            [
              { text: 'Société bénéficiaire', bold: true },
              { text: 'Département exécutant', bold: true },
              { text: 'Coût', bold: true },
              { text: 'Total', bold: true }
            ],
            // Table rows
            ...tableRows,
          ]
        },
        layout: {
          hLineWidth: () => 1,
          vLineWidth: () => 1, // Add a vertical line between each cell
          hLineColor: () => 'black',
          vLineColor: () => 'black', // Set the color of the vertical line
        }
      }
    ],
    // ...
  };
  pdfMake.createPdf(docDefinition).open();
}
toggleDetails(group: any) {
  group.showDetails = !group.showDetails;
}
}*/

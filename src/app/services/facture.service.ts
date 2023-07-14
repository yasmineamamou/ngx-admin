import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from './../../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class FactureService {

  constructor(private http: HttpClient) { }
  uploadPDFToStrapi(file: File): Observable<any> {
    const formData = new FormData();
    formData.append('files', file, 'facture.pdf');
  
    return this.http.post(environment.url_backend + '/api/upload/', formData);
  }
  
  async addFacture(factureData) {
    let promise = new Promise<any>((resolve, reject) => {
        this.http.post(environment.url_backend+'/api/factures', { data: factureData }).toPromise().then(res => {
            resolve(res);
        }).catch(err => {
            reject(err);
        });
    });
    return promise;
  }
}

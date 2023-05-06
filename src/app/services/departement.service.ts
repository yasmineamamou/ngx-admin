import { environment } from './../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DepartementService {

  constructor(private http: HttpClient) { }

  async getDepartementById(id) {
    let promise = new Promise<any>((resolve, reject) => {
      this.http.get(environment.url_backend + '/api/departements/' + id + '?populate=*').toPromise().then(res => {
        resolve(res);
      }).catch(err => {
        reject(err);
      });
    });
    return promise;
  }
  async getDepartements() {
    let promise = new Promise<any>((resolve, reject) => {
      this.http.get(environment.url_backend + '/api/departements?populate=*').toPromise().then(res => {
        resolve(res);
      }).catch(err => {
        reject(err);
      });
    });
    return promise;
  }
  async editDepartement(departementId, departementData) {
    let promise = new Promise<any>((resolve, reject) => {
      this.http.put(environment.url_backend + `/api/departements/${departementId}`, { data: departementData }).toPromise().then(res => {
        resolve(res);
      }).catch(err => {
        reject(err);
      });
    });
    return promise;
  }
  async deleteDepartement(departementId) {
    let promise = new Promise<any>((resolve, reject) => {
      this.http.delete(environment.url_backend + `/api/departements/${departementId}`).toPromise().then(res => {
        resolve(res);
      }).catch(err => {
        reject(err);
      });
    });
    return promise;
  }
  async addDepartement(departementData) {
    let promise = new Promise<any>((resolve, reject) => {
      this.http.post(environment.url_backend + '/api/departements', { data: departementData }).toPromise().then(res => {
        resolve(res);
      }).catch(err => {
        reject(err);
      });
    });
    return promise;
  }
  async getSocietes() {
    let promise = new Promise<any>((resolve, reject) => {
      this.http.get(environment.url_backend + '/api/societes').toPromise().then(res => {
        resolve(res);
      }).catch(err => {
        reject(err);
      });
    });
    return promise;
  }
}

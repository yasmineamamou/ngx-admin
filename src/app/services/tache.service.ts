import { Injectable } from '@angular/core';
import { environment } from './../../environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TacheService {

  constructor(private http: HttpClient) { }

  async getTachesById(id) {
    let promise = new Promise<any>((resolve, reject) => {
      this.http.get(environment.url_backend+'/api/creation-des-taches/'+id+'?populate=*').toPromise().then(res => {
        resolve(res);
      }).catch(err=>{
        reject(err);
      });
    });
    return promise;
  }
  async getTaches() {
    let promise = new Promise<any>((resolve, reject) => {
      this.http.get(environment.url_backend+'/api/creation-des-taches?populate=*').toPromise().then(res => {
        resolve(res);
      }).catch(err=>{
        reject(err);
      });
    });
    return promise;
  }
  async addTache(tacheData) {
    let promise = new Promise<any>((resolve, reject) => {
        this.http.post(environment.url_backend+'/api/creation-des-taches', { data: tacheData }).toPromise().then(res => {
            resolve(res);
        }).catch(err => {
            reject(err);
        });
    });
    return promise;
  }
  async editTache(tacheId, tacheData) {
    let promise = new Promise<any>((resolve, reject) => {
        this.http.put(environment.url_backend+`/api/creation-des-taches/${tacheId}`, { data: tacheData }).toPromise().then(res => {
            resolve(res);
        }).catch(err => {
            reject(err);
        });
    });
    return promise;
  }
  async deleteTache(tacheId) {
    let promise = new Promise<any>((resolve, reject) => {
        this.http.delete(environment.url_backend+`/api/creation-des-taches/${tacheId}`).toPromise().then(res => {
            resolve(res);
        }).catch(err => {
            reject(err);
        });
    });
    return promise;
  }
  async getSocietes() {
    let promise = new Promise<any>((resolve, reject) => {
        this.http.get(environment.url_backend+'/api/societes').toPromise().then(res => {
            resolve(res);
        }).catch(err => {
            reject(err);
        });
    });
    return promise;
  }
  async getDepartements() {
    let promise = new Promise<any>((resolve, reject) => {
        this.http.get(environment.url_backend+'/api/departements').toPromise().then(res => {
            resolve(res);
        }).catch(err => {
            reject(err);
        });
    });
    return promise;
  }
  async getUsers() {
    let promise = new Promise<any>((resolve, reject) => {
        this.http.get(environment.url_backend+'/api/users').toPromise().then(res => {
            resolve(res);
        }).catch(err => {
            reject(err);
        });
    });
    return promise;
  }
 async getTachesByDepartement(departementId:number){
  let promise = new Promise<any>((resolve, reject) => {
    this.http.get(environment.url_backend+'/api/creation-projets?populate=*&departement=${departementId}').toPromise().then(res => {
        resolve(res);
    }).catch(err => {
        reject(err);
    });
});
return promise;
 }
}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TypeService {

  constructor(private http: HttpClient) { }

  async getTypeById(id) {
    let promise = new Promise<any>((resolve, reject) => {
      this.http.get(environment.url_backend+'/api/types/'+id+'?populate=*').toPromise().then(res => {
        resolve(res);
      }).catch(err=>{
        reject(err);
      });
    });
    return promise;
  }
  async getTypes() {
    let promise = new Promise<any>((resolve, reject) => {
      this.http.get(environment.url_backend+'/api/types?populate=*').toPromise().then(res => {
        resolve(res);
      }).catch(err=>{
        reject(err);
      });
    });
    return promise;
  }
  async addType(typeData) {
    let promise = new Promise<any>((resolve, reject) => {
        this.http.post(environment.url_backend+'/api/types', { data: typeData }).toPromise().then(res => {
            resolve(res);
        }).catch(err => {
            reject(err);
        });
    }); 
    return promise;
}
  async editType(typeId, typeData) {
    let promise = new Promise<any>((resolve, reject) => {
        this.http.put(environment.url_backend+`/api/types/${typeId}`, { data: typeData }).toPromise().then(res => {
            resolve(res);
        }).catch(err => {
            reject(err);
        });
    });
    return promise;
  }
  async deleteType(typeId) {
    let promise = new Promise<any>((resolve, reject) => {
        this.http.delete(environment.url_backend+`/api/types/${typeId}`).toPromise().then(res => {
            resolve(res);
        }).catch(err => {
            reject(err);
        });
    });
    return promise;
  }
}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  async getUserById(id) {
    let promise = new Promise<any>((resolve, reject) => {
      this.http.get(environment.url_backend+'/api/users/'+id+'?populate=*').toPromise().then(res => {
        resolve(res);
      }).catch(err=>{
        reject(err);
      });
    });
    return promise;
  }
  async deleteElementById(id) {
    let promise = new Promise<any>((resolve, reject) => {
      this.http.get(environment.url_backend+'/api/users/'+id+'?populate=*').toPromise().then(res => {
        resolve(res);
      }).catch(err=>{
        reject(err);
      });
    });
    return promise;
  }
  async getUsers() {
    let promise = new Promise<any>((resolve, reject) => {
      this.http.get(environment.url_backend+'/api/users?populate=*').toPromise().then(res => {
        resolve(res);
      }).catch(err=>{
        reject(err);
      });
    });
    return promise;
  }
  async addUser(userData) {
    console.log(JSON.stringify(userData))
    let promise = new Promise<any>((resolve, reject) => {
        this.http.post(environment.url_backend+'/api/users', userData ).toPromise().then(res => {
            resolve(res);
        }).catch(err => {
            reject(err);
        });
    }); 
    return promise;
}
  async editUser(userId, userData) {
    let promise = new Promise<any>((resolve, reject) => {
        this.http.put(environment.url_backend + `/api/users/${userId}`, userData ).toPromise().then(res => {
            resolve(res);
        }).catch(err => {
            reject(err);
        });
    });
    return promise;
  }
  async deleteUser(userId) {
    let promise = new Promise<any>((resolve, reject) => {
        this.http.delete(environment.url_backend+`/api/users/${userId}`).toPromise().then(res => {
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
  async getUsersMe() {
    let promise = new Promise<any>((resolve, reject) => {
      this.http.get(environment.url_backend+'/api/users/me').toPromise().then(res => {
        resolve(res);
      }).catch(err=>{
        reject(err);
      });
    });
    return promise;
  }
  async fetchData() {
    try {
      const userData = await this.getUsersMe();
      console.log(userData);
      // Handle the user data
    } catch (error) {
      console.error(error);
      // Handle any errors
    }
  }
}

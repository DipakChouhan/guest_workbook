import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {

    constructor(private httpClient: HttpClient) { }

    private httpRequestHeaders: HttpHeaders = new HttpHeaders({'No-Auth': 'True'})

    registerUser(signUpModel: any) {
      return this.httpClient.post("http://localhost:8080/security/userDetails/register", signUpModel, {headers: this.httpRequestHeaders});
    }

    // signInUser(signInModel: any) {
    //   return this.httpClient.post("http://localhost:8080/login", signInModel);
    // }
    signInUser(signInModel: any) {
      return this.httpClient.post("http://localhost:8080/security/userDetails/signIn", signInModel, {headers: this.httpRequestHeaders});
    }

    getUserDetails(userEmail: any) {
      return this.httpClient.post("http://localhost:8080/security/userDetails/getUserDetails", userEmail);

    }

  }

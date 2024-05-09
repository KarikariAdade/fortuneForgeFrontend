import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { environment } from "../environment";
import { User } from "../interfaces/user";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  base_url = environment.base_url;
  private tokenKey = 'token';


  registerUser(data: User): Observable<any> {
    console.log(this.base_url + 'auth/register')
    return this.http.post(this.base_url + 'auth/register', data);
  }

  loginUser(data:User): Observable<any> {
    this.removeToken()

    this.removeUserData();

    return this.http.post(this.base_url + 'auth/login', data);
  }

  logoutUser(): Observable<any> {
    this.removeUserData()
    this.removeToken()
    return this.http.post(this.base_url + 'auth/logout', null)
  }

  forgotPassword(data: User): Observable<any> {
    console.log(data)
    return this.http.post(this.base_url + 'auth/password/forgot', {'email': data.email})
  }

  resetPassword(data:any): Observable<any> {
    console.log('observable', data)
    return this.http.post(this.base_url + 'auth/password/reset', {'password': data.password, 'token': data.token})
  }


  getErrors(errors: any){
    let keys = Object.keys(errors.error),
      firstKey = keys[0];

    return errors.error[firstKey];
  }



  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  setToken(token: string): void {
    localStorage.setItem(this.tokenKey, token);
  }

  removeToken(): void {
    localStorage.removeItem(this.tokenKey);
  }

  removeUserData(): void {
    localStorage.removeItem('user');
  }

  isAuthenticated() {
    const token = this.getToken();
    // Check if token is present and not expired
    return !!token;
  }

  setUserData(data:object):void {
    localStorage.setItem('user', JSON.stringify(data));
  }

  getUserData(){
    return localStorage.getItem('user');
  }
}

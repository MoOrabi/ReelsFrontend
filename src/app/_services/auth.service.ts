import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';


@Injectable({providedIn:'root'})
export class AuthService {
 
  baseURL: string = "https://localhost:8082/";
  
  constructor(private http: HttpClient) {
  }
  headers = new HttpHeaders({
    
  })

  login(email: string, password: string){
    
    const params = {
      email: email.toLowerCase(),
      password: password
    }
    const options = {
      headers: this.headers,
      withCredentials: true,
      params: params
    };
    return this.http.post(this.baseURL + 'auth/login', null, options)
  }

  register(first_name: string, last_name: string, username: string, email: string, password: string): Observable<any> {
    const user = {
      first_name: first_name,
      last_name: last_name,
      user_name: username,
      email: email.toLowerCase(),
      password: password
    }
    const options = {
      headers: this.headers,
      withCredentials: true
    };
    return this.http.post(this.baseURL + 'signup', user, options);
  }
}

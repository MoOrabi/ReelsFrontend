import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Reel } from '../reels/Reel';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';



@Injectable({providedIn:'root'})
export class ReelsService {
 
  baseURL: string = "https://localhost:8082/api/v1/";
  
  constructor(private http: HttpClient) {
  }

  token: string = sessionStorage.getItem("TOKEN_KEY")
    
 
  getReels(): Observable<Reel[]> {
    const headers = { 'content-type': 'application/json', 
                        'Authorization' : this.token}
    console.log('getReels '+this.baseURL + 'reels')
    return this.http.get<Reel[]>(this.baseURL + 'reels',{'headers': headers})
  }
 
  addReel(reel: Reel, formData): Observable<any> {
    const headers = {'Authorization' : this.token}  
    const params = {'description': reel.description, 'country': reel.country, 'city': reel.city};
    
    return this.http.post(this.baseURL + 'reels', formData,{'headers':headers, 'params' :params})
  }
 
}

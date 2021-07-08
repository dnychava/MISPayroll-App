import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders  } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AppConstants } from '../core/AppConstants';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  
  API_URL: string = AppConstants.BASE_URL+'/auth';

  authenticated = false;
  
  constructor(private http: HttpClient) { }

  public validateUser(username: string, password: string, role: string) {
    //alert(this.API_URL);
    const credentials = username+':'+password;
    
    const headers = new HttpHeaders({ Authorization: 'Basic ' + btoa(credentials) });

    return this.http.post(this.API_URL+"/login", credentials, { headers });
  }

  public logoutCurrentLoggedUser(){
    return this.http.post(this.API_URL+"/logout",{});
  }
  
}

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from '../../services/auth.service';
import { AlertService } from '../../services/alert/alert.service'
import { throwError } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  hide: boolean = true;

  username: string = "";
  password: string = "";
  role: string = "admin"; 
  credentials = {username: '', password: ''};

  constructor(private authService: AuthService, private http: HttpClient, private router: Router, private alertService: AlertService) {
    
   }

  ngOnInit() {
  }

  btnClickOnLogin() : void {
    this.router.navigate(['/home']);
    //alert(this.username +' '+ this.password);
    /*this.authService.validateUser(this.username, this.password, this.role).subscribe(
      (data: any) => {
        console.log(data);  
        const credentials = this.username+':'+this.password;
        localStorage.setItem("token", btoa(credentials));
        this.router.navigate(['/home']);
      },
      error =>{
        console.error("Error while validating user ["+error.status+"]");
        if ( !error.status && error.status == 0) {
          this.alertService.error("The backend server is not running. Please connect to IT department.");
        } else {
          this.alertService.error(" Error!! Something went wrong ["+JSON.stringify(error)+"]");
        }
        return throwError(error);
      }
    )*/
  }

}

import { Component } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { Router } from '@angular/router';
import { throwError } from 'rxjs';

import {AuthService} from '../../services/auth.service';

@Component({
  selector: 'app-home-layout',
  templateUrl: './home-layout.component.html',
  styleUrls: ['./home-layout.component.css']
})
export class HomeLayoutComponent {

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  constructor(private breakpointObserver: BreakpointObserver,private router: Router, private authService:AuthService) {}

  btnClickOnLogout() : void {
    this.authService.logoutCurrentLoggedUser().subscribe(
      (data: any) => {
        //console.log(data);
        //alert( "logout ["+data+"]");
        localStorage.removeItem("token");
        this.router.navigate(['/login']);
      },
      error =>{
        console.error("Error while logouting user ["+error+"]");
        return throwError(error);
      }
    )
  }

}

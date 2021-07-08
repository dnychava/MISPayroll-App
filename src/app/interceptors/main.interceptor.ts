import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class MainInterceptor implements HttpInterceptor {

  constructor() {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
        console.log("In MainIterceptor ");
        //const headers = new HttpHeaders({ Authorization: 'Basic ' + btoa(credentials) });
        const credentials = localStorage.getItem("token");
        //console.log("=====out side=====credentials["+credentials+"]");
        if (credentials) {
            console.log("=====In side=====");
            request = request.clone({
                setHeaders: { 
                    Authorization: 'Basic ' + credentials
                }
            });
        }
    return next.handle(request);
  }
}

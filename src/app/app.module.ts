import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { from } from 'rxjs';
import { LayoutModule } from '@angular/cdk/layout';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { MAT_MOMENT_DATE_ADAPTER_OPTIONS, MomentDateAdapter } from '@angular/material-moment-adapter';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';


//User created interceptor
import {MainInterceptor} from './interceptors/main.interceptor';

//User created services
import { AuthService } from './services/auth.service'
import { EmployeeService } from './services/employee/employee.service';
import { AlertService } from './services/alert/alert.service'
import { ConfirmDialogService } from './services/dialog/ConfirmDialogService';

//User created module
import { AllmaterialcompModule } from './core/allmaterialcomp.module'
import { AppRoutingModule } from './app-routing.module';


//User created component;
import { LoginComponent } from './forms/login/login.component';
import { formatCurrency } from '@angular/common';
import { LoginLayoutComponent } from './forms/login-layout/login-layout.component';
import { DashboardComponent } from './forms/dashboard/dashboard.component';
import { HomeLayoutComponent } from './forms/home-layout/home-layout.component';
import { MenuComponent } from './forms/menu/menu.component';
import { EmployeeComponent } from './forms/employee/employee.component';
import { EmpAddComponent } from './forms/employee/emp-add/emp-add.component';
import { EmpSearchComponent } from './forms/employee/emp-search/emp-search.component'

import { AlertComponent } from './comman.comp/alert/alert.component';
import { AppConstants } from './core/AppConstants';
import { ConfirmDialogComponent } from './comman.comp/confirmation/confirm-dialog.component';




@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    LoginLayoutComponent,
    DashboardComponent,
    HomeLayoutComponent,
    MenuComponent,
    EmployeeComponent,
    EmpAddComponent,
    EmpSearchComponent,
    AlertComponent,
    ConfirmDialogComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    AllmaterialcompModule,
    FormsModule,ReactiveFormsModule,HttpClientModule,
    LayoutModule,FlexLayoutModule
  ],
  providers: [
    AuthService, EmployeeService, AlertService, ConfirmDialogService,
    { provide: HTTP_INTERCEPTORS, useClass: MainInterceptor, multi: true },

    { provide: MAT_MOMENT_DATE_ADAPTER_OPTIONS, useValue: { useUtc: true } },
    { provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS] },
    { provide: MAT_DATE_FORMATS, useValue: AppConstants.CUSTOM_DATE_FORMATS },
    
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

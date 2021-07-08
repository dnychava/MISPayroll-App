import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './forms/login/login.component'
import { LoginLayoutComponent } from './forms/login-layout/login-layout.component'
import { HomeLayoutComponent } from './forms/home-layout/home-layout.component'
import { DashboardComponent } from './forms/dashboard/dashboard.component'
import { EmployeeComponent} from './forms/employee/employee.component';


const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  {
      path: 'login', component: LoginLayoutComponent, data: { title: 'first comp' },
      children: [
          { path: '', component: LoginComponent }
      ]  
  },
  {
      path: 'home', component: HomeLayoutComponent, 
      children: [
          { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
          { path: 'dashboard', component: DashboardComponent },
          { path: 'employee', component: EmployeeComponent }/*,
          { path: 'fmr-report', component: FmrReportComponent },
          { path: 'expenditure-upload', component: ExpenditureUploadFormComponent }*/
      ]
  }
  
] ;

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Employee } from '../../models/employee/employee';
import { AppConstants } from '../../core/AppConstants';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  private EMP_URL = AppConstants.BASE_URL + "/employee";

  private className: string = "EmployeeService | ";

  constructor(private http: HttpClient) { }

  /**
   * This method calling to server for save the employee.
   * 
   * @param empObj is Employee
   * @returns HttpClient object
   */


  public saveEmp(empObj: Employee){
    return this.http.post(this.EMP_URL+"/addEmp", empObj);
  }

}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Employee } from '../../models/employee/employee';
import { AppConstants } from '../../core/AppConstants';
import { EMPData } from '../../models/employee/emp.data';
import { EMPSearch } from '../../models/employee/emp.search';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  private EMP_URL = AppConstants.BASE_URL + "/employee";

  private className: string = "EmployeeService | ";

  empData$ !: BehaviorSubject<any>;
  empData: Array<EMPData> = [];

  constructor(private http: HttpClient) { 
    this.empData$ = new BehaviorSubject([]);
  }

  /**
   * This method calling to server for save the employee.
   * 
   * @param empObj is Employee
   * @returns HttpClient object
   */
  public saveEmp(empObj: Employee){
    return this.http.post(this.EMP_URL+"/addEmp", empObj);
  }

  /**
   * This method calling to server for fetch employee with provided the filter object.
   * 
   * @param empObj is Employee
   * @returns HttpClient object
   */
   public getEmp(empSearchObj: EMPSearch){
    this.empData = this.buildDummyData();
    this.empData$.next(this.empData);
  }


  private buildDummyData(){
    const emps: Array<EMPData> = [];
    for (let index = 1; index <= 100; index++) {
      var test: EMPData = {empId: ''+index, firstName:'firstName_'+index, middleName:'middleName_'+index,
      lastName:'lastName_'+index, designation:'designation_'+index, unitName:'unitName_'+index, 
      };
      emps.push(test);
    }
    return emps;
      
  }

}

import { BreakpointObserver } from '@angular/cdk/layout';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatAccordion } from '@angular/material/expansion';
import { Router } from '@angular/router';
import { EmployeeService } from '../../../services/employee/employee.service';
import { AlertService } from '../../../services/alert/alert.service';
import { ResponseDTO } from '../../../models/response.dto';


@Component({
  selector: 'emp-search',
  templateUrl: './emp-search.component.html',
  styleUrls: ['./emp-search.component.css']
})
export class EmpSearchComponent implements OnInit {

 //Storing the emp search information and validation
 empSearchInfo: FormGroup;

  constructor(private fb: FormBuilder, breakpointObserver: BreakpointObserver,
    private employeeService: EmployeeService, private httpClien: HttpClient,
    private router: Router, private alertService: AlertService) { 
      //Creating a FormControl of empSearchInfo object.
    this.empSearchInfo = fb.group(
      {
        empId: [''],
        firstName: [''],
        middleName: [''],
        lastName: [''],
      }
    );
    }

  ngOnInit(): void {
  }

  step = 0;

  setStep(index: number) {
    this.step = index;
  }

  nextStep() {
    this.step++;
  }

  prevStep() {
    this.step--;
  }

  
 
}

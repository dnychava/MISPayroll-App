import { Component, OnInit } from '@angular/core';
import { FormGroupName, FormControl, FormBuilder, Validators, FormGroup } from '@angular/forms';
import { BreakpointObserver } from '@angular/cdk/layout';
import { StepperOrientation } from '@angular/material/stepper';
import { from, Observable, throwError } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

import * as _moment from 'moment';
//import { default as _rollupMoment } from 'moment';

import { Unit } from '../../../models/master/unit'
import { Designation } from '../../../models/master/designation'
import { AppConstants } from '../../../core/AppConstants';
import { Employee } from '../../../models/employee/employee';
import { Address } from '../../../models/employee/address';
import { Bank } from '../../../models/employee/bank';
import { PFDetail } from '../../../models/employee/pfdetails';
import { EmployeeService } from '../../../services/employee/employee.service';
import { AlertService } from '../../../services/alert/alert.service';
import { ResponseDTO } from '../../../models/response.dto';

const moment = _moment;

@Component({
  selector: 'emp-add',
  templateUrl: './emp-add.component.html',
  styleUrls: ['./emp-add.component.css']
})


export class EmpAddComponent implements OnInit {

  //Storing the emp personal information and validation
  empPersonalInfo: FormGroup;

  //Storing the emp address and validation
  empAddress: FormGroup;

  //Storing the emp Bank detail and validation
  empBank: FormGroup;

  //Storing the emp PF detail and validation
  empPFA: FormGroup;

  //Changing the orientation(horizontal and vertical) when resizing the screen 
  stepperOrientation: Observable<StepperOrientation>;

  private unitOptions: Unit[] = [
    { id: 1, name: 'DHULE HQ' },
    { id: 2, name: 'Civil HP' },
    { id: 3, name: 'Block' },
    { id: 4, name: 'Societys' },
    { id: 5, name: 'Medical collge' }
  ];

  private designationOptions: Designation[] = [
    { id: 1, name: 'ANM' },
    { id: 2, name: 'Staff Nurse (GNM)' },
    { id: 3, name: 'Psychiastric (NMHP)' },
    { id: 4, name: 'LHV Staff' },
    { id: 5, name: 'NVHCP Lab Technician' },
    { id: 6, name: 'RNTCP Technician' },
    { id: 7, name: 'Sicklecell Lab Technician' },
    { id: 8, name: 'Medical Officer RNTCP' },
    { id: 9, name: 'NPCDCS Physiotherapist' },
    { id: 10, name: 'NLEP Physiotherapist' },
    
  ];

  unitFltrOptions!: Observable<Unit[]>;
  designationFltrOptions!: Observable<Designation[]>;

  private className: string = "EmpAddComponent | ";

  private empObj!: Employee;

  constructor(
    private fb: FormBuilder, breakpointObserver: BreakpointObserver,
    private employeeService: EmployeeService, private httpClien: HttpClient,
    private router: Router, private alertService: AlertService ) {
    this.stepperOrientation = breakpointObserver.observe('(min-width: 800px)')
      .pipe(map(({ matches }) => matches ? 'horizontal' : 'vertical'));

    //Creating a FormControl of empPersonalInfo object.
    this.empPersonalInfo = fb.group(
      {
        designation: ['', [Validators.required]],
        firstName: ['', [Validators.required, Validators.maxLength(20)]],
        middleName: ['', [Validators.required, Validators.maxLength(20)]],
        lastName: ['', [Validators.required, Validators.maxLength(20)]],
        unit: ['', [Validators.required]],
        gender: ['Male', [Validators.required]],
        dateOfBirth: [{value:'', disabled: true }, [Validators.required]],
        dateOfJoining: ['', [Validators.required]],
        isHandicap: [false, [Validators.required]],
        adharNo: ['', [Validators.required, Validators.maxLength(20)]],
        mobileNo: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(10)]],
        emailId: ['', [Validators.required, Validators.email]]
      }
    );
    //Creating a FormControl of empAddress object.
    this.empAddress = fb.group(
      {
        address: ['', [Validators.required]],
        talk: ['', [Validators.required]],
        dist: ['', [Validators.required, Validators.maxLength(20)]],
        pinCode: ['', [Validators.required]],
        phoneNo: ['', [Validators.required]]
      }
    );

    //Creating a FormControl of empBank object.
    this.empBank = fb.group(
      {
        accountNo: ['', [Validators.required, Validators.maxLength(20)]],
        name: ['', [Validators.required]],
        ifscCode: ['', [Validators.required, Validators.min(11), Validators.maxLength(11)]],
      }
    );

    //Creating a FormControl of empPFA object.
    this.empPFA = fb.group(
      {
        isEPFApplicable: [false, [Validators.required]],
        memberId: ['', [] ],
        uanNo: ['', []],
        epfName: ['', []]
      }
    );

    console.log(this.empPersonalInfo);
  }

  ngOnInit(): void {

    //Registring custom filter for Unit field
    this.unitFltrOptions = this.empPersonalInfo.controls['unit'].valueChanges
      .pipe(
        startWith(''),
        map(value => typeof value === 'string' ? value : value.name),
        map(name => name ? this.unitFilter(name) : this.unitOptions.slice())
      );
      
      //Registring custom filter for Desination field
      this.designationFltrOptions = this.empPersonalInfo.controls['designation'].valueChanges
      .pipe(
        startWith(''),
        map(value => typeof value === 'string' ? value : value.name),
        map(name => name ? this.designationFilter(name) : this.designationOptions.slice())
      );

      //Adding custom validation for PFA form
        this.customPFValidation();

      
  }

  displayUnit(unit: Unit): string {
    console.log("Unit -->" + JSON.stringify(unit));
    return unit && unit.name ? unit.name : '';
  }

  private unitFilter(name: string): Unit[] {
    const filterValue = name.toLowerCase();
    return this.unitOptions.filter(option => option.name.toLowerCase().indexOf(filterValue) === 0);
  }

  displayDesignation(designation: Designation): string {
    console.log("eeee" + designation);
    return designation && designation.name ? designation.name : '';
  }

  private designationFilter(name: string): Designation[] {
    const filterValue = name.toLowerCase();
    return this.designationOptions.filter(option => option.name.toLowerCase().indexOf(filterValue) === 0);
  }

  customPFValidation(){
    const methodName: string =this.className +" customPFValidation | ";
    console.info( methodName + AppConstants.START);
    try {
      this.empPFA.get('isEPFApplicable')?.valueChanges.subscribe((isPFApplicableVal)=>{
        console.log("isEPFApplicable["+isPFApplicableVal+"]");
        if (isPFApplicableVal) {
          this.empPFA.get('uanNo')?.setValidators([Validators.required]);
          this.empPFA.get('memberId')?.setValidators([Validators.required]);
          this.empPFA.get('epfName')?.setValidators([Validators.required]);
          
        }else{
          this.empPFA.get('memberId')?.clearValidators();
          this.empPFA.get('uanNo')?.clearValidators();
          this.empPFA.get('epfName')?.clearValidators();
          this.empPFA.get('uanNo')?.setValidators([]);
          this.empPFA.get('memberId')?.setValidators([]);
          this.empPFA.get('epfName')?.setValidators([]);
        }
        this.empPFA.get('memberId')?.updateValueAndValidity();
        this.empPFA.get('uanNo')?.updateValueAndValidity();
        this.empPFA.get('epfName')?.updateValueAndValidity();
          
      });  
    } catch (error) {
      console.error("ERROR IN customPFValidation "+error);
      throw error;      
    }
    console.info( methodName + AppConstants.END);    
  }

  saveEmp(event: Event){
    const methodName: string =this.className +"saveEmp | ";
    console.info( methodName + AppConstants.START);
    try {
      /*console.log("empPersonalInfo" + JSON.stringify(this.empPersonalInfo.value));
      console.log("empAddress" + JSON.stringify(this.empAddress.value));
      console.log("empBank" + JSON.stringify(this.empBank.value));
      console.log("empPFA" + JSON.stringify(this.empPFA.value));*/
      this.buildEmpClsObj();
      this.employeeService.saveEmp(this.empObj).subscribe(
        (resData: any) => {
          const responseDTO: ResponseDTO = resData;
          console.log( methodName + " responseDTO ["+JSON.stringify(responseDTO)+"]" );
          if(responseDTO.status && (responseDTO.status == 'CREATED') ){
            this.alertService.success( responseDTO.message );
          }else{
            this.alertService.error(responseDTO.errors);
          }
        },
        error => {
          console.error( methodName + "Error while caling saveEmp method [" + JSON.stringify(error) + "]");
          this.alertService.error(" Error!! Something went wrong ["+JSON.stringify(error)+"]");
          return throwError(error);
        }
      );
      
    } catch (error) {
      console.error( methodName + "Erro["+JSON.stringify(error)+"]");
      this.alertService.error(" Error!! Something went wrong ["+JSON.stringify(error)+"]");
    }
    console.info( methodName + AppConstants.END);    
  }
  
  /**This method build <b>emp object</b> from entered value in form*/
  private buildEmpClsObj(){
    const methodName: string =this.className +" buildEmpClsObj | ";
    console.info( methodName + AppConstants.START);
    try {
      console.log(this.empPersonalInfo.get("dateOfBirth"));
      this.empObj = <Employee>JSON.parse( JSON.stringify(this.empPersonalInfo.value) );
      this.empObj.address = <Address>JSON.parse( JSON.stringify(this.empAddress.value) );
      this.empObj.bank = <Bank>JSON.parse( JSON.stringify(this.empBank.value) );
      this.empObj.pf = <PFDetail>JSON.parse( JSON.stringify(this.empPFA.value) );
      
      console.log("FINAL Employee Class object ["+JSON.stringify(this.empObj)+"]");
      
    } catch (error) {
      console.error( methodName + "Erro["+JSON.stringify(error)+"]");
    }
    console.info( methodName + AppConstants.END);
  }

}

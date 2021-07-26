import { BreakpointObserver } from '@angular/cdk/layout';
import { HttpClient, JsonpClientBackend } from '@angular/common/http';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatAccordion } from '@angular/material/expansion';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { EmployeeService } from '../../../services/employee/employee.service';
import { AlertService } from '../../../services/alert/alert.service';
import { ResponseDTO } from '../../../models/response.dto';
import { EMPData } from '../../../models/employee/emp.data';
import { AppConstants } from '../../../core/AppConstants';
import { ConfirmDialogService } from '../../../services/dialog/ConfirmDialogService';
import { filter } from 'rxjs/operators';



@Component({
  selector: 'emp-search',
  templateUrl: './emp-search.component.html',
  styleUrls: ['./emp-search.component.css']
})
export class EmpSearchComponent implements OnInit, AfterViewInit {

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  //Storing the emp search information and validation
  empSearchInfo: FormGroup;

  //Employee search data information.
  displayedColumns: string[] = ['empId', 'designation', 'firstName', 'middleName', 'lastName', 'unitName', 'action'];
  dataSource: any = new MatTableDataSource<EMPData>();

  private className: string = "EmpAddComponent | ";

  isLoadingResults = true;
  loadingMsg: string ="";

  constructor(private fb: FormBuilder, breakpointObserver: BreakpointObserver,
    private employeeService: EmployeeService, private httpClien: HttpClient,
    private router: Router, private alertService: AlertService, public dialog: MatDialog,
    private dialogService: ConfirmDialogService) {

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

  ngAfterViewInit(): void {

  }

  ngOnInit(): void {
  }

  step = 0;

  setStep(index: number) {
    this.step = index;
  }

  nextStep() {
    this.step++;
    this.searchOnClick();
  }

  prevStep() {
    this.step--;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  /**
   * This method call the server and assinged the search result to dataSource.
   */
  searchOnClick() {
    const methodName: string = this.className + "searchOnClick |";
    console.info(methodName + AppConstants.START);
    try {
      this.loadingMsg = "Fetching an employee data...";
      this.isLoadingResults = true;
      this.dataSource = new MatTableDataSource(this.buildDummyData());
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      this.isLoadingResults = false;
    } catch (error) {
      this.isLoadingResults = false;
      console.error(methodName + " Error while calling to server for fetch data.");
      throw error;
    }
    console.info(methodName + AppConstants.END);
  }

  onClickView(empId: String) {
    console.log(" onClickView " + empId);
  }
  onClickEdit(empId: String) {
    console.log(" onClickEdit " + empId);
  }

  onClickDelete(empId: String, selectedIndex: number) {
    const methodName: string = this.className + "onClickDelete |";
    console.info(methodName + AppConstants.START);
    try {
      console.log(" onClickDelete " + empId + " selectedIndex[" + selectedIndex + "]");
      const options = {
        title: 'Confirmation dialog',
        message: 'Are you want to delete this Employee Id[' + empId + '] ?',
        cancelText: 'No',
        confirmText: 'Yes'
      };

      //Opening the confirmation dialog box.
      this.dialogService.open(options);
      this.dialogService.confirmed().subscribe(confirmed => {
        if (confirmed) {
          this.loadingMsg = "Deleting an employee data...";
          this.isLoadingResults = true;
          this.dataSource.data.splice(selectedIndex, 1);
          this.dataSource._data.next(this.dataSource.data);
          this.alertService.success( "The employee ["+empId+"] has been deleted a successfully" );
          this.loadingMsg = "";
          this.isLoadingResults = false;
        }
      });

    } catch (error) {
      console.error(methodName + " Error while deleting record. " + JSON.stringify(error));
      throw error;
    }
    console.info(methodName + AppConstants.END);
  }

  private buildDummyData() {
    const emps: Array<EMPData> = [];
    for (let index = 1; index <= 100; index++) {
      var test: EMPData = {
        empId: '' + index, firstName: 'firstName_' + index, middleName: 'middleName_' + index,
        lastName: 'lastName_' + index, designation: 'designation_' + index, unitName: 'unitName_' + index,
      };
      emps.push(test);
    }
    console.log(JSON.stringify(emps));
    return emps;

  }
}


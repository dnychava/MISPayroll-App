import { Address } from "./address";
import { Bank } from "./bank";
import { Designation } from "../master/designation";
import { PFDetail } from "./pfdetails";
import { Unit } from "../master/unit";

export class Employee {
    rid!:number;    
    designation!: Designation;
    unit!:Unit;
    address!:Address;
    bank!:Bank;
    pf!:PFDetail;
    firstName!:string;
    middleName!:string;
    gender!:string;
    dateOfBirth!:string;
    dateOfJoining!:string;
    isHandicap!:string;
    adharNo!:string;
    mobileNo!:number;
    emailId!:string;
    isActive:boolean = true;
    remark:string = "";
}

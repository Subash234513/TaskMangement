import { Injectable } from '@angular/core';
import { BehaviorSubject } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class SharedService {
  isLoggedin = false;
  isSideNav = false;
  Loginname:any = '';
  entity_Name = '';
  Memofrom='';
  loginUserId='';
  loginEmpId='';
  MyModuleName='';
  transactionList:any= [];

  masterList:any= [];
  // get_userlocation:any;
  
  menuUrlData: Array<any> | any;
  titleUrl: any;
  public forwardMessage = new BehaviorSubject<string>('');
  public summaryData = new BehaviorSubject<string>('');
  public fetchData = new BehaviorSubject<string>('')
  public imageValue = new BehaviorSubject<any>('')
  public get_userlocation = new BehaviorSubject<any>(' ');
  public fetchDataa = new BehaviorSubject<string>('')
  public deptEditValue = new BehaviorSubject<string>('');
  public categoryEditValue = new BehaviorSubject<string>('');
  public subCategoryEditValue = new BehaviorSubject<string>('');
  public employeeView = new BehaviorSubject<string>('');
  public departmentView = new BehaviorSubject<string>('');
  public empView = new BehaviorSubject<string>(' ');
  public priorityEditValue = new BehaviorSubject<string>(' ');
  public ionName = new BehaviorSubject<string>('');
  // public menuUrlData = new BehaviorSubject<any>('');
  // public titleUrls = new BehaviorSubject<any>('');
  public subCategoryID = new BehaviorSubject<any>('');
  public memoView = new BehaviorSubject<any>('');
  public memoViews = new BehaviorSubject<any>('');
  public submodulesfa=new BehaviorSubject<any>('');
  public submodulestneb=new BehaviorSubject<any>('');
  public submodulessms=new BehaviorSubject<any>('');
  public commonsummary = new BehaviorSubject<any>('');
  public entity_name =new BehaviorSubject<any>('');
  public submodulesreport=new BehaviorSubject<any>('');
  public appVersion=new BehaviorSubject<any>('');
  public submodulespayroll=new BehaviorSubject<any>('');
  public fetsubmodule=new BehaviorSubject<any>('');
  public appraisalsubmodule=new BehaviorSubject<any>('');
  public story_Id=new BehaviorSubject<any>('');
  public empIdValue = new BehaviorSubject<any>(''); 

  userlocation: boolean | any;
  statusvalue: any;




  constructor() { }
}





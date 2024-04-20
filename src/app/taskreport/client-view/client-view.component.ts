import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { TaskService } from '../task.service';
import { DatePipe } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
// import { ErrorHandlingServiceService } from 'src/app/service/error-handling-service.service';
// import { SharedService } from 'src/app/service/shared.service';
import { SharedService } from '../../service/shared.service';
import { ErrorHandlingServiceService } from '../../service/error-handling-service.service';
import { NotificationService } from '../notification.service';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { debounceTime, distinctUntilChanged, tap, switchMap, finalize } from 'rxjs/operators';
import { COMMA, ENTER } from '@angular/cdk/keycodes';



@Component({
  selector: 'app-client-view',
  templateUrl: './client-view.component.html',
  styleUrls: ['./client-view.component.scss']
})
export class ClientViewComponent implements OnInit {
  clientdetails: any;
  pipelinedropdown: any;
  presentpages: any = 1;

  constructor(private fb: FormBuilder, private router: Router, private shareService: SharedService, private toastr: ToastrService,
    private SpinnerService: NgxSpinnerService, private errorHandler: ErrorHandlingServiceService, private taskservice: TaskService,
    private notification: NotificationService,private datePipe: DatePipe,private dialog: MatDialog) {
    
   }
   SearchClient=new FormControl()

  TypeOfForm:string | any;
  clientcreation:boolean =false
  clientSummary:boolean =false
  projectcreation:boolean =false
  teammembersadd:boolean =false
  projectSummary:boolean =false
  modulecreation:boolean =false
  moduleSummary:boolean =false
  mappingcreation:boolean =false
  mappingSummary:boolean =false
  teamSummary:boolean =false
  teamcreation:boolean =false
  showcheckbox:boolean =false
  showmember:boolean =false 
  pipelineSummary:boolean =false
  pipelinecreation:boolean =false
  clientviewsummary:boolean=true
  isLoading = false;
  ID_Value_To_clientEdit: any = ''
  clientForm:FormGroup | any;
  clientList:any;
  has_nextclient = true;
  has_previousclient = true;
  presentpageclient: number = 1;
  pagesizeclient=10;
  
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];

  ngOnInit(): void {
    this.clientSearch('');

    this.clientForm = this.fb.group({
      name: [''],
      pipeline_template_id: ['']
    })
    this.get_pipelineSummary(this.presentpages);

    
  }
  
  oncancelClient(){
    this.clientcreation = false;
    this.clientSummary = false;
    this.clientviewsummary=true
    this.projectcreation = false;
    this.projectSummary = false;
    this.modulecreation = false;
    this.moduleSummary = false;
    this.mappingcreation = false;
    this.mappingSummary = false;
    this.teamSummary = false;
    this.teamcreation = false;
    this.showmember = false;
    this.showcheckbox = false;
    this.pipelineSummary = false;
    this.pipelinecreation = false;
  }
  addClient(formtype:any,data:any){
    this.TypeOfForm = formtype;
    this.clientcreation = true;
    this.clientSummary = false;
    this.clientviewsummary=false
    if (data != '') {
      this.ID_Value_To_clientEdit = data.id
      this.clientForm.patchValue({
        name: data.name,
        pipeline_template_id: data.pipline_template?.id
      })
    }
    else {
      this.clientForm.reset('')
    }
  }
  get_clientSummary(pageno:any) {
    this.taskservice.clientSummary_master(pageno)
      .subscribe(result => {
        this.SpinnerService.hide();
        this.clientList = result['data']
        let dataPagination = result['pagination'];
        if (this.clientList.length > 0) {
          this.has_nextclient = dataPagination.has_next;
          this.has_previousclient = dataPagination.has_previous;
          this.presentpageclient = dataPagination.index;
        }
      }, (error) => {
        this.errorHandler.handleError(error);
        this.SpinnerService.hide();
      })
  }
  clientActiveInactive(status:any, data:any) {
    this.SpinnerService.show();
    let clientID = data?.id
    this.taskservice.clientActiveInactive(clientID,status)
      .subscribe(results => {
        console.log("results", results)
        this.notification.showSuccess(results.message)
        this.clientSearch('') 
        this.SpinnerService.hide();
      })
  }
  clientSearch(hint: any) {
   
    if (hint == 'next') {
      this.get_clientSummary(this.presentpageclient + 1)
    }
    else if (hint == 'previous') {
      this.get_clientSummary(this.presentpageclient - 1)
    }
    else {
      this.get_clientSummary(1)
    }

  }
 
  
  clientSubmit(){
    this.SpinnerService.show();
    // if (this.clientForm.value.name === "") {
    //   this.toastr.error('Please Enter Client');
    //   this.SpinnerService.hide();
    //   return false;
    // }
    let data = this.clientForm.value
    if (data.name == '' || data.name == undefined || data.name == null) {
      this.toastr.error('Please Enter Client');
      this.SpinnerService.hide();
    
    }
    let dataToSubmit;
    if (this.ID_Value_To_clientEdit != '') {
      let id = this.ID_Value_To_clientEdit
      dataToSubmit = Object.assign({}, { 'id': id }, data)
    }
    else {
      dataToSubmit = data
    }

    this.taskservice.clientForm(dataToSubmit)
    .subscribe(res => {
      console.log("client click", res)
      if(res.status == 'success'){

        if (this.ID_Value_To_clientEdit != '') {
          this.notification.showSuccess(res.message)
          this.ID_Value_To_clientEdit = ''
        } else {
          this.notification.showSuccess(res.message)
          this.ID_Value_To_clientEdit = ''
        }
        this.clientForm = this.fb.group({
          name: [''],
        })
        this.clientSummary = true;
        this.clientviewsummary=true
        this.clientcreation = false;
        this.clientSearch('');
        this.SpinnerService.hide();
        
       } else {
        this.notification.showError(res.description)
        this.SpinnerService.hide();
 
      }
    },
    error => {
      this.errorHandler.handleError(error);
      this.SpinnerService.hide();
    }
    )
  }
  Search(){
    if(this.SearchClient.value){
      this.taskservice.clientSummary_master_search(this.SearchClient.value).subscribe(data=>{
        this.clientList=data['data']
        this.has_nextclient=data.pagination.has_next
        this.has_previousclient=data.pagination.has_previous
        this.presentpageclient=data.pagination.index
      })
    }
    else{
      this.taskservice.clientSummary_master_search('').subscribe(data=>{
        this.clientList=data['data']
        this.has_nextclient=data.pagination.has_next
        this.has_previousclient=data.pagination.has_previous
        this.presentpageclient=data.pagination.index
      })
    }
  }
  Clear(){
    this.SearchClient.reset()
    this.Search()
  }
  get_pipelineSummary(pageno:any) {
    this.taskservice.pipelinetempsum()
      .subscribe(result => {     
        this.pipelinedropdown = result['data']
        let dataPagination = result['pagination'];
        
      }, (error) => {
        this.errorHandler.handleError(error);

      })
  }
 
  
 

}

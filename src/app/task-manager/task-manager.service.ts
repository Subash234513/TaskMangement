import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";
import { Idle } from "@ng-idle/core";
// import { HttpParams } from "@angular/common/http";
// import { DEFAULT_INTERRUPTSOURCES } from "@ng-idle/core";
// import { map } from "rxjs/operators";
// import { BehaviorSubject } from "rxjs";
// import { environment } from "src/environments/environment";
import { environment } from "../../environments/environment";
// import { strict } from "assert";

const CMS_Url = environment.apiURL;

@Injectable({
  providedIn: "root",
})
export class TaskManagerService {
  private apiUrl = environment.apiURL;

  constructor(private http: HttpClient, private idle: Idle) {}
  idleState = "Not started.";
  timedOut = false;
  reset() {
    this.idle.watch();
    this.idleState = "Started.";
    this.timedOut = false;
  }

  createStory(storyData: any): Observable<any> {
    this.reset();
    const getToken= localStorage.getItem("sessionData");
    if(getToken!==null){
      let tokenValue = JSON.parse(getToken);
      let token = tokenValue.token;
      const headers = { Authorization: "Token " + token };
      return this.http.post<any>(this.apiUrl + "taskserv/stories", storyData, {
        headers: headers,
      });
    }
    else{
      throw new Error("Session data not found in localStorage");

    }
   
  }

  getStories(search: { query: string; start_date: string; end_date: string; team: string; sprint: string; }, pageno: string): Observable<any> {
    this.reset();
    const getToken:any = localStorage.getItem("sessionData");
    if(getToken!==null){
      let tokenValue = JSON.parse(getToken);
      let token = tokenValue.token;
  
      const headers = new HttpHeaders({
        Authorization: "Token " + token,
      });
  
      // Make an HTTP GET request to a specific endpoint
      return this.http.get<any>(this.apiUrl + 'taskserv/stories?page=' +pageno + '&query=' + search.query + '&from_date=' + search.start_date + '&to_date=' + search.end_date + '&team_id='+search.team+'&sprint_id='+search.sprint, { headers });
    }
    else{
      throw new Error("Session data not found in localStorage");
    }

  }

  // story view
  getStoriesView(id: any): Observable<any> {
    this.reset();
    const getToken:any = localStorage.getItem("sessionData");
    if(getToken!==null){
      let tokenValue = JSON.parse(getToken);
      let token = tokenValue.token;
      const headers = { Authorization: "Token " + token };
      return this.http.get<any>(
        this.apiUrl + "taskserv/stories?action=fetch&story_id=" + id,
        { headers: headers }
      );
    }
    else{
      throw new Error("Session data not found in localStorage");
    }
  
  }

  // story task view
  getStories_taskView(id: any): Observable<any> {
    this.reset();
    const getToken:any = localStorage.getItem("sessionData");
    if(getToken!==null){
      let tokenValue = JSON.parse(getToken);
      let token = tokenValue.token;
      const headers = { Authorization: "Token " + token };
      return this.http.get<any>(
        this.apiUrl + "taskserv/task/" + id + "?action=view",
        { headers: headers }
      );
    }
    else{
      throw new Error("Session data not found in localStorage");
    }
  
  }

  // story task summary
  getStoryTaskSummary(id: any, pageno: string): Observable<any> {
    this.reset();
    const getToken:any = localStorage.getItem("sessionData");
    if(getToken!==null){
      let tokenValue = JSON.parse(getToken);
      let token = tokenValue.token;
      const headers = { Authorization: "Token " + token };
      return this.http.get<any>(
        this.apiUrl + "taskserv/story_task/" + id + "?page=" + pageno,
        { headers: headers }
      );
    }
    else{
      throw new Error("Session data not found in localStorage");
    }
  
  }

  // developer
  public task_employeesearch(data: any, page: string | number): Observable<any> {
    this.reset();
    const getToken: any = localStorage.getItem("sessionData");
    let tokenValue = JSON.parse(getToken);
    let token = tokenValue.token;
    const headers = { Authorization: "Token " + token };
    return this.http.get<any>(
      this.apiUrl + "taskserv/search_developer?&query=" + data + "&page=" + page,
      { headers: headers }
    );
  }
  public task_employeesearch_create(data: any, page: string | number): Observable<any> {
    this.reset();
    const getToken: any = localStorage.getItem("sessionData");
    let tokenValue = JSON.parse(getToken);
    let token = tokenValue.token;
    const headers = { Authorization: "Token " + token };
    return this.http.get<any>(
      this.apiUrl + "taskserv/project_employee_summary?action=project&query=" + data + "&page=" + page,
      { headers: headers }
    );
  }

  // dependency dropdown
  public dependencytype(value: string, pageno: string | number,mapping_id: string): Observable<any> {
    this.reset();
    const getToken: any = localStorage.getItem("sessionData");
    let tokenValue = JSON.parse(getToken);
    let token = tokenValue.token;
    const headers = { Authorization: "Token " + token };
    return this.http.get<any>(
      this.apiUrl +
        "taskserv/task_dependency_dd?page=" +
        pageno +
        "&query=" +
        value+"&mapping_id="+mapping_id,
      { headers: headers }
    );
  }

  // story based task creation
  public storyBasedTaskCreation(data: any): Observable<any> {
    this.reset();
    const getToken: any = localStorage.getItem("sessionData");
    let tokenValue = JSON.parse(getToken);
    let token = tokenValue.token;
    const headers = { Authorization: "Token " + token };
    return this.http.post<any>(
      this.apiUrl + "taskserv/common_task_creation",
      data,
      { headers: headers }
    );
  }

  // story based task summary
  public storyBasedTaskSummary(
    searchlist: any,
    pageno: string,
    statuslist: any
  ): Observable<any> {
    this.reset();
    const getToken: any = localStorage.getItem("sessionData");
    let tokenValue = JSON.parse(getToken);
    let token = tokenValue.token;
    let jsonstatus: any = {
      status: statuslist,
    };
    let jsonValue = Object.assign({}, searchlist, jsonstatus);
    console.log("task search", jsonValue);
    const headers = { Authorization: "Token " + token };
    return this.http.post<any>(
      this.apiUrl + "taskserv/common_task_summary?page=" + pageno,
      jsonValue,
      { headers: headers }
    );
  }

  // priority dropdown
  public get_Priority(): Observable<any> {
    this.reset();
    const getToken: any = localStorage.getItem("sessionData");
    let tokenValue = JSON.parse(getToken);
    let token = tokenValue.token;
    const headers = { Authorization: "Token " + token };
    return this.http.get<any>(
      this.apiUrl + "taskserv/task_dropdown?action=priority",
      { headers: headers }
    );
  }

  // sprint creation
  public sprintForm(list: any): Observable<any> {
    this.reset();
    const getToken: any = localStorage.getItem("sessionData");
    let tokenValue = JSON.parse(getToken);
    let token = tokenValue.token;
    const headers = { Authorization: "Token " + token };
    return this.http.post<any>(this.apiUrl + "taskserv/sprint", list, {
      headers: headers,
    });
  }

  // sprint creation
  public tmsSubmitForm(list: any): Observable<any> {
    this.reset();
    const getToken: any = localStorage.getItem("sessionData");
    let tokenValue = JSON.parse(getToken);
    let token = tokenValue.token;
    const headers = { Authorization: "Token " + token };
    return this.http.post<any>(this.apiUrl + "taskserv/timesheet", list, {
      headers: headers,
    });
  }

  // sprint summary
  getSprintSummary(obj: { start_date: string; end_date: string; query: string; status: string; }, pageno: string): Observable<any> {
    this.reset();
    const getToken:any = localStorage.getItem("sessionData");
    let tokenValue = JSON.parse(getToken);
    let token = tokenValue.token;
    const headers = { Authorization: "Token " + token };
    return this.http.get<any>(
      this.apiUrl +
        "taskserv/sprint?page=" +
        pageno +
        "&from_date=" +
        obj.start_date +
        "&to_date=" +
        obj.end_date +
        "&query=" +
        obj.query +
        "&method=" +
        obj.status,
      { headers: headers }
    );
  }
  //  hrs
  ChaneStatus(obj: any, id: any): Observable<any> {
    this.reset();
    const getToken:any = localStorage.getItem("sessionData");
    let tokenValue = JSON.parse(getToken);
    let token = tokenValue.token;
    const headers = { Authorization: "Token " + token };
    return this.http.post<any>(
      this.apiUrl + "taskserv/task/" + id + "?action=status",
      obj,
      { headers: headers }
    );
  }

  // sprint filter
  public getSprintFilter(appkeyvalue: string, pageno: string | number): Observable<any> {
    this.reset();
    const getToken:any = localStorage.getItem("sessionData");
    let tokenValue = JSON.parse(getToken);
    let token = tokenValue.token;
    const headers = { Authorization: "Token " + token };
    return this.http.get<any>(
      this.apiUrl + "taskserv/sprint?page=" + pageno + "&query=" + appkeyvalue,
      { headers: headers }
    );
  }

  // team filter
  public getTeamFilter(appkeyvalue: string, pageno: string | number): Observable<any> {
    this.reset();
    const getToken:any = localStorage.getItem("sessionData");
    let tokenValue = JSON.parse(getToken);
    let token = tokenValue.token;
    const headers = { Authorization: "Token " + token };
    return this.http.get<any>(
      this.apiUrl + "taskserv/team?page=" + pageno + "&query=" + appkeyvalue,
      { headers: headers }
    );
  }
  getBacklogSummary(obj: any,pageno: string): Observable<any> {
    this.reset();
    const getToken:any = localStorage.getItem("sessionData");
    let tokenValue = JSON.parse(getToken);
    let token = tokenValue.token;
    const headers = { Authorization: "Token " + token };
    return this.http.post<any>(this.apiUrl + "taskserv/backlog?page="+pageno,obj, {
      headers: headers,
    });
  }
  getIssueSummary(obj: any,page: string): Observable<any> {
    this.reset();
    const getToken:any = localStorage.getItem("sessionData");
    let tokenValue = JSON.parse(getToken);
    let token = tokenValue.token;
    const headers = { Authorization: "Token " + token };
    return this.http.post<any>(this.apiUrl + "taskserv/issues?action=issue_summary&page=" + page,obj, {
      headers: headers,
    });
  }
  getPipelineSummary(page: string, action: { pipeline_status: string; client: string; module_id: string; }): Observable<any> {
    this.reset();
    const getToken:any = localStorage.getItem("sessionData");
    let tokenValue = JSON.parse(getToken);
    let token = tokenValue.token;
    let actions = "action";
    const headers = { Authorization: "Token " + token };
    return this.http.post<any>(
      this.apiUrl +
        "taskserv/common_task_summary?page=" +
        page +
        "&action=verified_task_summary&pipeline_status="+action.pipeline_status+"&client="+action.client+"&module_id="+action.module_id,action,
      { headers: headers }
    );
  }
  public issueCreation(formdata: FormData): Observable<any> {
    this.reset();
    const getToken: any = localStorage.getItem("sessionData");
    let tokenValue = JSON.parse(getToken);
    let token = tokenValue.token;
    // let json = Object.assign({}, data);
    // let formData = new FormData();
    // formData.append("data", JSON.stringify(json));
    // formData.append("file", file);
    const headers = { Authorization: "Token " + token };
    return this.http.post<any>(this.apiUrl + "taskserv/issues", formdata, {
      headers: headers,
    });
  }
  getSprintFetch(id: string): Observable<any> {
    this.reset();
    const getToken:any = localStorage.getItem("sessionData");
    let tokenValue = JSON.parse(getToken);
    let token = tokenValue.token;
    const headers = { Authorization: "Token " + token };
    return this.http.get<any>(
      this.apiUrl + "taskserv/sprint?action=fetch&sprint_id=" + id,
      { headers: headers }
    );
  }
  public IssuetoTask(data: any): Observable<any> {
    this.reset();
    const getToken: any = localStorage.getItem("sessionData");
    let tokenValue = JSON.parse(getToken);
    let token = tokenValue.token;
    const headers = { Authorization: "Token " + token };
    return this.http.post<any>(this.apiUrl + "taskserv/issue_task", data, {
      headers: headers,
    });
  }
  public getStatus(): Observable<any> {
    this.reset();
    const getToken: any = localStorage.getItem("sessionData");
    let tokenValue = JSON.parse(getToken);
    let token = tokenValue.token;
    const headers = { Authorization: "Token " + token };
    return this.http.get<any>(
      this.apiUrl + "taskserv/task_dropdown?action=pipeline",
      { headers: headers }
    );
  }
  public reassignTask(data: any): Observable<any> {
    this.reset();
    const getToken: any = localStorage.getItem("sessionData");
    let tokenValue = JSON.parse(getToken);
    let token = tokenValue.token;
    const headers = { Authorization: "Token " + token };
    // return this.http.get<any>(this.apiUrl + 'taskserv/assign_task', { 'headers': headers })
    return this.http.post<any>(this.apiUrl + "taskserv/assign_task", data, {
      headers: headers,
    });
  }
  getIssueFetch(id: string): Observable<any> {
    this.reset();
    const getToken:any = localStorage.getItem("sessionData");
    let tokenValue = JSON.parse(getToken);
    let token = tokenValue.token;
    const headers = { Authorization: "Token " + token };
    return this.http.get<any>(this.apiUrl + "taskserv/issues/" + id, {
      headers: headers,
    });
  }
 
    getClientData(): Observable<any> {
      this.reset();
      const getToken:any = localStorage.getItem("sessionData")
      let tokenValue = JSON.parse(getToken);
      let token = tokenValue.token
      const headers = { 'Authorization': 'Token ' + token }
      return this.http.get<any>(this.apiUrl +'taskserv/trans_client_search', { 'headers': headers })
    }
    getModuleData(): Observable<any> {
      this.reset();
      const getToken:any = localStorage.getItem("sessionData")
      let tokenValue = JSON.parse(getToken);
      let token = tokenValue.token
      const headers = { 'Authorization': 'Token ' + token }
      return this.http.get<any>(this.apiUrl +'taskserv/trans_module_search', { 'headers': headers })
    }
    issueSearch(data: any, page: string): Observable<any> {
      this.reset();
      const getToken:any = localStorage.getItem("sessionData")
      let tokenValue = JSON.parse(getToken);
      let token = tokenValue.token
      const headers = { 'Authorization': 'Token ' + token }
      return this.http.post<any>(this.apiUrl +'taskserv/issues?page=' + page ,data, { 'headers': headers })
    }
    public issuetoTask(data: any): Observable<any> {
      this.reset();
      const getToken: any = localStorage.getItem('sessionData')
      let tokenValue = JSON.parse(getToken);
      let token = tokenValue.token
      const headers = { 'Authorization': 'Token ' + token }
      // return this.http.get<any>(this.apiUrl + 'taskserv/assign_task', { 'headers': headers })
      return this.http.post<any>(this.apiUrl + 'taskserv/issue_status',data,{ 'headers': headers })
    }

    public pipelineCreation(data: any): Observable<any> {
      this.reset();
      const getToken: any = localStorage.getItem('sessionData')
      let tokenValue = JSON.parse(getToken);
      let token = tokenValue.token  
      const headers = { 'Authorization': 'Token ' + token }
      return this.http.post<any>(this.apiUrl + 'taskserv/pipeline',data,{ 'headers': headers })
    }
    sprintSearch(data: string, page: string): Observable<any> {
      this.reset();
      const getToken:any = localStorage.getItem("sessionData")
      let tokenValue = JSON.parse(getToken);
      let token = tokenValue.token
      const headers = { 'Authorization': 'Token ' + token }
      return this.http.get<any>(this.apiUrl +'taskserv/sprint?page=' + page + data, { 'headers': headers })
    }

    public getTeams(): Observable<any> {
      this.reset();
      const getToken: any = localStorage.getItem('sessionData')
      let tokenValue = JSON.parse(getToken);
      let token = tokenValue.token
      const headers = { 'Authorization': 'Token ' + token }
      return this.http.get<any>(this.apiUrl + 'taskserv/team', { 'headers': headers })
    }

    public getSprints(data: string): Observable<any> {
      this.reset();
      const getToken: any = localStorage.getItem('sessionData')
      let tokenValue = JSON.parse(getToken);
      let token = tokenValue.token
      const headers = { 'Authorization': 'Token ' + token }
      return this.http.get<any>(this.apiUrl + 'taskserv/sprint?query='+data, { 'headers': headers })
    }

    public assignTask(data: any): Observable<any> {
      this.reset();
      const getToken: any = localStorage.getItem('sessionData')
      let tokenValue = JSON.parse(getToken);
      let token = tokenValue.token
      const headers = { 'Authorization': 'Token ' + token }
      // return this.http.get<any>(this.apiUrl + 'taskserv/assign_task', { 'headers': headers })
      return this.http.post<any>(this.apiUrl + 'taskserv/assign_task',data,{ 'headers': headers })
    }
    getStorySummary(obj: { query: string; team: string; sprint: string; },pageno: string): Observable<any> {
      this.reset();
      const getToken:any = localStorage.getItem("sessionData")
      let tokenValue = JSON.parse(getToken);
      let token = tokenValue.token
      const headers = { 'Authorization': 'Token ' + token }
      return this.http.get<any>(this.apiUrl +'taskserv/stories?page=' + pageno  +  '&query='+ obj.query +'&team_id='+obj.team +'&sprint_id='+obj.sprint, { 'headers': headers })
    }
    getdesignationStatus(pageno: number): Observable<any>{
      this.reset();
      const getToken:any = localStorage.getItem("sessionData")
      let tokenValue = JSON.parse(getToken);
      let token = tokenValue.token
      const headers = { 'Authorization': 'Token ' + token }
      return this.http.get<any>(this.apiUrl +'taskserv/designation_wise_status?page='+pageno, { 'headers': headers })
    }
  public downloadIssueData(file: string): Observable<any> {
    this.reset();
    const getToken:any = localStorage.getItem("sessionData");
    let tokenValue = JSON.parse(getToken);
    let token = tokenValue.token;
    const headers = { Authorization: "Token " + token };
    return this.http.get<any>(
      this.apiUrl + "taskserv/taskdocdownload/" + file,
      { headers: headers, responseType: "blob" as "json" }
    );
  }


  // timesheet summary date API
  gettimeSheetsummary(formattedDate: any): Observable<any> {
    this.reset();
    const getToken:any = localStorage.getItem("sessionData");
    let tokenValue = JSON.parse(getToken);
    let token = tokenValue.token;
    const headers = { Authorization: "Token " + token };
    return this.http.get<any>(
      this.apiUrl + "taskserv/timesheet?action=log&log_date=" + formattedDate,
      {
        headers: headers,
      }
    );
  }
  // logtype  Others and Activity API
  getLogType(): Observable<any> {
    this.reset();
    const getToken:any = localStorage.getItem("sessionData");
    let tokenValue = JSON.parse(getToken);
    let token = tokenValue.token;
    const headers = { Authorization: "Token " + token };
    return this.http.get<any>(
      this.apiUrl + "taskserv/task_dropdown?action=timesheet",
      {
        headers: headers,
      }
    );
  }

  getLogType2(parameter: any): Observable<any> {
    this.reset();
    const getToken:any = localStorage.getItem("sessionData");
    let tokenValue = JSON.parse(getToken);
    let token = tokenValue.token;
    const headers = { Authorization: "Token " + token };
    return this.http.get<any>(
      this.apiUrl +
        "taskserv/work_activity?client_id=&module_id=&query=&action=" +
        parameter,
      {
        headers: headers,
      }
    );
  }

  //  client API
  getActionClient(value: any): Observable<any> {
    this.reset();
    const getToken:any = localStorage.getItem("sessionData");
    let tokenValue = JSON.parse(getToken);
    let token = tokenValue.token;
    const headers = { Authorization: "Token " + token };
    return this.http.get<any>(
      this.apiUrl + "taskserv/trans_client_search?query=" + value,
      {
        headers: headers,
      }
    );
  }
  public getcltFilter(appkeyvalue: string, pageno: number): Observable<any> {
    this.reset();
    const getToken:any = localStorage.getItem("sessionData");
    let tokenValue = JSON.parse(getToken);
    let token = tokenValue.token;
    const headers = { Authorization: "Token " + token };
    return this.http.get<any>(
      CMS_Url +
        "taskserv/trans_client_search?query=" +
        appkeyvalue +
        "&page=" +
        pageno,
      { headers: headers }
    );
  }
  // Application API
  getActionApplication(): Observable<any> {
    this.reset();
    const getToken:any = localStorage.getItem("sessionData");
    let tokenValue = JSON.parse(getToken);
    let token = tokenValue.token;
    const headers = { Authorization: "Token " + token };
    return this.http.get<any>(
      this.apiUrl + "/taskserv/trans_project_search/1",
      {
        headers: headers,
      }
    );
  }
  getClienttoApplication(): Observable<any> {
    this.reset();
    const getToken:any = localStorage.getItem("sessionData");
    let tokenValue = JSON.parse(getToken);
    let token = tokenValue.token;
    const headers = { Authorization: "Token " + token };
    return this.http.get<any>(
      this.apiUrl + "taskserv/work_activity?client_id=&module_id=&query=",
      {
        headers: headers,
      }
    );
  }

  // client
  public getClientFilter(appkeyvalue: string, pageno: number): Observable<any> {
    this.reset();
    const getToken:any = localStorage.getItem("sessionData");
    let tokenValue = JSON.parse(getToken);
    let token = tokenValue.token;
    const headers = { Authorization: "Token " + token };
    return this.http.get<any>(
      CMS_Url +
        "taskserv/trans_client_search?query=" +
        appkeyvalue +
        "&page=" +
        pageno,
      { headers: headers }
    );
  }

  // app name
  public getAppFilter(client_Id: string, appkeyvalue: string, pageno: number): Observable<any> {
    this.reset();
    const getToken:any = localStorage.getItem("sessionData");
    let tokenValue = JSON.parse(getToken);
    let token = tokenValue.token;
    const headers = { Authorization: "Token " + token };
    return this.http.get<any>(
      CMS_Url +
        "taskserv/trans_project_search/" +
        client_Id +
        "?query=" +
        appkeyvalue +
        "&page=" +
        pageno,
      { headers: headers }
    );
  }

  // activity 3rd dropdown
  getActionActivity(
    client_Id: string,
    module_id: number,
    appkeyvalue: any,
    pageno: number
  ): Observable<any> {
    this.reset();
    const getToken:any = localStorage.getItem("sessionData");
    let tokenValue = JSON.parse(getToken);
    let token = tokenValue.token;
    const headers = { Authorization: "Token " + token };
    return this.http.get<any>(
      CMS_Url +
        "taskserv/work_activity?page=1&action=dropdown" +
        "&client_id=" +
        client_Id +
        "&app_id=" +
        module_id +
        "&query=" +
        "&page=" +
        pageno,
      { headers: headers }
    );
  }
  public addComment(data: any, id: string): Observable<any> {
    this.reset();
    const getToken: any = localStorage.getItem('sessionData')
    let tokenValue = JSON.parse(getToken);
    let token = tokenValue.token
    // let formData = new FormData();

    // formData.append("data", JSON.stringify(data));
    const headers = { 'Authorization': 'Token ' + token }
    // return this.http.get<any>(this.apiUrl + 'taskserv/assign_task', { 'headers': headers })
    return this.http.post<any>(this.apiUrl + 'taskserv/comment?ref_type=2&ref_id='+id,data,{ 'headers': headers })
  }
  getCommentHistory(id: string): Observable<any> {
    this.reset();
    const getToken:any = localStorage.getItem("sessionData")
    let tokenValue = JSON.parse(getToken);
    let token = tokenValue.token
    const headers = { 'Authorization': 'Token ' + token }
    return this.http.get<any>(this.apiUrl +'taskserv/comment?ref_type=2&ref_id='+id, { 'headers': headers })
  }
  deleteComment(id: string): Observable<any> {
    this.reset();
    const getToken:any = localStorage.getItem("sessionData")
    let tokenValue = JSON.parse(getToken);
    let token = tokenValue.token
    const headers = { 'Authorization': 'Token ' + token }
    return this.http.get<any>(this.apiUrl +'taskserv/comment?action=delete&comment_id='+id, { 'headers': headers })
  }
  public addCommentTask(formData: any, id: string): Observable<any> {
    this.reset();
    const getToken: any = localStorage.getItem('sessionData')
    let tokenValue = JSON.parse(getToken);
    let token = tokenValue.token
    const headers = { 'Authorization': 'Token ' + token }
    // let formData = new FormData();

    // formData.append("data", JSON.stringify(data));
    // return this.http.get<any>(this.apiUrl + 'taskserv/assign_task', { 'headers': headers })
    return this.http.post<any>(this.apiUrl + 'taskserv/comment?ref_type=1&ref_id='+id,formData,{ 'headers': headers })
  }
  getCommentHistorys(id: string): Observable<any> {
    this.reset();
    const getToken:any = localStorage.getItem("sessionData")
    let tokenValue = JSON.parse(getToken);
    let token = tokenValue.token
    const headers = { 'Authorization': 'Token ' + token }
    return this.http.get<any>(this.apiUrl +'taskserv/comment?ref_type=1&ref_id='+id, { 'headers': headers })
  }

  public teamget(data: string): Observable<any> {
    this.reset();
    const getToken: any = localStorage.getItem('sessionData')
    let tokenValue = JSON.parse(getToken);
    let token = tokenValue.token
    const headers = { 'Authorization': 'Token ' + token }
    return this.http.get<any>(this.apiUrl + 'taskserv/team_summary?action=team_wise&query='+data, { 'headers': headers })
  }

  public sprintget(): Observable<any> {
    this.reset();
    const getToken: any = localStorage.getItem('sessionData')
    let tokenValue = JSON.parse(getToken);
    let token = tokenValue.token
    const headers = { 'Authorization': 'Token ' + token }
    return this.http.get<any>(this.apiUrl + 'taskserv/task_dropdown?action=sprint', { 'headers': headers })
  }
  public getApp(data: string): Observable<any> {
    this.reset();
    const getToken: any = localStorage.getItem('sessionData')
    let tokenValue = JSON.parse(getToken);
    let token = tokenValue.token
    const headers = { 'Authorization': 'Token ' + token }
    return this.http.get<any>(this.apiUrl + 'taskserv/mst_project_search/0?query='+data, { 'headers': headers })
  }
  public getClient(data: string): Observable<any> {
    this.reset();
    const getToken: any = localStorage.getItem('sessionData')
    let tokenValue = JSON.parse(getToken);
    let token = tokenValue.token
    const headers = { 'Authorization': 'Token ' + token }
    return this.http.get<any>(this.apiUrl + 'taskserv/trans_client_search?query='+data+'&status=2', { 'headers': headers })
  }
  public getmodule(data: string): Observable<any> {
    this.reset();
    const getToken: any = localStorage.getItem('sessionData')
    let tokenValue = JSON.parse(getToken);
    let token = tokenValue.token
    const headers = { 'Authorization': 'Token ' + token }
    return this.http.get<any>(this.apiUrl + 'taskserv/mst_module_search/0?query='+data, { 'headers': headers })
  }
  public getdeveloper(data: string): Observable<any> {
    this.reset();
    const getToken: any = localStorage.getItem('sessionData')
    let tokenValue = JSON.parse(getToken);
    let token = tokenValue.token
    const headers = { 'Authorization': 'Token ' + token }
    return this.http.get<any>(this.apiUrl + 'taskserv/emp_common_search?query='+data, { 'headers': headers })
  }
  public getteams(data: string): Observable<any> {
    this.reset();
    const getToken: any = localStorage.getItem('sessionData')
    let tokenValue = JSON.parse(getToken);
    let token = tokenValue.token
    const headers = { 'Authorization': 'Token ' + token }
    return this.http.get<any>(this.apiUrl + 'taskserv/search_team_lead?query='+data, { 'headers': headers })
  }
  public gesta(data: string): Observable<any> {
    this.reset();
    const getToken: any = localStorage.getItem('sessionData')
    let tokenValue = JSON.parse(getToken);
    let token = tokenValue.token
    const headers = { 'Authorization': 'Token ' + token }
    return this.http.get<any>(this.apiUrl + 'taskserv/task_dropdown?action=issue_update&query='+data, { 'headers': headers })
  }
  public getpriority(): Observable<any> {
    this.reset();
    const getToken: any = localStorage.getItem('sessionData')
    let tokenValue = JSON.parse(getToken);
    let token = tokenValue.token
    const headers = { 'Authorization': 'Token ' + token }
    return this.http.get<any>(this.apiUrl + 'taskserv/task_dropdown?action=priority', { 'headers': headers })
  }
  public getissues(): Observable<any> {
    this.reset();
    const getToken: any = localStorage.getItem('sessionData')
    let tokenValue = JSON.parse(getToken);
    let token = tokenValue.token
    const headers = { 'Authorization': 'Token ' + token }
    return this.http.get<any>(this.apiUrl + 'taskserv/task_dropdown?action=issue', { 'headers': headers })
  }
  public getpipe(): Observable<any> {
    this.reset();
    const getToken: any = localStorage.getItem('sessionData')
    let tokenValue = JSON.parse(getToken);
    let token = tokenValue.token
    const headers = { 'Authorization': 'Token ' + token }
    return this.http.get<any>(this.apiUrl + 'taskserv/task_dropdown?action=pipeline', { 'headers': headers })
  }
  public statusget(): Observable<any> {
    this.reset();
    const getToken: any = localStorage.getItem('sessionData')
    let tokenValue = JSON.parse(getToken);
    let token = tokenValue.token
    const headers = { 'Authorization': 'Token ' + token }
    return this.http.get<any>(this.apiUrl + 'taskserv/task_dropdown?action=task_status_for_pipeline', { 'headers': headers })
  }
  public task_employeesearch_createproj(data: any, page: string | number, projid: string): Observable<any> {
    this.reset();
    const getToken: any = localStorage.getItem("sessionData");
    let tokenValue = JSON.parse(getToken);
    let token = tokenValue.token;
    const headers = { Authorization: "Token " + token };
    return this.http.get<any>(
      this.apiUrl + "taskserv/project_employee_summary?action=project&query=" + data + "&page=" + page + "&project_id=" + projid,
      { headers: headers }
    );
  }
  public task_employeesearch_createprojDropdown(data: any, page: string, projid: string): Observable<any> {
    this.reset();
    const getToken: any = localStorage.getItem("sessionData");
    let tokenValue = JSON.parse(getToken);
    let token = tokenValue.token;
    const headers = { Authorization: "Token " + token };
    return this.http.get<any>(
      this.apiUrl + "taskserv/project_employee_summary?action=project&query=" + data + "&page=" + page + "&project_id=" + projid,
      { headers: headers }
    );
  }
  getMeetingLog(id: any,pageno: string): Observable<any> {
    this.reset();
    const getToken:any = localStorage.getItem("sessionData")
    let tokenValue = JSON.parse(getToken);
    let token = tokenValue.token
    const headers = { 'Authorization': 'Token ' + token }
    return this.http.get<any>(this.apiUrl +'taskserv/meeting_log/' + id + '?page=' +pageno, { 'headers': headers })
  }
11:22
public getmeetingSummary(page: string): Observable<any> {
      this.reset();
      const getToken: any = localStorage.getItem('sessionData')
      let tokenValue = JSON.parse(getToken);
      let token = tokenValue.token
      const headers = { 'Authorization': 'Token ' + token }
      return this.http.get<any>(this.apiUrl + 'taskserv/meeting_log?page='+page, { 'headers': headers })
    }
    public getmeetingView(id: string): Observable<any> {
      this.reset();
      const getToken: any = localStorage.getItem('sessionData')
      let tokenValue = JSON.parse(getToken);
      let token = tokenValue.token
      const headers = { 'Authorization': 'Token ' + token }
      return this.http.get<any>(this.apiUrl + 'taskserv/meeting_log?action=fetch&meeting_id='+id, { 'headers': headers })
    }
    public searchmeetcategory(value: string): Observable<any> {
      this.reset();
      const getToken:any = localStorage.getItem("sessionData")
      let tokenValue = JSON.parse(getToken);
      let token = tokenValue.token
      const headers = { 'Authorization': 'Token ' + token}
      return this.http.get<any>(this.apiUrl + 'taskserv/meeting_log?page=1' + value,{ 'headers': headers })
    }
    public get_emp(empkeyvalue: string,page: number): Observable<any> {
      this.reset();
      const getToken:any = localStorage.getItem("sessionData")
      let tokenValue = JSON.parse(getToken);
      let token = tokenValue.token
      const headers = { 'Authorization': 'Token ' + token}
      return this.http.get<any>(this.apiUrl + 'taskserv/emp_common_search?query=' + empkeyvalue + '&page=' + page,{ 'headers': headers })
    }
    public getempSearch(empkeyvalue: string): Observable<any> {
      this.reset();
      const getToken:any = localStorage.getItem("sessionData")
      let tokenValue = JSON.parse(getToken);
      let token = tokenValue.token
      const headers = { 'Authorization': 'Token ' + token}
      return this.http.get<any>(this.apiUrl + 'taskserv/emp_common_search?designation=developer&query=' + empkeyvalue,{ 'headers': headers })
    }
    public get_client(): Observable<any> {
      this.reset();
      const getToken:any = localStorage.getItem("sessionData")
      let tokenValue = JSON.parse(getToken);
      let token = tokenValue.token
      const headers = { 'Authorization': 'Token ' + token}
      return this.http.get<any>(this.apiUrl + 'taskserv/task_dropdown?action=meeting',{ 'headers': headers })
    }
    public getclientSearch(clientkeyvalue: string,data: any): Observable<any> {
      this.reset();
      const getToken:any = localStorage.getItem("sessionData")
      let tokenValue = JSON.parse(getToken);
      let token = tokenValue.token
      const headers = { 'Authorization': 'Token ' + token}
      return this.http.get<any>(this.apiUrl + 'taskserv/trans_client_search?query= '+ data + clientkeyvalue,{ 'headers': headers })
    }


    gettimetempSummary(data: string) {
      this.reset();
      const getToken:any = localStorage.getItem("sessionData");
      let tokenValue = JSON.parse(getToken);
      let token = tokenValue.token;
      const headers = { Authorization: "Token " + token };
      return this.http.get<any>(
        this.apiUrl + "taskserv/tasktemplate?action=activity_template" + data,
        {
          headers: headers,
        }
      );
    }
    gettimetempSummaryDropdown(data: string) {
      this.reset();
      const getToken:any = localStorage.getItem("sessionData");
      let tokenValue = JSON.parse(getToken);
      let token = tokenValue.token;
      const headers = { Authorization: "Token " + token };
      return this.http.get<any>(
        this.apiUrl + "taskserv/tasktemplate?action=activity_template&name=" + data,
        {
          headers: headers,
        }
      );
    }
    public temptimeadd(list: any): Observable<any> {
      this.reset();
      const getToken: any = localStorage.getItem("sessionData");
      let tokenValue = JSON.parse(getToken);
      let token = tokenValue.token;
      const headers = { Authorization: "Token " + token };
      return this.http.post<any>(this.apiUrl + "taskserv/tasktemplate", list, {
        headers: headers,
      });
    }

    public addSprinttoStory(storyData: any): Observable<any> {
      this.reset();
      const getToken:any = localStorage.getItem("sessionData");
      let tokenValue = JSON.parse(getToken);
      let token = tokenValue.token;
      const headers = { Authorization: "Token " + token };
      return this.http.post<any>(this.apiUrl + "taskserv/stories?action=sprint_mapping", storyData, {
        headers: headers,
      });
    }
    getStoriesdd(search: any, pageno: number): Observable<any> {
      this.reset();
      const getToken:any = localStorage.getItem("sessionData");
      let tokenValue = JSON.parse(getToken);
      let token = tokenValue.token;
  
      const headers = new HttpHeaders({
        Authorization: "Token " + token,
      });
  
      // Make an HTTP GET request to a specific endpoint
      return this.http.get<any>(this.apiUrl + 'taskserv/stories?page=' +pageno + '&query='+search, { headers: headers });
    }

    public addStorytoTask(storyData: any): Observable<any> {
      this.reset();
      const getToken:any = localStorage.getItem("sessionData");
      let tokenValue = JSON.parse(getToken);
      let token = tokenValue.token;
      const headers = { Authorization: "Token " + token };
      return this.http.post<any>(this.apiUrl + "taskserv/common_task_creation?action=story_mapping ", storyData, {
        headers: headers,
      });
    }
    projectteamsubmit(json: any): Observable<any> {
      this.reset();
      const getToken:any = localStorage.getItem("sessionData");
      let tokenValue = JSON.parse(getToken);
      let token = tokenValue.token;
      const headers = { Authorization: "Token " + token };
      return this.http.post<any>(this.apiUrl + "taskserv/meeting_log",json ,{
        headers: headers,
      });
    }
    popupmeetsubmit(json: any): Observable<any> {
      this.reset();
      const getToken:any = localStorage.getItem("sessionData");
      let tokenValue = JSON.parse(getToken);
      let token = tokenValue.token;
      const headers = { Authorization: "Token " + token };
      return this.http.post<any>(this.apiUrl + "taskserv/meeting_log?action=status",json ,{
        headers: headers,
      });
    }

    
    public teamgetTwo(data: string): Observable<any> {
      this.reset();
      const getToken: any = localStorage.getItem('sessionData')
      let tokenValue = JSON.parse(getToken);
      let token = tokenValue.token
      const headers = { 'Authorization': 'Token ' + token }
      return this.http.get<any>(this.apiUrl + 'taskserv/team_summary?action=team_wise&query='+data, { 'headers': headers })
    }
    public getdeveloperTwo(data: string): Observable<any> {
      this.reset();
      const getToken: any = localStorage.getItem('sessionData')
      let tokenValue = JSON.parse(getToken);
      let token = tokenValue.token
      const headers = { 'Authorization': 'Token ' + token }
      return this.http.get<any>(this.apiUrl + 'taskserv/emp_common_search?query='+data, { 'headers': headers })
    }

    getreportTask(data: {}, page: string){
      this.reset();
      const getToken: any = localStorage.getItem("sessionData");
      let tokenValue = JSON.parse(getToken);
      let token = tokenValue.token;
      const headers = { Authorization: "Token " + token };
      return this.http.post<any>(this.apiUrl + "taskserv/time_sheet_report?action=&page="+page,data,{
        headers: headers,
      });
    }

    getreportdownload(data: {}){
      this.reset();
      const getToken: any = localStorage.getItem("sessionData");
      let tokenValue = JSON.parse(getToken);
      let token = tokenValue.token;
      const headers = { Authorization: "Token " + token };
      return this.http.post<any>(this.apiUrl + "taskserv/time_sheet_report?action=excelreport",data ,{
        headers: headers,responseType: "blob" as "json"
      });
    }

    getganttchart(data: {}){
      this.reset();
      const getToken: any = localStorage.getItem("sessionData");
      let tokenValue = JSON.parse(getToken);
      let token = tokenValue.token;
      const headers = { Authorization: "Token " + token };
      return this.http.post<any>(this.apiUrl + "taskserv/gantt_chart?type=file",data ,{
        headers: headers,responseType: "blob" as "json"
      });
    }

    meetEditDropdown(json: any): Observable<any> {
      this.reset();
      const getToken:any = localStorage.getItem("sessionData");
      let tokenValue = JSON.parse(getToken);
      let token = tokenValue.token;
      const headers = { Authorization: "Token " + token };
      return this.http.post<any>(this.apiUrl + "taskserv/meeting_log?action=participants",json ,{
        headers: headers,
      });
    }


    releasecreate(json: any): Observable<any> {
      this.reset();
      const getToken:any = localStorage.getItem("sessionData");
      let tokenValue = JSON.parse(getToken);
      let token = tokenValue.token;
      const headers = { Authorization: "Token " + token };
      return this.http.post<any>(this.apiUrl + "taskserv/releaselog",json ,{
        headers: headers,
      });
    }
    getreleaseSummary(page: number, action: string): Observable<any> {
      this.reset();
      const getToken:any = localStorage.getItem("sessionData");
      let tokenValue = JSON.parse(getToken);
      let token = tokenValue.token;
      let actions = "action";
      const headers = { Authorization: "Token " + token };
      return this.http.get<any>(
        this.apiUrl +
          "taskserv/releaselog?page=" +
          page+action
          ,
        { headers: headers }
      );
    }
    particularreleaseSummary(page: string, action: any,id: string): Observable<any> {
      this.reset();
      const getToken:any = localStorage.getItem("sessionData");
      let tokenValue = JSON.parse(getToken);
      let token = tokenValue.token;
      let actions = "action";
      const headers = { Authorization: "Token " + token };
      return this.http.get<any>(
        this.apiUrl +
          "taskserv/releaselog/"+id+"?page=" +
          page 
          ,
        { headers: headers }
      );
    }
    removerelease(json: any,id: string): Observable<any> {
      this.reset();
      const getToken:any = localStorage.getItem("sessionData");
      let tokenValue = JSON.parse(getToken);
      let token = tokenValue.token;
      const headers = { Authorization: "Token " + token };
      return this.http.post<any>(this.apiUrl + "taskserv/releaselog/"+id,json ,{
        headers: headers,
      });
    }
    getdefaulttimetempSummary() {
      this.reset();
      const getToken:any = localStorage.getItem("sessionData");
      let tokenValue = JSON.parse(getToken);
      let token = tokenValue.token;
      const headers = { Authorization: "Token " + token };
      return this.http.get<any>(
        this.apiUrl + "taskserv/tasktemplate?action=default" ,
        {
          headers: headers,
        }
      );
    }
    getexceldownload(task_download: any){
      this.reset();
      const getToken: any = localStorage.getItem("sessionData");
      let tokenValue = JSON.parse(getToken);
      let token = tokenValue.token;
      const headers = { Authorization: "Token " + token };
      return this.http.post<any>(this.apiUrl + "taskserv/common_task_summary?action=task_download",task_download,{headers: headers,responseType: "blob" as "json"});
    }
    public getdevelopers(data: string, id: string): Observable<any> {
      this.reset();
      const getToken: any = localStorage.getItem('sessionData')
      let tokenValue = JSON.parse(getToken);
      let token = tokenValue.token
      const headers = { 'Authorization': 'Token ' + token }
      return this.http.get<any>(this.apiUrl + 'taskserv/emp_common_search?query='+data +'&role_id='+ id + '&action=role_wise', { 'headers': headers })
    }
  public getbrd(data: string): Observable<any> {
    this.reset();
    const getToken: any = localStorage.getItem('sessionData')
    let tokenValue = JSON.parse(getToken);
    let token = tokenValue.token
    const headers = { 'Authorization': 'Token ' + token }
    return this.http.get<any>(this.apiUrl + 'taskserv/brd'+data, { 'headers': headers })
  }
  public postbrd(data: any): Observable<any> {
    this.reset();
    const getToken: any = localStorage.getItem('sessionData')
    let tokenValue = JSON.parse(getToken);
    let token = tokenValue.token
    const headers = { 'Authorization': 'Token ' + token }
    return this.http.post<any>(this.apiUrl + 'taskserv/brd',data, { 'headers': headers })
  }
  releaspush(id: string,status_id: string): Observable<any> {
    this.reset();
    const getToken:any = localStorage.getItem("sessionData");
    let tokenValue = JSON.parse(getToken);
    let token = tokenValue.token;
    const headers = { Authorization: "Token " + token };
    return this.http.get<any>(this.apiUrl + "taskserv/releaselog/"+id+"?action=pipeline_update&release_status="+status_id ,{
      headers: headers,
    });
  }
  public getappNameFilter(client_Id: string | number,appkeyvalue: string, pageno: string | number): Observable<any> {
    this.reset();
    const getToken:any = localStorage.getItem("sessionData")
    let tokenValue = JSON.parse(getToken);
    let token = tokenValue.token
    const headers = { 'Authorization': 'Token ' + token }
    return this.http.get<any>(CMS_Url + 'taskserv/trans_project_search/'+client_Id+'?query=' + appkeyvalue + '&page=' + pageno, { 'headers': headers })
  }  
  public getmodulenameFilter(client_Id: string,project_Id: string,appkeyvalue: string, pageno: number): Observable<any> {
    this.reset();
    const getToken:any = localStorage.getItem("sessionData")
    let tokenValue = JSON.parse(getToken);
    let token = tokenValue.token
    const headers = { 'Authorization': 'Token ' + token }
    return this.http.get<any>(CMS_Url + 'taskserv/trans_module_search/' + project_Id +'?query=' + appkeyvalue + '&page=' + pageno + '&client_id=' + client_Id, { 'headers': headers })
  }
  public getprojectheadname(data:any,page: number): Observable<any> {
    this.reset();
    const getToken:any = localStorage.getItem('sessionData');
    let tokenValue = JSON.parse(getToken);
    let token = tokenValue.token;
    const headers = { 'Authorization': 'Token ' + token };
    return this.http.get<any>(CMS_Url + 'taskserv/search_team_lead?query='+data+'&page='+page, { 'headers': headers })
  }
  public getunitheadname(data:any,page: number): Observable<any> {
    this.reset();
    const getToken:any = localStorage.getItem('sessionData');
    let tokenValue = JSON.parse(getToken);
    let token = tokenValue.token;
    const headers = { 'Authorization': 'Token ' + token };
    return this.http.get<any>(CMS_Url + 'taskserv/search_unit_head?query='+data+'&page='+page, { 'headers': headers })
  }
  public gettaskname(data:any,page: number): Observable<any> {
    this.reset();
    const getToken:any = localStorage.getItem('sessionData');
    let tokenValue = JSON.parse(getToken);
    let token = tokenValue.token;
    const headers = { 'Authorization': 'Token ' + token };
    return this.http.get<any>(CMS_Url + 'taskserv/tasklist?query='+data+'&page='+page, { 'headers': headers })
  }
  clientreportdownload(data: any){
    this.reset();
    const getToken: any = localStorage.getItem("sessionData");
    let tokenValue = JSON.parse(getToken);
    let token = tokenValue.token;
    const headers = { Authorization: "Token " + token };
    return this.http.post<any>(this.apiUrl + "taskserv/story_task_report?action=client",data ,{
      headers: headers,responseType: "blob" as "json"
    });
  }
  public getsprint_data(): Observable<any> {
    this.reset();
    const getToken: any = localStorage.getItem('sessionData')
    let tokenValue = JSON.parse(getToken);
    let token = tokenValue.token
    const headers = { 'Authorization': 'Token ' + token }
    return this.http.get<any>(this.apiUrl + 'taskserv/sprint?page=1&query=&dd=0', { 'headers': headers })
  }
  public deletetask(id: string): Observable<any> {
    this.reset();
    const getToken:any = localStorage.getItem("sessionData")
    let tokenValue = JSON.parse(getToken);
    let token = tokenValue.token;
    const headers = { 'Authorization': 'Token ' + token };
    return this.http.get<any>(CMS_Url + 'taskserv/task/'+id+'?action=deactive', { 'headers': headers })
  } 
  public quickview(): Observable<any> {
    this.reset();
    const getToken:any = localStorage.getItem("sessionData")
    let tokenValue = JSON.parse(getToken);
    let token = tokenValue.token;
    const headers = { 'Authorization': 'Token ' + token };
    return this.http.get<any>(CMS_Url + 'taskserv/get_recent_project', { 'headers': headers })
  }
  public dependencyedit(value: string, pageno: string | number,mapping_id: string,taskcode: string): Observable<any> {
    this.reset();
    const getToken: any = localStorage.getItem("sessionData");
    let tokenValue = JSON.parse(getToken);
    let token = tokenValue.token;
    const headers = { Authorization: "Token " + token };
    return this.http.get<any>(
      this.apiUrl +
        "taskserv/task_dependency_dd?page=" +
        pageno +
        "&query=" +
        value+"&mapping_id="+mapping_id+'&task_id='+taskcode,
      { headers: headers }
    );
  }
  public deleteteammembers(memberid: string): Observable<any> {
    this.reset();
    const getToken:any = localStorage.getItem("sessionData")
    let tokenValue = JSON.parse(getToken);
    let token = tokenValue.token;
    const headers = { 'Authorization': 'Token ' + token };
    return this.http.get<any>(CMS_Url + 'taskserv/tasktemplate?action=delete&temp_id='+memberid, { 'headers': headers })
  } 
  pipelinehistory(id: string): Observable<any> {
    this.reset();
    const getToken:any = localStorage.getItem("sessionData");
    let tokenValue = JSON.parse(getToken);
    let token = tokenValue.token;
    const headers = { Authorization: "Token " + token };
    return this.http.get<any>(this.apiUrl + "taskserv/releaselog?release_id="+id+"&action=release_history" ,{
      headers: headers,
    });
  }
  public deletemeeting(id: string): Observable<any> {
    this.reset();
    const getToken: any = localStorage.getItem('sessionData')
    let tokenValue = JSON.parse(getToken);
    let token = tokenValue.token
    const headers = { 'Authorization': 'Token ' + token }
    return this.http.get<any>(this.apiUrl + 'taskserv/meeting_log?action=delete&meeting_id='+id, { 'headers': headers })
  }
  public setusdefault(id: string): Observable<any> {
    this.reset();
    const getToken: any = localStorage.getItem('sessionData')
    let tokenValue = JSON.parse(getToken);
    let token = tokenValue.token
    const headers = { 'Authorization': 'Token ' + token }
    return this.http.get<any>(this.apiUrl + 'taskserv/tasktemplate?action=default_change&temp_id='+id, { 'headers': headers })
  }
  public timesheetgetClientFilter(appkeyvalue: any, pageno: number): Observable<any> {
    this.reset();
    const getToken:any = localStorage.getItem("sessionData");
    let tokenValue = JSON.parse(getToken);
    let token = tokenValue.token;
    const headers = { Authorization: "Token " + token };
    return this.http.get<any>(
      CMS_Url +
        "taskserv/trans_client_search?query=" +appkeyvalue +"&page=" +pageno +"&action=activity",
      { headers: headers }
    );
  }
  public timesheetgetAppFilter(client_Id: string, appkeyvalue: any, pageno: number): Observable<any> {
    this.reset();
    const getToken:any = localStorage.getItem("sessionData");
    let tokenValue = JSON.parse(getToken);
    let token = tokenValue.token;
    const headers = { Authorization: "Token " + token };
    return this.http.get<any>(
      CMS_Url +
        "taskserv/trans_project_search/" +
        client_Id +
        "?query=" +
        appkeyvalue +
        "&page=" +
        pageno +"&action=activity",
      { headers: headers }
    );
  }

  deleteTimesheet(id: string): Observable<any> {
    this.reset();
    const getToken:any = localStorage.getItem("sessionData")
    let tokenValue = JSON.parse(getToken);
    let token = tokenValue.token
    const headers = { 'Authorization': 'Token ' + token }
    return this.http.delete<any>(this.apiUrl +'taskserv/time_sheet_delete/'+id, { 'headers': headers })
  }
  updateTimssheets(storyData: any): Observable<any> {
    this.reset();
    const getToken:any = localStorage.getItem("sessionData");
    let tokenValue = JSON.parse(getToken);
    let token = tokenValue.token;
    const headers = { Authorization: "Token " + token };
    return this.http.post<any>(this.apiUrl + "taskserv/timesheet?method=update", storyData, {
      headers: headers,
    });
  }
  deleteIssue(id: string): Observable<any> {
    this.reset();
    const getToken:any = localStorage.getItem("sessionData")
    let tokenValue = JSON.parse(getToken);
    let token = tokenValue.token
    const headers = { 'Authorization': 'Token ' + token }
    return this.http.get<any>(this.apiUrl +'taskserv/issues/'+id+'?action=delete', { 'headers': headers })
  }
  TaskExcelDowload():Observable<any>{
    this.reset();
    const getToken:any = localStorage.getItem("sessionData")
    let tokenValue = JSON.parse(getToken);
    let token = tokenValue.token
    const headers = { 'Authorization': 'Token ' + token }
    const emp_id=5939
    let action=1
    let json={}
    // taskserv/task_excel_template
  
    return this.http.post<any>(this.apiUrl + 'taskserv/task_excel_template', json, { 'headers': headers, responseType: 'blob' as 'json'  })
    // return this.http.get<any>(this.apiUrl + 'payrollserv/employee_level_detection?employee_id=' + emp_id + '&action=' + action, { 'headers': headers ,responseType: 'blob' as 'json'})
  }
  TaskExcelUpload(data: string | Blob):Observable<any>{
    this.reset();
    const getToken:any = localStorage.getItem("sessionData")
    let tokenValue = JSON.parse(getToken);
    let token = tokenValue.token
    const headers = { 'Authorization': 'Token ' + token }
    let formdata=new FormData()
    formdata.append('file',data)
    return this.http.post<any>(this.apiUrl +'taskserv/excel_task_create',formdata, { 'headers': headers })
  }
  // ReportDashboard(data):
  ReportDashboard(from_date: string,ToDate: string,teamId: string,ClientId: string,page: string | number,action: string,task_type: string,employeeId: string):Observable<any>{
    this.reset();
    const getToken:any = localStorage.getItem("sessionData")
    let tokenValue = JSON.parse(getToken);
    let token = tokenValue.token
    const headers = { 'Authorization': 'Token ' + token }
    return this.http.get<any>(this.apiUrl +'taskserv/task_report_info?from_date='+from_date+'&to_date='+ToDate+'&team_id='+teamId+'&client_id='+ClientId+'&page='+page+'&action='+action+'&task_type='+task_type+'&employee_id='+employeeId, { 'headers': headers })
  }

  getreportmonthly(data: string | String){
    this.reset();
    const getToken: any = localStorage.getItem("sessionData");
    let tokenValue = JSON.parse(getToken);
    let token = tokenValue.token;
    const headers = { Authorization: "Token " + token };
    return this.http.get<any>(this.apiUrl + "taskserv/non_timesheet_update?"+data ,{
      headers: headers,responseType: "blob" as "json"
    });
  }
  TaskSheetMonthReport(month: string | null,year: string | null,Team: string,Lead: string,EmployeeId: string):Observable<any>{
    this.reset();
    const getToken:any = localStorage.getItem("sessionData")
    let tokenValue = JSON.parse(getToken);
    let token = tokenValue.token
    const headers = { 'Authorization': 'Token ' + token }
    return this.http.get<any>(this.apiUrl +'taskserv/task_reports?month='+month+'&year='+year+'&team_id='+Team+'&lead_id='+Lead+'&employee_id='+EmployeeId+"&action=1", { 'headers': headers })
  }
}

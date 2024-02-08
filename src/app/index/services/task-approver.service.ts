import { Injectable } from "@angular/core";
import { LocalStorageService } from './local-storage.service';
import { HeaderService } from "./header.service";
import { ConfigurationService } from "./config.service";
import { HttpClient } from "@angular/common/http";
import { IBaseSingleResult } from "../interface/base-result";
import { Observable, of } from "rxjs";
import { Updateregisterrunningbyapprover, Updateregisterrunningbyreject } from "../interface/register-running-by-approver";
import { Updateorganizerbyapprover } from "../interface/organizer-appover";
@Injectable({
    providedIn: 'root'
})

export class TaskApproverService {
    token: any
    constructor(private configService: ConfigurationService, private http: HttpClient,
        private headerService: HeaderService, private localStorageService: LocalStorageService) {
        this.token = localStorageService.getToken()
    }

    getRegistereventbyapprover(): Observable<IBaseSingleResult<any> | undefined> {
        let baseApi = this.configService.settingConfig.baseApi
        let url = baseApi + 'api/task-approver-event/getregbyapprover'
        let option = this.headerService.BuildRequestHeaders(this.token)
        return this.http.get(url, { headers: option })
    }
    getOrganizerbyapprover(): Observable<IBaseSingleResult<any> | undefined> {
        let baseApi = this.configService.settingConfig.baseApi
        let url = baseApi + 'api/task-approver-organizer/getorganbyapprover'
        let option = this.headerService.BuildRequestHeaders(this.token)
        return this.http.get(url, { headers: option })
    }
    //REGISTER RUNNING EVENT
    updateRegistereventbyapprover(list: Updateregisterrunningbyapprover): Observable<IBaseSingleResult<any> | undefined> {
        let baseApi = this.configService.settingConfig.baseApi
        let url = baseApi + 'api/task-approver-event/updateregbyapprover'
        let option = this.headerService.BuildRequestHeaders(this.token)
        return this.http.post(url, list, { headers: option })
    }
    //ORGANIZER 
    updateOrganizerbyapprover(list : Updateorganizerbyapprover): Observable<IBaseSingleResult<any> | undefined> {
        let baseApi = this.configService.settingConfig.baseApi
        let url = baseApi + 'api/task-approver-organizer/updateorganbyapprover'
        let option = this.headerService.BuildRequestHeaders(this.token)
        return this.http.post(url, list, { headers: option })
    }
}
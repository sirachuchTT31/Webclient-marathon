import { Injectable } from "@angular/core";
import { LocalStorageService } from './local-storage.service';
import { HeaderService } from "./header.service";
import { ConfigurationService } from "./config.service";
import { HttpClient } from "@angular/common/http";
import { IBaseSingleResult } from "../interface/base-result";
import { Observable, of } from "rxjs";
import { Updateregisterrunningbyapprover } from "../interface/register-running-by-approver";
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
        let url = baseApi + 'api/task-approver/getregbyapprover'
        let option = this.headerService.BuildRequestHeaders(this.token)
        return this.http.get(url, { headers: option })
    }
    updateRegistereventbyapprover(list: Updateregisterrunningbyapprover): Observable<IBaseSingleResult<any> | undefined> {
        let baseApi = this.configService.settingConfig.baseApi
        let url = baseApi + 'api/task-approver/updateregbyapprover'
        let option = this.headerService.BuildRequestHeaders(this.token)
        return this.http.post(url, list, { headers: option })
    }
}
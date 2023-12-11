import { LocalStorageService } from './local-storage.service';
import { Injectable } from "@angular/core";
import { HeaderService } from "./header.service";
import { Observable, of } from "rxjs";
import { IBaseSingleResult } from "../interface/base-result";
import { ConfigurationService } from "./config.service";
import { HttpClient } from "@angular/common/http";
import { CreateAdmin, EditAdmin } from "../interface/admin";
import { CreateOrganizer, EditOrganizer } from '../interface/organizer';
@Injectable({
    providedIn: 'root'
})

export class RegisterrunningeventService {
    token: any
    constructor(private configService: ConfigurationService, private http: HttpClient,
        private headerService: HeaderService, private localStorageService: LocalStorageService) {
        this.token = localStorageService.getToken()
    }
    getallRegisterrunningevent(): Observable<IBaseSingleResult<any> | undefined> {
        let baseApi = this.configService.settingConfig.baseApi
        let url = baseApi + 'api/reg-event/getall'
        let option = this.headerService.BuildRequestHeadersNoAuthen()
        return this.http.get(url, { headers: option })
    }
}
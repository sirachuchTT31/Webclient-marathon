import { Injectable } from "@angular/core";
import { HeaderService } from "./header.service";
import { Observable, of } from "rxjs";
import { IBaseSingleResult } from "../interface/base-result";
import { ConfigurationService } from "./config.service";
import { HttpClient } from "@angular/common/http";
import { Login, Registermember, Registerorganizer } from "../interface/auth";
@Injectable({
    providedIn: "root",
})

export class AuthServices {
    constructor(private configService: ConfigurationService, private http: HttpClient,
        private headerService: HeaderService,) {

    }
    postRegisterMember(list: Registermember): Observable<IBaseSingleResult<any> | undefined> {
        let baseApi = this.configService.settingConfig.baseApi
        let url = baseApi + 'api/auth/register-member'
        let option = this.headerService.BuildRequestHeadersNoAuthen()
        return this.http.post(url, list, { headers: option })
    }
    postRegisterOrganizer(list: Registerorganizer): Observable<IBaseSingleResult<any> | undefined> {
        let baseApi = this.configService.settingConfig.baseApi
        let url = baseApi + 'api/auth/register-organizer'
        let option = this.headerService.BuildRequestHeadersNoAuthen()
        return this.http.post(url, list, { headers: option })
    }
    postLogin(list: Login): Observable<IBaseSingleResult<any> | undefined> {
        let baseApi = this.configService.settingConfig.baseApi
        let url = baseApi + 'api/singin'
        let option = this.headerService.BuildRequestHeadersNoAuthen()
        return this.http.post(url, list, { headers: option })
    }
}
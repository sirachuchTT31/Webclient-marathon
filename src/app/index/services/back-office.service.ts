import { Injectable } from "@angular/core";
import { ConfigurationService } from "./config.service";
import { HttpClient } from "@angular/common/http";
import { HeaderService } from "./header.service";
import { LocalStorageService } from "./local-storage.service";
import { Observable } from "rxjs";
import { IBaseCollectionResult } from "../interface/base-result";

@Injectable({
    providedIn: 'root'
})


export class BackOfficeService {
    token: any
    constructor(private configService: ConfigurationService, private http: HttpClient,
        private headerService: HeaderService, private localStorageService: LocalStorageService) {
        this.token = localStorageService.getToken()
    }

    getAllEventBackoffice(): Observable<IBaseCollectionResult<any> | undefined> {
        let baseApi = this.configService.settingConfig.baseApi
        let url = baseApi + 'api/get-event-backoffice'
        let option = this.headerService.BuildRequestHeaders(this.token)
        return this.http.get(url, { headers: option })
    }
}
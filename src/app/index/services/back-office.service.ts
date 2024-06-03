import { Injectable } from "@angular/core";
import { ConfigurationService } from "./config.service";
import { HttpClient } from "@angular/common/http";
import { HeaderService } from "./header.service";
import { LocalStorageService } from "./local-storage.service";
import { Observable } from "rxjs";
import { IBaseCollectionResult, IBaseCollectionWithPangingResult, IBaseSingleResult } from "../shared/interface/base-result";
import { createAdmin, deleteAdmin, updateAdmin, updateEvent } from "../shared/interface/back-office";
import { CreateAdmin } from "../shared/interface/admin";
import { basePagination } from "../shared/interface/pagination";

@Injectable({
    providedIn: 'root'
})


export class BackOfficeService {
    token: any
    constructor(private configService: ConfigurationService, private http: HttpClient,
        private headerService: HeaderService, private localStorageService: LocalStorageService) {
        this.token = localStorageService.getToken()
    }

    //FIXME: Admin
    getAllAdminBackffice(params: basePagination): Observable<IBaseCollectionWithPangingResult<any> | undefined> {
        let baseApi = this.configService.settingConfig.baseApi
        let url = baseApi + 'api/get-all-admin-backoffice?page=' + params.page + '&per_page=' + params.per_page
        let option = this.headerService.BuildRequestHeaders(this.token)
        return this.http.get(url, { headers: option })
    }

    postCreateAdminBackoffice(list: createAdmin): Observable<IBaseSingleResult<any> | undefined> {
        let baseApi = this.configService.settingConfig.baseApi
        let url = baseApi + 'api/create-admin-backoffice'
        let option = this.headerService.BuildRequestHeaders(this.token)
        return this.http.post(url, list, { headers: option })
    }

    postUpdateAdminBackoffice(list: updateAdmin): Observable<IBaseSingleResult<any> | undefined> {
        let baseApi = this.configService.settingConfig.baseApi
        let url = baseApi + 'api/update-admin-backoffice'
        let option = this.headerService.BuildRequestHeaders(this.token)
        return this.http.post(url, list, { headers: option })
    }

    postDeleteAdminBackoffice(list: deleteAdmin): Observable<IBaseSingleResult<any> | undefined> {
        let baseApi = this.configService.settingConfig.baseApi
        let url = baseApi + 'api/delete-admin-backoffice'
        let option = this.headerService.BuildRequestHeaders(this.token)
        return this.http.post(url, list, { headers: option })
    }

    //FIXME: Organizer
    getAllOrganizerBackoffice(): Observable<IBaseCollectionResult<any> | undefined> {
        let baseApi = this.configService.settingConfig.baseApi
        let url = baseApi + 'api/get-all-organizer-backoffice'
        let option = this.headerService.BuildRequestHeaders(this.token)
        return this.http.get(url, { headers: option })
    }

    //FIXME: Member 
    getAllMemberBackoffice(): Observable<IBaseCollectionResult<any> | undefined> {
        let baseApi = this.configService.settingConfig.baseApi
        let url = baseApi + 'api/get-all-member-backoffice'
        let option = this.headerService.BuildRequestHeaders(this.token)
        return this.http.get(url, { headers: option })
    }

    //FIXME: Event
    getAllEventBackoffice(): Observable<IBaseCollectionResult<any> | undefined> {
        let baseApi = this.configService.settingConfig.baseApi
        let url = baseApi + 'api/get-event-backoffice'
        let option = this.headerService.BuildRequestHeaders(this.token)
        return this.http.get(url, { headers: option })
    }

    updateEventBackoffice(list: updateEvent): Observable<IBaseCollectionResult<any> | undefined> {
        let baseApi = this.configService.settingConfig.baseApi;
        let url = baseApi + 'api/update-event-backoffice';
        let option = this.headerService.BuildRequestHeaders(this.token);
        return this.http.post(url, list, { headers: option })
    }
}
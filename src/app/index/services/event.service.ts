import { LocalStorageService } from './local-storage.service';
import { Injectable } from "@angular/core";
import { HeaderService } from "./header.service";
import { Observable, of } from "rxjs";
import { IBaseCollectionResult, IBaseCollectionWithPangingResult, IBaseSingleResult } from "../shared/interface/base-result";
import { ConfigurationService } from "./config.service";
import { HttpClient } from "@angular/common/http";
import { CreateAdmin, EditAdmin } from "../shared/interface/admin";
import { CreateOrganizer, EditOrganizer } from '../shared/interface/organizer';
import { CreateEvent, UpdateregisterrunningOrganizer, Updatestatusbeforerejectevent } from '../shared/interface/register-running-organizer';
import { createRegisterEvent } from '../shared/interface/event';
import { basePagination } from '../shared/interface/pagination';
@Injectable({
    providedIn: 'root'
})

export class EventService {
    token: any
    constructor(private configService: ConfigurationService, private http: HttpClient,
        private headerService: HeaderService, private localStorageService: LocalStorageService) {
        this.token = localStorageService.getToken()
    }
    postCreateEvent(list: CreateEvent): Observable<IBaseSingleResult<any> | undefined> {
        let baseApi = this.configService.settingConfig.baseApi
        let url = baseApi + 'api/create-event'
        let option = this.headerService.BuildRequestHeaders(this.token)
        return this.http.post(url, list, { headers: option })
    }
    postUploadFileEvent(file: any, _id: any): Observable<IBaseSingleResult<any> | undefined> {
        let baseApi = this.configService.settingConfig.baseApi
        let url = baseApi + 'api/upload-image-event'
        let formData = new FormData()
        for (let k = 0; k < file.length; k++) {
            formData.append('files', file[k])
        }
        formData.append('id', _id)
        let option = this.headerService.BuildRequestHeadersFormData(this.token)
        return this.http.post(url, formData, { headers: option })
    }
    getAllEvent(): Observable<IBaseCollectionResult<any> | undefined> {
        let baseApi = this.configService.settingConfig.baseApi
        let url = baseApi + 'api/get-all-event'
        let option = this.headerService.BuildRequestHeaders(this.token)
        return this.http.get(url, { headers: option })
    }
    //Member
    postCreateRegisterEvent(list: createRegisterEvent): Observable<IBaseSingleResult<any> | undefined> {
        let baseApi = this.configService.settingConfig.baseApi
        let url = baseApi + 'api/create-register-event'
        let option = this.headerService.BuildRequestHeaders(this.token)
        return this.http.post(url, list, { headers: option })
    }
    getAllHistory(params: basePagination): Observable<IBaseCollectionWithPangingResult<any> | undefined> {
        let baseApi = this.configService.settingConfig.baseApi
        let url = baseApi + 'api/get-all-history?page=' + params.page + '&per_page=' + params.per_page
        let option = this.headerService.BuildRequestHeaders(this.token)
        return this.http.get(url, { headers: option })
    }
    getRegisterrunningeventOrganizer(_id: any): Observable<IBaseSingleResult<any> | undefined> {
        let baseApi = this.configService.settingConfig.baseApi
        let url = baseApi + 'api/reg-event/get-reg-by-organizer/' + _id
        let option = this.headerService.BuildRequestHeaders(this.token)
        return this.http.get(url, { headers: option })
    }
    postUpdatestatusregevent(list: Updatestatusbeforerejectevent): Observable<IBaseSingleResult<any> | undefined> {
        let baseApi = this.configService.settingConfig.baseApi
        let url = baseApi + 'api/reg-event/update-status-event'
        let option = this.headerService.BuildRequestHeadersFormData(this.token)
        return this.http.post(url, list, { headers: option })
    }
    postUpdateregevent(list: UpdateregisterrunningOrganizer): Observable<IBaseSingleResult<any> | undefined> {
        let baseApi = this.configService.settingConfig.baseApi
        let url = baseApi + 'api/reg-event/update'
        let option = this.headerService.BuildRequestHeadersFormData(this.token)
        return this.http.post(url, list, { headers: option })
    }
}
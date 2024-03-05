import { LocalStorageService } from './local-storage.service';
import { Injectable } from "@angular/core";
import { HeaderService } from "./header.service";
import { Observable, of } from "rxjs";
import { IBaseSingleResult } from "../interface/base-result";
import { ConfigurationService } from "./config.service";
import { HttpClient } from "@angular/common/http";
import { CreateAdmin, EditAdmin } from "../interface/admin";
import { CreateOrganizer, EditOrganizer } from '../interface/organizer';
import { CreateregisterrunningOrganizer, UpdateregisterrunningOrganizer, Updatestatusbeforerejectevent } from '../interface/register-running-organizer';
@Injectable({
    providedIn: 'root'
})

export class RegisterrunningeventService {
    token: any
    constructor(private configService: ConfigurationService, private http: HttpClient,
        private headerService: HeaderService, private localStorageService: LocalStorageService) {
        this.token = localStorageService.getToken()
    }
    postCreateRegisterrunningeventOrganizer(list: CreateregisterrunningOrganizer): Observable<IBaseSingleResult<any> | undefined> {
        let baseApi = this.configService.settingConfig.baseApi
        let url = baseApi + 'api/reg-event/create'
        let option = this.headerService.BuildRequestHeaders(this.token)
        return this.http.post(url, list, { headers: option })
    }
    postUploadFileregisterrunningeventOrganize(file: any, _id: any): Observable<IBaseSingleResult<any> | undefined> {
        let baseApi = this.configService.settingConfig.baseApi
        let url = baseApi + 'api/reg-event/upload-image-reg-by-organizer'
        let formData = new FormData()
        for (let k = 0; k < file.length; k++) {
            formData.append('fileUpload', file[k])
        }
        formData.append('reg_event_id', _id)
        let option = this.headerService.BuildRequestHeadersFormData(this.token)
        return this.http.post(url, formData, { headers: option })
    }
    getallRegisterrunningevent(): Observable<IBaseSingleResult<any> | undefined> {
        let baseApi = this.configService.settingConfig.baseApi
        let url = baseApi + 'api/reg-event/getall'
        let option = this.headerService.BuildRequestHeadersNoAuthen()
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
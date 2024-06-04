import { Injectable } from "@angular/core";
import { ConfigurationService } from "./config.service";
import { HttpClient } from "@angular/common/http";
import { HeaderService } from "./header.service";
import { LocalStorageService } from "./local-storage.service";
import { Observable } from "rxjs";
import { IBaseCollectionResult, IBaseCollectionWithPangingResult, IBaseSingleResult } from "../shared/interface/base-result";
import { createAdmin, createMasterLocation, createMember, createOrganizer, deleteAdmin, deleteMasterLocation, deleteMember, updateAdmin, updateEvent, updateMasterLocation, updateMember } from "../shared/interface/back-office";
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
    getAllOrganizerBackoffice(params: basePagination): Observable<IBaseCollectionWithPangingResult<any> | undefined> {
        let baseApi = this.configService.settingConfig.baseApi
        let url = baseApi + 'api/get-all-organizer-backoffice?page=' + params.page + '&per_page=' + params.per_page
        let option = this.headerService.BuildRequestHeaders(this.token)
        return this.http.get(url, { headers: option })
    }

    postCreateOrganizerBackoffice(list: createOrganizer): Observable<IBaseSingleResult<any> | undefined> {
        let baseApi = this.configService.settingConfig.baseApi
        let url = baseApi + 'api/create-organizer-backoffice'
        let option = this.headerService.BuildRequestHeaders(this.token)
        return this.http.post(url, list, { headers: option })
    }

    postUpdateOrganizerBackoffice(list: updateAdmin): Observable<IBaseSingleResult<any> | undefined> {
        let baseApi = this.configService.settingConfig.baseApi
        let url = baseApi + 'api/update-organizer-backoffice'
        let option = this.headerService.BuildRequestHeaders(this.token)
        return this.http.post(url, list, { headers: option })
    }

    postDeleteOrganizerBackoffice(list: deleteAdmin): Observable<IBaseSingleResult<any> | undefined> {
        let baseApi = this.configService.settingConfig.baseApi
        let url = baseApi + 'api/delete-organizer-backoffice'
        let option = this.headerService.BuildRequestHeaders(this.token)
        return this.http.post(url, list, { headers: option })
    }

    //FIXME: Member 
    getAllMemberBackoffice(params: basePagination): Observable<IBaseCollectionWithPangingResult<any> | undefined> {
        let baseApi = this.configService.settingConfig.baseApi
        let url = baseApi + 'api/get-all-member-backoffice?page=' + params.page + '&per_page=' + params.per_page
        let option = this.headerService.BuildRequestHeaders(this.token)
        return this.http.get(url, { headers: option })
    }

    postCreateMemberBackoffice(list: createMember): Observable<IBaseSingleResult<any> | undefined> {
        let baseApi = this.configService.settingConfig.baseApi
        let url = baseApi + 'api/create-member-backoffice'
        let option = this.headerService.BuildRequestHeaders(this.token)
        return this.http.post(url, list, { headers: option })
    }

    postUpdateMemberBackoffice(list: updateMember): Observable<IBaseSingleResult<any> | undefined> {
        let baseApi = this.configService.settingConfig.baseApi
        let url = baseApi + 'api/update-member-backoffice'
        let option = this.headerService.BuildRequestHeaders(this.token)
        return this.http.post(url, list, { headers: option })
    }

    postDeleteMemberBackoffice(list: deleteMember): Observable<IBaseSingleResult<any> | undefined> {
        let baseApi = this.configService.settingConfig.baseApi
        let url = baseApi + 'api/delete-member-backoffice'
        let option = this.headerService.BuildRequestHeaders(this.token)
        return this.http.post(url, list, { headers: option })
    }

    //FIXME: Master Location 
    getAllMasterLocationBackoffice(params: basePagination): Observable<IBaseCollectionWithPangingResult<any> | undefined> {
        let baseApi = this.configService.settingConfig.baseApi
        let url = baseApi + 'api/get-all-master-location-backoffice?page=' + params.page + '&per_page=' + params.per_page
        let option = this.headerService.BuildRequestHeaders(this.token)
        return this.http.get(url, { headers: option })
    }

    postCreateMasterLocationBackoffice(list: createMasterLocation): Observable<IBaseSingleResult<any> | undefined> {
        let baseApi = this.configService.settingConfig.baseApi
        let url = baseApi + 'api/create-master-location-backoffice'
        let option = this.headerService.BuildRequestHeaders(this.token)
        return this.http.post(url, list, { headers: option })
    }

    postUpdateMasterLocationBackoffice(list: updateMasterLocation): Observable<IBaseSingleResult<any> | undefined> {
        let baseApi = this.configService.settingConfig.baseApi
        let url = baseApi + 'api/update-master-location-backoffice'
        let option = this.headerService.BuildRequestHeaders(this.token)
        return this.http.post(url, list, { headers: option })
    }

    postDeleteMasterLocationBackoffice(list: deleteMasterLocation): Observable<IBaseSingleResult<any> | undefined> {
        let baseApi = this.configService.settingConfig.baseApi
        let url = baseApi + 'api/delete-master-location-backoffice'
        let option = this.headerService.BuildRequestHeaders(this.token)
        return this.http.post(url, list, { headers: option })
    }

    //FIXME: Event
    getAllJobEventBackoffice(params: basePagination): Observable<IBaseCollectionWithPangingResult<any> | undefined> {
        let baseApi = this.configService.settingConfig.baseApi
        let url = baseApi + 'api/get-all-job-event-backoffice?page=' + params.page + '&per_page=' + params.per_page
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
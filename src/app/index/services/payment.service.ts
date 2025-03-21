import { LocalStorageService } from 'src/app/index/services/local-storage.service';
import { Injectable } from "@angular/core";
import { HeaderService } from "./header.service";
import { Observable, of } from "rxjs";
import { IBaseCollectionResult, IBaseCollectionWithPangingResult, IBaseSingleResult } from "../shared/interface/base-result";
import { ConfigurationService } from "./config.service";
import { HttpClient } from "@angular/common/http";
import { CreateAdmin } from "../shared/interface/admin";
import { IPaymentAllQuery } from '../shared/interface/payment';
import { ICreatepayment } from '../shared/interface/register-running-by-approver';
@Injectable({
    providedIn: 'root'
})

export class PaymentService {
    token: any
    constructor(private configService: ConfigurationService, private http: HttpClient,
        private headerService: HeaderService, private localStorageService: LocalStorageService) {
        this.token = this.localStorageService.getToken()
    }
    postUploadFilePayment(file: any, _id: any): Observable<IBaseSingleResult<any> | undefined> {
        let baseApi = this.configService.settingConfig.baseApi
        let url = baseApi + 'api/upload-image-payment'
        let formData = new FormData()
        for (let k = 0; k < file.length; k++) {
            formData.append('files', file[k])
        }
        formData.append('id', _id)
        let option = this.headerService.BuildRequestHeadersFormData(this.token)
        return this.http.post(url, formData, { headers: option })
    }
    postCreatePayment(list: ICreatepayment): Observable<IBaseSingleResult<any> | undefined> {
        let baseApi = this.configService.settingConfig.baseApi
        let url = baseApi + 'api/create-payment'
        let option = this.headerService.BuildRequestHeaders(this.token)
        return this.http.post(url, list, { headers: option })
    }
    getAllPayment(params: IPaymentAllQuery): Observable<IBaseCollectionWithPangingResult<any> | undefined> {
        let baseApi = this.configService.settingConfig.baseApi
        let url = baseApi + 'api/get-all-payment?page=' + params.page + '&per_page=' + params.per_page + '&event_id=' + params.event_id
        let option = this.headerService.BuildRequestHeaders(this.token)
        return this.http.get(url, { headers: option })
    }
}
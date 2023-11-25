import { HttpClient } from '@angular/common/http'
import { Injectable, Inject } from '@angular/core';
import { IClientConfiguration } from '../interface/config';
@Injectable({
    providedIn: 'root'
})
export class ConfigurationService {
    public settings! : IClientConfiguration
    get settingConfig() {
        return this.settings ={
            baseApi : 'http://localhost:5000/'
        }
    }
}
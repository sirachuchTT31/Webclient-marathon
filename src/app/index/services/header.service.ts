import { Injectable } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';
@Injectable({
    providedIn: 'root'
})
export class HeaderService {
    BuildRequestHeaders(token: any) {
        let httpHeader = null;
        httpHeader = new HttpHeaders({
            'Authorization': token,
            "Platform": 'web',
            'Accept-Language': "en-US",
            'Accept': 'application/json',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'POST, GET, PUT, PATCH, DELETE, OPTIONS',
            'Access-Control-Allow-Headers': 'Content-Type, Option, Authorization',
            "Cache-Control": "no-cache",
            "Pragma": "no-cache",
            "If-Modified-Since": "Mon, 26 Jul 1997 05:00:00 GMT",
            "Content-Type": "application/json",
        });
        return httpHeader
    }
    BuildRequestHeadersNoAuthen() {
        let httpHeader = null;
        httpHeader = new HttpHeaders({
            "Platform": 'web',
            'Accept-Language': "en-US",
            'Accept': 'application/json',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'POST, GET, PUT, PATCH, DELETE, OPTIONS',
            'Access-Control-Allow-Headers': 'Origin, Content-Type, X-Auth-Token',
            "Cache-Control": "no-cache",
            "Pragma": "no-cache",
            "If-Modified-Since": "Mon, 26 Jul 1997 05:00:00 GMT",
            "Content-Type": "application/json",
            //"lang":this.curent_lang
            // "browser":this.deviceInfo.browser,
            // "browser_version":this.deviceInfo.browser_version,
            // "device":this.deviceInfo.device,
            // "deviceType":this.deviceInfo.deviceType,
            // "orientation":this.deviceInfo.orientation,
            // "os":this.deviceInfo.os,
            // "os_version":this.deviceInfo.os_version,
            // "userAgent":this.deviceInfo.userAgent
        });

        return httpHeader;
    }
}
import { SweetAlertSessionExpired } from '../component/swal2/sweetalert-global';
import { AuthServices } from './auth.service';
import { LocalStorageService } from './local-storage.service';
import { Injectable } from "@angular/core";

@Injectable({
    providedIn: "root",
})

export class TimeoutTokenService {
    session: any
    constructor(
        private localStorageService: LocalStorageService,
        private authenService: AuthServices
    ) {

    }

    public setTokenExpires() {
        const token = this.localStorageService.getToken()
        if (token) {
            const date = new Date()
            const timeOutdefault = this.localStorageService.getTimeOutToken()
            const refreshToken = this.localStorageService.getRefreshToken()
            const expires = new Date(0);
            expires.setUTCSeconds(Number(timeOutdefault));
            let SecondsToken = Math.floor((expires.getTime() - date.getTime()) / 1000)
            setInterval(() => {
                SecondsToken--;
                if (SecondsToken <= 0) {
                    if (refreshToken) {
                        const payload = {
                            refreshToken: refreshToken
                        }
                        this.authenService.postRefreshToken(payload).subscribe((rs) => {
                            if (rs?.status === true) {
                                let response = rs.result
                                this.localStorageService.setProfile(
                                    {
                                        id: response.payload.id,
                                        username: response.payload.username,
                                        avatar: '',
                                        expired_token: response.payload.exp,
                                        first_name: response.payload.name,
                                        last_name: response.payload.lastname,
                                        refresh_token: response.refresh_token,
                                        role: response.payload.role,
                                        token: response.access_token
                                    });
                            }
                        })
                    }
                    else {
                        this.localStorageService.signOut();
                        SweetAlertSessionExpired('')
                        window.location.href = '';
                        clearInterval(SecondsToken);
                    }
                }
            }, 1000)
        }
    }

    public setSession() {
        const token = this.localStorageService.getToken()
        if (token) {
            // Fix 15 minutes
            let timeSession = (15 * 60);
            this.session = setInterval(() => {
                timeSession--
                if (timeSession <= 0) {
                    this.localStorageService.signOut()
                    SweetAlertSessionExpired('')
                    setTimeout(() => {
                        window.location.href = ''
                    },3000)
                    this.clearSession();
                }
            }, 1000)
        }
    }

    public clearSession() {
        clearInterval(this.session)
    }
}
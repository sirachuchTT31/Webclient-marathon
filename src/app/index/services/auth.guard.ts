import { Injectable } from "@angular/core";
import { LocalStorageService } from "./local-storage.service";
import { ActivatedRouteSnapshot, RouterStateSnapshot } from "@angular/router";
@Injectable({
    providedIn: "root",
})
export class AuthGuardService {
    constructor(private localStorageSerivce: LocalStorageService) {

    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
        let token = this.localStorageSerivce.getToken()
        if (token) {
            return true
        }
        else {
            window.location.href = '/auth/login'
            this.localStorageSerivce.signOut()
            return false
        }
    }
}
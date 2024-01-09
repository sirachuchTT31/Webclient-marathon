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
      
        let url = state.url
        let current = url.split('/')
        let newurl = current[1]
        let is_token = this.localStorageSerivce.getToken()
        let role = this.localStorageSerivce.getRole()
        console.log(newurl,'test')
        if (newurl !== 'admin') {
            if (is_token != null) {
                return true  
            }
            else {
                return false
            }
        }
        else {
            if (is_token != null && role === "admin") {
                return true
            }
            else {
                return false
            }
        }
    }
}
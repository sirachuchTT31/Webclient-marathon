import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
const TOKEN_KEY = "token";
const USER_KEY = "username";
const FIREST_NAME = "first-name";
const LAST_NAME = "last-name";
const IMAGE_PROFILE = "image-profile"
const TOKEN_EXPIRES_DATE = "token_expires_date"
const ROLE = "role"
@Injectable({
    providedIn: "root",
})
export class LocalStorageService {
    public saveToken(token: string) {
        localStorage.removeItem(TOKEN_KEY);
        localStorage.setItem(TOKEN_KEY, token);
    }
    public setProfile(fistName: string, lastName: string, username: any, role: any, token: any, time_out_token: any) {
        localStorage.removeItem(USER_KEY);
        localStorage.setItem(USER_KEY, username);
        localStorage.removeItem(TOKEN_KEY);
        localStorage.setItem(TOKEN_KEY, token);
        localStorage.removeItem(TOKEN_EXPIRES_DATE);
        localStorage.setItem(TOKEN_EXPIRES_DATE, time_out_token);
        localStorage.removeItem(FIREST_NAME);
        localStorage.setItem(FIREST_NAME, fistName);
        localStorage.removeItem(LAST_NAME);
        localStorage.setItem(LAST_NAME, lastName);
        localStorage.removeItem(ROLE);
        localStorage.setItem(ROLE, role);
    }
    public getToken(): string | null {
        return localStorage.getItem(TOKEN_KEY);
    }
    public getFirstname(): string | null {
        return localStorage.getItem(FIREST_NAME);
    }
    public getLastname(): string | null {
        return localStorage.getItem(LAST_NAME);
    }
    public getImageprofile(): string | null {
        return localStorage.getItem(IMAGE_PROFILE);
    }
    public getExpiresdate(): string | null {
        return localStorage.getItem(TOKEN_EXPIRES_DATE);
    }
    public getRole(): string | null {
        return localStorage.getItem(ROLE);
    }
}
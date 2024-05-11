import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Profile } from "../interface/local-storage";
const TOKEN_KEY = "token";
const USER_KEY = "username";
const FIREST_NAME = "first-name";
const LAST_NAME = "last-name";
const IMAGE_PROFILE = "image-profile"
const TOKEN_EXPIRES_DATE = "token_expires_date"
const REFRESH_TOKEN = "refresh_token"
const ROLE = "role"
const AUTH_ID = "auth-id"
@Injectable({
    providedIn: "root",
})
export class LocalStorageService {
    public saveToken(token: string) {
        localStorage.removeItem(TOKEN_KEY);
        localStorage.setItem(TOKEN_KEY, token);
    }
    public setProfile(data: Profile) {
        localStorage.removeItem(USER_KEY);
        localStorage.setItem(USER_KEY, data.username);
        localStorage.removeItem(REFRESH_TOKEN);
        localStorage.setItem(REFRESH_TOKEN, data.refresh_token)
        localStorage.removeItem(TOKEN_KEY);
        localStorage.setItem(TOKEN_KEY, data.token);
        localStorage.removeItem(TOKEN_EXPIRES_DATE);
        localStorage.setItem(TOKEN_EXPIRES_DATE, data.expired_token);
        localStorage.removeItem(FIREST_NAME);
        localStorage.setItem(FIREST_NAME, data.first_name);
        localStorage.removeItem(LAST_NAME);
        localStorage.setItem(LAST_NAME, data.last_name);
        localStorage.removeItem(ROLE);
        localStorage.setItem(ROLE, data.role);
        localStorage.removeItem(IMAGE_PROFILE);
        localStorage.setItem(IMAGE_PROFILE, data?.avatar);
        localStorage.removeItem(AUTH_ID)
        localStorage.setItem(AUTH_ID, data.id);
    }
    public signOut() {
        localStorage.removeItem(USER_KEY);
        localStorage.removeItem(TOKEN_KEY);
        localStorage.removeItem(TOKEN_EXPIRES_DATE);
        localStorage.removeItem(FIREST_NAME);
        localStorage.removeItem(LAST_NAME);
        localStorage.removeItem(ROLE);
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
    public getAvatar(): string | null {
        return localStorage.getItem(IMAGE_PROFILE)
    }
    public getId(): string | null {
        return localStorage.getItem(AUTH_ID)
    }
    public getTimeOutToken(): string | null {
        return localStorage.getItem(TOKEN_EXPIRES_DATE)
    }
    public getRefreshToken(): string | null {
        return localStorage.getItem(REFRESH_TOKEN)
    }
}
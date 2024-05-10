import { Injectable } from "@angular/core";
import { ConfigurationService } from "./config.service";
import * as crypto from "crypto-js";

@Injectable({
    providedIn: "root",
})

export class CryptlibService {
    constructor(
        private ConfigurationService: ConfigurationService
    ) { }
    private secretKey = this.ConfigurationService.settingConfig.secret_key

    encryptText(text: string) {
        const cipherText = crypto.AES.encrypt(text, this.secretKey).toString()
        return cipherText ? cipherText : ''
    }

    decryptCipher(cipher: string) {
        const bytes = crypto.AES.decrypt(cipher, this.secretKey);
        const originalText = bytes.toString(crypto.enc.Utf8);
        console.log('originalText', originalText)
        return originalText ? originalText : ''
    }
}
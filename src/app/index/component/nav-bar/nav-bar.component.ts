import { Component, ElementRef, ViewChild } from '@angular/core';
import { LocalStorageService } from '../../services/local-storage.service';
import { CryptlibService } from '../../services/crypt-lib.service';
// import image from '../../shared/img'
@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent {
  token: any
  name: any
  avatar: any
  role: any
  isCollapsed: boolean = true
  constructor(
    private localstorageService: LocalStorageService,
    private cryptLibService: CryptlibService
  ) {

  }

  ngOnInit(): void {
    this.token = this.localstorageService.getToken()
    this.name = this.localstorageService.getFirstname()
    this.avatar = this.localstorageService.getAvatar()
    let storageRole = this.localstorageService.getRole()
    this.role = this.cryptLibService.decryptCipher(storageRole ? storageRole : '')
  }
  public routeLogin() {
    window.location.href = 'auth/login'
  }
  signOut() {
    this.localstorageService.signOut()
    window.location.href = '/'
  }
  routerIndex(){
    window.location.href = 'user'
  }
  routeSettingprofile() {
    window.location.href = 'user/setting-profile'
  }
  routeUserhistory() {
    window.location.href = 'user/history'
  }
  routeOrganizerDashboard() {
    window.location.href = 'user/organizer-dashboard'
  }
}

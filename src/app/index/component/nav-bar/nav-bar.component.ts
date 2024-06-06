import { Subscription } from 'rxjs';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { LocalStorageService } from '../../services/local-storage.service';
import { CryptlibService } from '../../services/crypt-lib.service';
import { AuthServices } from '../../services/auth.service';
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
  authenLogId: any
  isCollapsed: boolean = true
  subscription !: Subscription
  constructor(
    private localstorageService: LocalStorageService,
    private authenticationService: AuthServices,
    private cryptLibService: CryptlibService
  ) {

  }

  ngOnInit(): void {
    this.token = this.localstorageService.getToken()
    this.name = this.localstorageService.getFirstname()
    this.avatar = this.localstorageService.getAvatar()
    this.authenLogId = this.localstorageService.getAuthenLog()
    let storageRole = this.localstorageService.getRole()
    this.role = this.cryptLibService.decryptCipher(storageRole ? storageRole : '')
  }
  ngOnDestroy(): void {
    this.subscription?.unsubscribe()
  }

  public routeLogin() {
    window.location.href = 'auth/login'
  }

  signOut() {
    const payload = {
      authen_log_id: this.authenLogId
    }
    const authen = this.authenticationService.postLogout(payload).subscribe((rs) => {
      this.localstorageService.signOut()
      window.location.href = '/'
    })
    this.subscription?.add(authen)

  }
  routerIndex() {
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

import { LocalStorageService } from './index/services/local-storage.service';
import { Component, HostListener, SimpleChanges } from '@angular/core';
import { TimeoutTokenService } from './index/services/time-out-token.service';
import { SweetAlertSessionExpired } from './index/component/swal2/sweetalert-global';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'marathon-web';

  constructor(
    private timeoutTokenService: TimeoutTokenService,
    private LocalStorageService: LocalStorageService
  ) { }
  ngOnInit(): void {
    this.timeoutTokenService.setTokenExpires();
    this.timeoutTokenService.setSession();
  }

  //Check curser none active if none active clear session
  @HostListener('window:mousemove') refreshUserState() {
    //Clear time 
    this.timeoutTokenService.clearSession()
    //Call time
    this.timeoutTokenService.setSession();
  }
}

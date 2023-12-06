import { Component, ElementRef, ViewChild } from '@angular/core';
import { LocalStorageService } from '../../services/local-storage.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent {
  token: any
  name: any
  isCollapsed: boolean = true
  constructor(private localstorageService: LocalStorageService, private localStorageService: LocalStorageService) {

  }
  
  ngOnInit(): void {
    this.token = this.localstorageService.getToken()
    this.name = this.localstorageService.getFirstname()
  }
  public routeLogin() {
    window.location.href = 'auth/login'
  }
  signOut() {
    this.localStorageService.signOut()
    window.location.href = '/'
  }
}

import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { LocalStorageService } from 'src/app/index/services/local-storage.service';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.scss']
})
export class AdminDashboardComponent {
  first_name: any
  lastname: any
  collapse_basic_menu: boolean = false
  collapse_payment_menu: boolean = false
  collapse_report_menu: boolean = false
  collapse_approver_menu: boolean = false
  menu: string = 'index'
  constructor(
    private localStorageService: LocalStorageService,
    private titleService: Title
  ) {
    this.titleService.setTitle('Back-office')
    this.first_name = this.localStorageService.getFirstname()
    this.lastname = this.localStorageService.getLastname()
  }
  setCollapseApprover() {
    if (this.collapse_approver_menu == true) {
      return this.collapse_approver_menu = false
    }
    else {
      return this.collapse_approver_menu = true
    }
  }
  setCollapsebasic() {
    // const collapse_transition = document.getElementsByClassName('wrapper-collapse-transition')
    if (this.collapse_basic_menu == true) {
      return this.collapse_basic_menu = false
    }
    else {
      return this.collapse_basic_menu = true
    }
  }
  setCollapsepayment() {
    if (this.collapse_payment_menu == true) {
      return this.collapse_payment_menu = false
    }
    else {
      return this.collapse_payment_menu = true
    }
  }
  setCollapsereport() {
    if (this.collapse_report_menu == true) {
      return this.collapse_report_menu = false
    }
    else {
      return this.collapse_report_menu = true
    }
  }
  setMenu(type: any) {
    this.menu = type
  }
  signOut() {
    this.localStorageService.signOut()
    window.location.href = '/auth/login'
  }
}

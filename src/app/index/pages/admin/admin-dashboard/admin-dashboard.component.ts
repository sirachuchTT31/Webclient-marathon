import { Component } from '@angular/core';
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
  menu: string = 'index'
  constructor(private localStorageService: LocalStorageService) {
    this.first_name = this.localStorageService.getFirstname()
    this.lastname = this.localStorageService.getLastname()
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
}

import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LocalStorageService } from './services/local-storage.service';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss']
})

export class IndexComponent {
  page_2 = ''
  page_1 = ''
  role: any
  constructor(private router: Router, private localStorageService: LocalStorageService) {
    let current = this.router.url.split('/')
    this.page_2 = current[1]
    console.log("this.page 2", this.page_2)
    this.page_1 = current[0]
    this.role = localStorageService.getRole()
    console.log("role", this.role)
    console.log("page", this.page_2)
    // this.is_check_detail_products = current[3]
  }
}

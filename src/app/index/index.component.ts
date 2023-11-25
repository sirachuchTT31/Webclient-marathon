import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LocalStorageService } from './services/local-storage.service';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss']
})

export class IndexComponent {
  page = ''
  role: any
  constructor(private router: Router, private localStorageService: LocalStorageService) {
    let current = this.router.url.split('/')
    this.page = current[1]
    this.role = localStorageService.getRole()
    console.log("role", this.role)
    console.log("page", this.page)
    // this.is_check_detail_products = current[3]
  }
}

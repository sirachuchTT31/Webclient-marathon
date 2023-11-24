import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss']
})

export class IndexComponent {
  page = ''
  constructor(private router: Router) {
    let current = this.router.url.split('/')
    this.page = current[1]
    console.log("page",this.page)
    // this.is_check_detail_products = current[3]
  }
}

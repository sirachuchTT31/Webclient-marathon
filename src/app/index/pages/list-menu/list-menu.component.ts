import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-list-menu',
  templateUrl: './list-menu.component.html',
  styleUrls: ['./list-menu.component.scss']
})
export class ListMenuComponent {
  // mog_data_serch: any
  mog_data_serch = [{ name: "archie" }, { name: "jake" }, { name: "richard" }];
  char_search: any
  search_Form: FormGroup
  constructor() {
    this.search_Form = new FormGroup({
      char_search: new FormControl('')
    })
  }
  ngOnInit() {
  }
  serachBox(event: any) {
    this.char_search = event.target.value
    console.log(this.char_search)
  }
}

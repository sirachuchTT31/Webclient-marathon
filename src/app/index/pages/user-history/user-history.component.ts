import { Component } from '@angular/core';

@Component({
  selector: 'app-user-history',
  templateUrl: './user-history.component.html',
  styleUrls: ['./user-history.component.scss'],
})
export class UserHistoryComponent {
  dropdown_status  : boolean = false

  setStatus(){
    console.log(this.dropdown_status)
  }
}

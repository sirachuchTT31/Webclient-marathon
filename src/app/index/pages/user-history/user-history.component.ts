import { Component } from '@angular/core';
import Swal from 'sweetalert2';
import { NgxSpinnerService } from 'ngx-spinner';
import { RegisterrunningmemberService } from './../../services/register-running-member.service';
import { LocalStorageService } from 'src/app/index/services/local-storage.service';
@Component({
  selector: 'app-user-history',
  templateUrl: './user-history.component.html',
  styleUrls: ['./user-history.component.scss'],
})
export class UserHistoryComponent {
  dropdown_status: boolean = false
  //LOCALSTORAGE 
  local_name: any
  local_lastname: any
  local_auth_id: any
  //SERVICE 
  list_history: any
  mock_list: any
  config_pagin: any
  constructor(private register_running_member_Service: RegisterrunningmemberService, private spinner: NgxSpinnerService, private localStorageService: LocalStorageService,) {
    //CALL LOCALSTORAGE 
    this.local_name = this.localStorageService.getFirstname()
    this.local_lastname = this.localStorageService.getLastname()
    this.local_auth_id = this.localStorageService.getId()
  }
  ngOnInit() {
    //SERVICE 
    this.getHistory()
    this.config_pagin = {
      pageSize: 5,
      currentPage: 1
    }
    this.mock_list = {
      result: [
        {
          name: 'demo01',
          date: '11-01-2022',
          status: true
        }
        ,
        {
          name: 'demo01',
          date: '11-01-2022',
          status: true
        },
        {
          name: 'demo01',
          date: '11-01-2022',
          status: true
        },
        {
          name: 'demo01',
          date: '11-01-2022',
          status: true
        },
        {
          name: 'demo01',
          date: '11-01-2022',
          status: true
        },
        {
          name: 'demo01',
          date: '11-01-2022',
          status: true
        }, {
          name: 'demo01',
          date: '11-01-2022',
          status: true
        }
      ]
    }
  }
  countIndex(pageSize: number, current_page: number, index: number) {
    return pageSize * (current_page - 1) + index;
  }
  getHistory() {
    try {
      this.register_running_member_Service.getHistory(this.local_auth_id).subscribe((rs) => {
        if (rs?.status == true) {
          this.list_history = rs?.results
        }
        else {

        }
      })
    }
    catch (e) {
      console.log(e)
    }
  }
  changePage(event: any) {
    this.config_pagin.currentPage = event
    console.log(event)
  }
  setStatus() {
    console.log(this.dropdown_status)
  }
}

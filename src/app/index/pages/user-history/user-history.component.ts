import { Component } from '@angular/core';
import Swal from 'sweetalert2';
import { NgxSpinnerService } from 'ngx-spinner';
import { RegisterrunningmemberService } from './../../services/register-running-member.service';
import { LocalStorageService } from 'src/app/index/services/local-storage.service';
import { FormControl, FormGroup } from '@angular/forms';
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
  filter_reg: any
  mock_list: any
  config_pagin: any
  filter_status_list: any
  status_form: FormGroup
  constructor(private register_running_member_Service: RegisterrunningmemberService, private spinner: NgxSpinnerService, private localStorageService: LocalStorageService,) {
    //CALL FORM
    this.status_form = new FormGroup({
      status: new FormControl('10')
    })
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
    this.filter_status_list = {
      results: {
        data: [
          {
            text: 'ทั้งหมด',
            value: '10'
          },
          {
            text: 'รอการอนุมัติ',
            value: '11'
          },
          {
            text: 'รอการชำระเงินค่าใช้จ่าย',
            value: '12'
          },
          {
            text: 'รอการตรวจสอบชำระเงิน',
            value: '13'
          },
          {
            text: 'อนมัติเรียบร้อย',
            value: '14'
          },
          {
            text: 'บันทึกการวิ่ง',
            value: '15'
          }
        ]
      }
    }
  }
  countIndex(pageSize: number, current_page: number, index: number) {
    return pageSize * (current_page - 1) + index;
  }
  filterReg() {
    if (this.status_form.controls['status'].value != '10') {
      this.filter_reg = this.list_history.filter((res: any) =>res?.reg_member_status == this.status_form.controls['status'].value)
    }
    else {
      this.filter_reg = this.list_history
    }
  }
  getHistory() {
    try {
      this.register_running_member_Service.getHistory(this.local_auth_id).subscribe((rs) => {
        if (rs?.status == true) {
          this.list_history = rs?.results
          this.filter_reg = rs?.results
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

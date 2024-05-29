import { Component } from '@angular/core';
import Swal from 'sweetalert2';
import { NgxSpinnerService } from 'ngx-spinner';
import { LocalStorageService } from 'src/app/index/services/local-storage.service';
import { FormControl, FormGroup } from '@angular/forms';
import { RegisterrunningmemberService } from 'src/app/index/services/register-running-member.service';
import { EventService } from 'src/app/index/services/event.service';
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
  mockData = [
    {
      reg_event_name: 'งานวิ่งบึงแก่นนคร (ขอนแก่น) ครั้งที่ 5',
      reg_event_path_img: '../../../../assets/img/reg_by_organizer/5880559.jpg',
      createdAt: '2024-05-29 12:55:53.644',
      reg_member_status: 11
    },
    {
      reg_event_name: 'งานวิงมหาวิทยาลัยขอนแก่น ครั้งที่ 3',
      reg_event_path_img: '../../../../assets/img/reg_by_organizer/5880559.jpg',
      createdAt: '2024-05-28 12:55:53.644',
      reg_member_status: 11
    }
  ]
  page : number = 0
  perPage : number = 10
  historyData : any
  today = new Date()
  DateResult : any
  constructor(
    private register_running_member_Service: RegisterrunningmemberService,
    private spinner: NgxSpinnerService,
    private localStorageService: LocalStorageService,
    private eventService : EventService
  ) {
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
  filterReg() {
    if (this.status_form.controls['status'].value != '10') {
      this.filter_reg = this.list_history.filter((res: any) => res?.reg_member_status == this.status_form.controls['status'].value)
    }
    else {
      this.filter_reg = this.list_history
    }
  }
  getHistory(currentPage? : number) {
    try {
      this.eventService.getAllHistory({page : currentPage ? currentPage : 0, per_page : this.perPage}).subscribe((rs) => {
        if(rs?.status === true){
          this.historyData = rs
        }
        else {

        }
      })
    }
    catch (e) {
      console.log(e)
    }
  }
  onSearch(){

  }
  validateButton(){
    if(this.DateResult){
      return true
    }
    return false
  }
  setStatus() {
    console.log(this.dropdown_status)
  }
}

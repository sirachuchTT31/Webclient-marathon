
import { LocalStorageService } from 'src/app/index/services/local-storage.service';
import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import Swal from 'sweetalert2';
import { NgxSpinnerService } from 'ngx-spinner';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { RegisterrunningmemberService } from 'src/app/index/services/register-running-member.service';
import { EventService } from 'src/app/index/services/event.service';
import { CryptlibService } from 'src/app/index/services/crypt-lib.service';
@Component({
  selector: 'app-list-menu',
  templateUrl: './list-menu.component.html',
  styleUrls: ['./list-menu.component.scss']
})
export class ListMenuComponent {

  //FORM
  search_Form: FormGroup
  create_register_running_Form: FormGroup
  //DATA
  register_running_event_array: any
  list_show_register: any
  char_search: any
  search_where_id: any
  //LOCALSTORAGE 
  local_name: any
  local_lastname: any
  local_auth_id: any
  mockData = [
    {
      reg_event_amount: '50',
      reg_event_due_date: '2024-06-30',
      reg_event_path_img: '../../../../assets/img/reg_by_organizer/5880559.jpg',
      reg_event_name: 'งานวิ่งราชมงคลขอนแก่น',
      reg_event_detail: 'งานวิ่งราชมงคลขอนแก่น 10 Km.',
      reg_event_price: '150'
    }
  ]
  role: any
  constructor(
    private eventService: EventService,
    private spinner: NgxSpinnerService,
    private modalService: NgbModal,
    private localStorageService: LocalStorageService,
    private cryptLibService: CryptlibService
  ) {
    this.search_Form = new FormGroup({
      char_search: new FormControl('')
    })
    this.create_register_running_Form = new FormGroup({
      name: new FormControl('', [Validators.required]),
      lastname: new FormControl('', [Validators.required]),
      dsc: new FormControl(''),
      reg_event_name: new FormControl('',),
      trans_id: new FormControl('',),
      reg_event_id: new FormControl('')
    })
    this.create_register_running_Form.controls['reg_event_name'].disable()
    this.create_register_running_Form.controls['name'].disable()
    this.create_register_running_Form.controls['lastname'].disable()
    //CALL LOCALSTORAGE 
    this.local_name = this.localStorageService.getFirstname()
    this.local_lastname = this.localStorageService.getLastname()
    this.local_auth_id = this.localStorageService.getId()
  }
  ngOnInit() {
    let storageRole = this.localStorageService.getRole()
    this.role = this.cryptLibService.decryptCipher(storageRole ? storageRole : '')
    this.spinner.show()
    this.getallRegisterrunningevent()
    // this.list_show_register = this.mockData
    setTimeout(() => {
      this.spinner.hide()
    }, 3000)
  }
  openModal(modal: any, list: any) {
    if (this.role === 'member') {
      this.modalService.open(modal, { size: 'lg' })
      //MAPPING VALUE 
      let f = this.create_register_running_Form
      f.controls['name']?.setValue(this.local_name)
      f.controls['lastname']?.setValue(this.local_lastname)
      f.controls['reg_event_name']?.setValue(list?.name)
      f.controls['reg_event_id']?.setValue(list?.id)
    }
    else {
      Swal.fire({
        showCloseButton: true,
        showConfirmButton: false,
        icon: "error",
        customClass : {
          popup : "custom-popup",
          title : "custom-title"
        },
        title: 'ผู้จัดงานไม่สามารถลงทะเบียนได้',
        text : 'กรุณาติดต่อผู้ดูแลระบบ'
      });
    }
  }
  getallRegisterrunningevent() {
    this.eventService.getAllEvent().subscribe((rs) => {
      if (rs?.status === true) {
        this.register_running_event_array = rs.results
        this.list_show_register = rs.results
        this.spinner.hide()
      }
      else {
        this.spinner.hide()
        Swal.fire({
          showCloseButton: true,
          showConfirmButton: false,
          icon: "error",
          // title: rs?.status_code,
          text: rs?.message,
        });
      }
    })
  }
  searchBox(event: any) {
    // this.char_search = event.target.value
  }
  removersearchBox() {
    this.search_Form.controls['char_search'].reset()
    this.search_where_id = ""
  }
  onClickfilter(_id: any) {
    this.search_where_id = _id

  }
  onSearch() {
    console.log("this.search_where_id", this.search_where_id)
    if (this.search_where_id == "" || this.search_where_id == undefined) {
      this.getallRegisterrunningevent()
    }
    else {
      let new_result = this.register_running_event_array.filter((e: any) => e.reg_event_id == this.search_where_id)
      this.list_show_register = new_result
    }
  }
  onRefresh() {
    window.location.reload()
  }
  formatNumber(x: any) {
    if (x) {
      x = x.toString()
      x = x.replace(/\D/g, "").replace(/\B(?=(\d{3})+(?!\d))/g, ",")
      return x;
    }
  }
  numberOnly(event: any): boolean {
    const charCode = event.which || event.keyCode
    if (event.target.value.length == 10) {

      return false
    }
    else {
      if (charCode >= 48 && charCode < 58) {
        return true
      }
      return false
    }
  }
  //FIXBUG
  checkcreateModal() {
    if (this.create_register_running_Form.valid == true) {
      return true
    }
    else {
      return false
    }
  }
  saveData() {
    this.spinner.show()
    let f = this.create_register_running_Form
    let param = {
      description: f.controls['dsc']?.value,
      event_id: Number(f.controls['reg_event_id']?.value)
    }
    this.eventService.postCreateRegisterEvent(param).subscribe((rs) => {
      this.create_register_running_Form.reset()
      if (rs?.status == true) {
        this.spinner.hide()
        Swal.fire({
          showCloseButton: true,
          showConfirmButton: false,
          icon: "success",
          // title: rs?.status_code,
          timer: 3000,
          text: rs?.message,
        });
      }
      else {
        this.spinner.hide()
        Swal.fire({
          showCloseButton: true,
          showConfirmButton: false,
          icon: "error",
          text: rs?.message,
        });
      }
    })
  }
}

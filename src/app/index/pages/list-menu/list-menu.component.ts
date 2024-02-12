import { RegisterrunningmemberService } from './../../services/register-running-member.service';
import { LocalStorageService } from 'src/app/index/services/local-storage.service';
import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { RegisterrunningeventService } from '../../services/register-running-event.service';
import Swal from 'sweetalert2';
import { NgxSpinnerService } from 'ngx-spinner';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
@Component({
  selector: 'app-list-menu',
  templateUrl: './list-menu.component.html',
  styleUrls: ['./list-menu.component.scss']
})
export class ListMenuComponent {
  // mog_data_serch: any
  mog_data_serch = [{ name: "archie" }, { name: "jake" }, { name: "richard" }];

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
  constructor(private register_running_event_Service: RegisterrunningeventService, private spinner: NgxSpinnerService, private modalService: NgbModal,
    private localStorageService: LocalStorageService,private register_running_member_Service :  RegisterrunningmemberService) {
    this.search_Form = new FormGroup({
      char_search: new FormControl('')
    })
    this.create_register_running_Form = new FormGroup({
      name: new FormControl('', [Validators.required]),
      lastname: new FormControl('', [Validators.required]),
      tel: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required]),
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
    this.spinner.show()
    this.getallRegisterrunningevent()
  }
  openModal(modal: any, list: any) {
    this.modalService.open(modal, { size: 'lg' })
    //MAPPING VALUE 
    let f = this.create_register_running_Form
    f.controls['name']?.setValue(this.local_name)
    f.controls['lastname']?.setValue(this.local_lastname)
    f.controls['reg_event_name']?.setValue(list?.reg_event_name)
    f.controls['reg_event_id']?.setValue(list?.reg_event_id)
  }
  getallRegisterrunningevent() {
    this.register_running_event_Service.getallRegisterrunningevent().subscribe(async (rs) => {
      if (rs?.status == true) {
        this.register_running_event_array = rs.result
        this.list_show_register = rs.result
        this.spinner.hide()
      }
      else {
        this.spinner.hide()
        await Swal.fire({
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
  checkcreateModal(){
    if(this.create_register_running_Form.valid == true){
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
      auth_id: this.local_auth_id,
      reg_member_description: f.controls['dsc']?.value ,
      name: this.local_name,
      lastname: this.local_lastname,
      tel: f.controls['tel']?.value ,
      email : f.controls['email']?.value,
      reg_event_id:  f.controls['reg_event_id']?.value ,
    }
    this.register_running_member_Service.postCreateRegisterrunningmember(param).subscribe((rs)=>{
      this.create_register_running_Form.reset()
      if(rs?.status == true){
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
          // title: rs?.status_code,
          text: rs?.message,
        });
      }
    })
  }
}

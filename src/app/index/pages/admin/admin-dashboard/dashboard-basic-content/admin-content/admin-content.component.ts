import { Component } from '@angular/core';
import { MasterdataService } from 'src/app/index/services/master-data.service';
import { NgxSpinnerService } from 'ngx-spinner';
import Swal from 'sweetalert2';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormControl, FormGroup, Validators } from '@angular/forms';
@Component({
  selector: 'app-admin-content',
  templateUrl: './admin-content.component.html',
  styleUrls: ['./admin-content.component.scss'],
})
export class AdminContentComponent {
  admin_create_form: FormGroup
  id_Admin: any
  constructor(private masterdataService: MasterdataService, private spinner: NgxSpinnerService, private modalService: NgbModal) {
    this.admin_create_form = new FormGroup({
      username: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required]),
      name: new FormControl('', [Validators.required]),
      lastname: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required]),
      tel: new FormControl('', [Validators.required]),
      address: new FormControl('', [Validators.required])
    })
  }
  master_admin_all: any

  ngOnInit(): void {
    this.spinner.show()
    this.getallAdmindata()
  }
  openModalCreate(modal: any) {
    this.modalService.open(modal, { size: 'lg' })
    this.admin_create_form.reset()
  }
  openModalUpdate(modal: any, _id: any, username: any, passwrod: any, name: any, lastname: any, email: any, tel: any,
    address: any) {
    this.modalService.open(modal, { size: 'lg' })
    this.id_Admin = _id
    this.admin_create_form = new FormGroup({
      username: new FormControl(username, [Validators.required]),
      password: new FormControl(passwrod, [Validators.required]),
      name: new FormControl(name, [Validators.required]),
      lastname: new FormControl(lastname, [Validators.required]),
      email: new FormControl(email, [Validators.required]),
      tel: new FormControl(tel, [Validators.required]),
      address: new FormControl(address, [Validators.required])
    })
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
  checkcreateadminButton() {
    if (this.admin_create_form.valid == true) {
      return true
    }
    else {
      return false
    }
  }
  createAdmin() {
    // let list = this.admin_create_form.value
    if (this.admin_create_form.valid == true) {
      let new_list = {
        admin_username: this.admin_create_form.controls['username'].value,
        admin_password: this.admin_create_form.controls['password'].value,
        admin_name: this.admin_create_form.controls['name'].value,
        admin_lastname: this.admin_create_form.controls['lastname'].value,
        admin_tel: this.admin_create_form.controls['tel'].value,
        admin_address: this.admin_create_form.controls['address'].value,
        admin_email: this.admin_create_form.controls['email'].value,
      }
      this.masterdataService.postCreateAdmindata(new_list).subscribe(async (rs) => {
        this.spinner.show()
        if (rs?.status == true) {
          this.spinner.hide()
          await Swal.fire({
            showCloseButton: true,
            showConfirmButton: false,
            icon: "success",
            // title: rs?.status_code,
            text: rs?.message,
            timer: 2000,
          });
          this.getallAdmindata()
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
    else {
      // this.admin_create_form.setErrors({ 'incorrect': true })
    }

  }

  //fetch 
  getallAdmindata() {
    this.masterdataService.getallAdmindata().subscribe((rs) => {
      if (rs?.status == true) {
        this.master_admin_all = rs.result
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
}

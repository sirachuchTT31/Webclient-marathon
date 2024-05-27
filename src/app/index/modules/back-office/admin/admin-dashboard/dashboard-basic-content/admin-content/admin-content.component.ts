import { Component } from '@angular/core';
import { MasterdataService } from 'src/app/index/services/master-data.service';
import { NgxSpinnerService } from 'ngx-spinner';
import Swal from 'sweetalert2';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { BackOfficeService } from 'src/app/index/services/back-office.service';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-admin-content',
  templateUrl: './admin-content.component.html',
  styleUrls: ['./admin-content.component.scss'],
})
export class AdminContentComponent {
  admin_create_form: FormGroup
  subscription!: Subscription
  actionDialog : string = 'create'
  idEdit : any
  constructor(private spinner: NgxSpinnerService, private modalService: NgbModal, private backofficeService: BackOfficeService) {
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
    this.getallAdminBackoffice()
    setTimeout(() => {
      this.spinner.hide()
    }, 3000)
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe()
  }
  openModal(modal: any, action: string, data?: any) {
    this.modalService.dismissAll()
    this.modalService.open(modal, { size: 'lg' });
    this.admin_create_form.reset()
    if (action === 'edit') {
      this.admin_create_form.get('username')?.clearValidators()
      this.admin_create_form.get('password')?.clearValidators()
      this.actionDialog = 'edit'
      this.idEdit = data.id
      this.admin_create_form.get('name')?.setValue(data?.name)
      this.admin_create_form.get('lastname')?.setValue(data?.lastname)
      this.admin_create_form.get('email')?.setValue(data?.email)
      this.admin_create_form.get('tel')?.setValue(data?.telephone)
      this.admin_create_form.get('address')?.setValue(data?.address)
      this.admin_create_form.updateValueAndValidity()
    }
    else {
      this.admin_create_form.get('username')?.setValidators(Validators.required)
      this.admin_create_form.get('password')?.setValidators(Validators.required)
      this.admin_create_form.updateValueAndValidity()
      this.idEdit = null
      this.actionDialog = 'create'
    }
  }
  numberOnly(event: any): boolean {
    const charCode = event.which || event.keyCode
    if (event.target.value.length == 20) {

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
  onRemove(id: any) {
    Swal.fire({
      icon: "warning",
      title: "คุณต้องการลบข้อมูลใช่ไหม ?",
      showCancelButton: true,
      showCloseButton: true,
      confirmButtonText: "ตกลง",
      cancelButtonText: "ยกเลิก",
      confirmButtonColor: '#0d6efd',
      cancelButtonColor: '#dc3545',
    }).then((result) => {
      if (result.isConfirmed) {
        let params = {
          id: id
        }
        this.spinner.show()
        this.backofficeService.postDeleteAdminBackoffice(params).subscribe(async (rs) => {
          if (rs?.status == true) {
            this.spinner.hide()
            await Swal.fire({
              showCloseButton: true,
              showConfirmButton: false,
              icon: "success",
              text: rs?.message,
              timer: 2000,
            });
            this.getallAdminBackoffice()
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
    });
  }
  createAdmin(action: string) {
    if (this.admin_create_form.valid == true) {
      if (action === 'create') {
        let params = {
          username: this.admin_create_form.controls['username'].value,
          password: this.admin_create_form.controls['password'].value,
          name: this.admin_create_form.controls['name'].value,
          lastname: this.admin_create_form.controls['lastname'].value,
          telephone: this.admin_create_form.controls['tel'].value,
          address: this.admin_create_form.controls['address'].value,
          email: this.admin_create_form.controls['email'].value,
        }
        this.backofficeService.postCreateAdminBackoffice(params).subscribe(async (rs) => {
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
            // this.getallAdmindata()
            this.getallAdminBackoffice()
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
        this.modalService.dismissAll();
      }
      else {
        let params = {
          id: Number(this.idEdit),
          name: this.admin_create_form.controls['name'].value,
          lastname: this.admin_create_form.controls['lastname'].value,
          telephone: this.admin_create_form.controls['tel'].value,
          address: this.admin_create_form.controls['address'].value,
          email: this.admin_create_form.controls['email'].value,
        }
        this.backofficeService.postUpdateAdminBackoffice(params).subscribe(async (rs) => {
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
            // this.getallAdmindata()
            this.getallAdminBackoffice()
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
        this.modalService.dismissAll();
      }
    }
  }

  //fetch 
  getallAdminBackoffice() {
    const backoffice = this.backofficeService.getAllAdminBackffice().subscribe((rs) => {
      if (rs?.status === true) {
        this.master_admin_all = rs.results
      }
      else {
        Swal.fire({
          showCloseButton: true,
          showConfirmButton: false,
          icon: "error",
          text: rs?.message,
        });
      }
    })
    this.subscription?.add(backoffice)
  }
}

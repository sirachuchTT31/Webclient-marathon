import { Component } from '@angular/core';
import { MasterdataService } from 'src/app/index/services/master-data.service';
import { NgxSpinnerService } from 'ngx-spinner';
import Swal from 'sweetalert2';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { BackOfficeService } from 'src/app/index/services/back-office.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-member-content',
  templateUrl: './member-content.component.html',
  styleUrls: ['./member-content.component.scss']
})
export class MemberContentComponent {
  config = {
    currentPage: 1,
    pageSize: 10,
    totalRecord: 0
  }
  member_create_form: FormGroup
  memberData: any
  id_member: any
  subscription!: Subscription
  actionDialog: string = 'create'
  idEdit: any
  constructor(
    private backofficeService: BackOfficeService,
    private spinner: NgxSpinnerService,
    private modalService: NgbModal) {
    this.member_create_form = new FormGroup({
      username: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required]),
      name: new FormControl('', [Validators.required]),
      lastname: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required]),
      tel: new FormControl('', [Validators.required]),
      address: new FormControl('', [Validators.required])
    })
  }
  ngOnInit(): void {
    this.spinner.show()
    this.getAllMemberBackoffice()
    setTimeout(() => {
      this.spinner.hide()
    }, 3000)
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe()
  }

  countIndex(pageSize: number, current_page: number, index: number) {
    return pageSize * (current_page - 1) + index;
  }

  changePage(event: any) {
    this.config.currentPage = event;
    this.getAllMemberBackoffice()
  }

  openModal(modal: any, action: string, data?: any) {
    this.modalService.dismissAll()
    this.modalService.open(modal, { size: 'lg' });
    this.member_create_form.reset()
    if (action === 'edit') {
      this.member_create_form.get('username')?.clearValidators()
      this.member_create_form.get('password')?.clearValidators()
      this.actionDialog = 'edit'
      this.idEdit = data.id
      this.member_create_form.get('name')?.setValue(data?.name)
      this.member_create_form.get('lastname')?.setValue(data?.lastname)
      this.member_create_form.get('email')?.setValue(data?.email)
      this.member_create_form.get('tel')?.setValue(data?.telephone)
      this.member_create_form.get('address')?.setValue(data?.address)
      this.member_create_form.updateValueAndValidity()
    }
    else {
      this.member_create_form.get('username')?.setValidators(Validators.required)
      this.member_create_form.get('password')?.setValidators(Validators.required)
      this.member_create_form.updateValueAndValidity()
      this.idEdit = null
      this.actionDialog = 'create'
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
  validate() {
    if (this.member_create_form.valid == true) {
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
        this.backofficeService.postDeleteMemberBackoffice(params).subscribe(async (rs) => {
          if (rs?.status == true) {
            this.spinner.hide()
            await Swal.fire({
              showCloseButton: true,
              showConfirmButton: false,
              icon: "success",
              text: rs?.message,
              timer: 2000,
            });
            this.getAllMemberBackoffice()
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

  createOrEdit(action: string) {
    if (this.member_create_form.valid == true) {
      if (action === 'create') {
        let params = {
          username: this.member_create_form.controls['username'].value,
          password: this.member_create_form.controls['password'].value,
          name: this.member_create_form.controls['name'].value,
          lastname: this.member_create_form.controls['lastname'].value,
          telephone: this.member_create_form.controls['tel'].value,
          address: this.member_create_form.controls['address'].value,
          email: this.member_create_form.controls['email'].value,
        }
        this.backofficeService.postCreateMemberBackoffice(params).subscribe(async (rs) => {
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
            this.getAllMemberBackoffice()
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
          name: this.member_create_form.controls['name'].value,
          lastname: this.member_create_form.controls['lastname'].value,
          telephone: this.member_create_form.controls['tel'].value,
          address: this.member_create_form.controls['address'].value,
          email: this.member_create_form.controls['email'].value,
        }
        this.backofficeService.postUpdateMemberBackoffice(params).subscribe(async (rs) => {
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
            this.getAllMemberBackoffice()
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
  getAllMemberBackoffice() {
    const backoffice = this.backofficeService.getAllMemberBackoffice({ page: this.config.currentPage ? this.config.currentPage - 1 : 0, per_page: this.config.pageSize }).subscribe((rs) => {
      if (rs?.status === true) {
        this.memberData = rs.results
        this.config.totalRecord = rs.total_record
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

import { Component } from '@angular/core';
import { MasterdataService } from 'src/app/index/services/master-data.service';
import { NgxSpinnerService } from 'ngx-spinner';
import Swal from 'sweetalert2';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { BackOfficeService } from 'src/app/index/services/back-office.service';
@Component({
  selector: 'app-organizer-content',
  templateUrl: './organizer-content.component.html',
  styleUrls: ['./organizer-content.component.scss']
})
export class OrganizerContentComponent {
  config = {
    currentPage: 1,
    pageSize: 10,
    totalRecord: 0
  }
  organ_create_form: FormGroup
  subscription!: Subscription
  actionDialog: string = 'create'
  idEdit: any
  organizerData: any
  constructor(
    private spinner: NgxSpinnerService,
    private modalService: NgbModal,
    private backofficeService: BackOfficeService) {
    this.organ_create_form = new FormGroup({
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
    this.getallOrganizerBackoffice()
    setTimeout(() => {
      this.spinner.hide()
    }, 3000)
  }
  countIndex(pageSize: number, current_page: number, index: number) {
    return pageSize * (current_page - 1) + index;
  }

  changePage(event: any) {
    this.config.currentPage = event;
    this.getallOrganizerBackoffice()
  }

  openModal(modal: any, action: string, data?: any) {
    this.modalService.dismissAll()
    this.modalService.open(modal, { size: 'lg' });
    this.organ_create_form.reset()
    if (action === 'edit') {
      this.organ_create_form.get('username')?.clearValidators()
      this.organ_create_form.get('password')?.clearValidators()
      this.actionDialog = 'edit'
      this.idEdit = data.id
      this.organ_create_form.get('name')?.setValue(data?.name)
      this.organ_create_form.get('lastname')?.setValue(data?.lastname)
      this.organ_create_form.get('email')?.setValue(data?.email)
      this.organ_create_form.get('tel')?.setValue(data?.telephone)
      this.organ_create_form.get('address')?.setValue(data?.address)
      this.organ_create_form.updateValueAndValidity()
    }
    else {
      this.organ_create_form.get('username')?.setValidators(Validators.required)
      this.organ_create_form.get('password')?.setValidators(Validators.required)
      this.organ_create_form.updateValueAndValidity()
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
    if (this.organ_create_form.valid == true) {
      return true
    }
    else {
      return false
    }
  }

  
  createOrEdit(action: string) {
    if (this.organ_create_form.valid == true) {
      if (action === 'create') {
        let new_list = {
          username: this.organ_create_form.controls['username'].value,
          password: this.organ_create_form.controls['password'].value,
          name: this.organ_create_form.controls['name'].value,
          lastname: this.organ_create_form.controls['lastname'].value,
          telephone: this.organ_create_form.controls['tel'].value,
          address: this.organ_create_form.controls['address'].value,
          email: this.organ_create_form.controls['email'].value,
        }
        this.backofficeService.postCreateOrganizerBackoffice(new_list).subscribe(async (rs) => {
          this.spinner.show()
          if (rs?.status == true) {
            this.spinner.hide()
            await Swal.fire({
              showCloseButton: true,
              showConfirmButton: false,
              icon: "success",
              text: rs?.message,
              timer: 2000,
            });
            this.getallOrganizerBackoffice()
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
          name: this.organ_create_form.controls['name'].value,
          lastname: this.organ_create_form.controls['lastname'].value,
          telephone: this.organ_create_form.controls['tel'].value,
          address: this.organ_create_form.controls['address'].value,
          email: this.organ_create_form.controls['email'].value,
        }
        this.backofficeService.postUpdateOrganizerBackoffice(params).subscribe(async (rs) => {
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
            this.getallOrganizerBackoffice()
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
        this.backofficeService.postDeleteOrganizerBackoffice(params).subscribe(async (rs) => {
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
            this.getallOrganizerBackoffice()
          }
          else {
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
    });
  }
  //fetch 
  getallOrganizerBackoffice() {
    this.backofficeService.getAllOrganizerBackoffice({ page: this.config.currentPage ? this.config.currentPage - 1 : 0, per_page: this.config.pageSize }).subscribe((rs) => {
      if (rs?.status == true) {
        this.organizerData = rs.results
        this.config.totalRecord = rs.total_record
        // this.spinner.hide()
      }
      else {
        // this.spinner.hide()
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

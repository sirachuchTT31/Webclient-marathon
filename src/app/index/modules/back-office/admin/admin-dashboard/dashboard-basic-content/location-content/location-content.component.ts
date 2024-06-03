import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinnerService } from 'ngx-spinner';
import { Subscription } from 'rxjs';
import { BackOfficeService } from 'src/app/index/services/back-office.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-location-content',
  templateUrl: './location-content.component.html',
  styleUrls: ['./location-content.component.scss']
})
export class LocationContentComponent {
  config = {
    currentPage: 1,
    pageSize: 10,
    totalRecord: 0
  }
  locationForm: FormGroup
  subscription!: Subscription
  actionDialog: string = 'create'
  idEdit: any
  masterLocationData: any
  constructor(
    private backofficeService: BackOfficeService,
    private spinner: NgxSpinnerService,
    private modalService: NgbModal,
  ) {
    this.locationForm = new FormGroup({
      province: new FormControl('', Validators.required),
      district: new FormControl('', Validators.required),
      zipcode: new FormControl('', Validators.required),
      address: new FormControl('', Validators.required),
      isActive: new FormControl(false),
    })
  }
  ngOnInit(): void {
    this.spinner.show()
    this.getAllMasterLocationBackoffice()
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
    this.locationForm.reset()
    if (action === 'edit') {
      this.actionDialog = 'edit'
      this.idEdit = data.id
      this.locationForm.get('province')?.setValue(data?.province)
      this.locationForm.get('district')?.setValue(data?.district)
      this.locationForm.get('zipcode')?.setValue(data?.zipcode)
      this.locationForm.get('tel')?.setValue(data?.telephone)
      this.locationForm.get('address')?.setValue(data?.address)
      this.locationForm.get('isActive')?.setValue(data?.is_active)
      this.locationForm.updateValueAndValidity()
    }
    else {
      this.idEdit = null
      this.actionDialog = 'create'
    }
  }

  setIsActive(e: any) {
    this.locationForm.get('isActive')?.setValue(e?.checked)
  }

  countIndex(pageSize: number, current_page: number, index: number) {
    return pageSize * (current_page - 1) + index;
  }

  changePage(event: any) {
    this.config.currentPage = event;
    this.getAllMasterLocationBackoffice()
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

  validate() {
    if (this.locationForm.valid === true) {
      return true
    }
    else {
      return false
    }
  }

  createOrEdit(action: string) {
    if (this.locationForm.valid == true) {
      if (action === 'create') {
        let params = {
          province: this.locationForm.controls['province'].value,
          district: this.locationForm.controls['district'].value,
          zipcode: this.locationForm.controls['zipcode'].value,
          address: this.locationForm.controls['address'].value,
          is_active: this.locationForm.controls['isActive'].value ? this.locationForm.controls['isActive'].value : false
        }
        this.backofficeService.postCreateMasterLocationBackoffice(params).subscribe(async (rs) => {
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
            this.getAllMasterLocationBackoffice()
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
          province: this.locationForm.controls['province'].value,
          district: this.locationForm.controls['district'].value,
          zipcode: this.locationForm.controls['zipcode'].value,
          address: this.locationForm.controls['address'].value,
          is_active:  this.locationForm.controls['isActive'].value ? this.locationForm.controls['isActive'].value : false
        }
        this.backofficeService.postUpdateMasterLocationBackoffice(params).subscribe(async (rs) => {
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
            this.getAllMasterLocationBackoffice()
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
        this.backofficeService.postDeleteMasterLocationBackoffice(params).subscribe(async (rs) => {
          if (rs?.status == true) {
            this.spinner.hide()
            await Swal.fire({
              showCloseButton: true,
              showConfirmButton: false,
              icon: "success",
              text: rs?.message,
              timer: 2000,
            });
            this.getAllMasterLocationBackoffice()
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

  getAllMasterLocationBackoffice() {
    const backoffice = this.backofficeService.getAllMasterLocationBackoffice({ page: this.config.currentPage ? this.config.currentPage - 1 : 0, per_page: this.config.pageSize }).subscribe((rs) => {
      if (rs?.status === true) {
        this.masterLocationData = rs.results
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
    });
    this.subscription?.add(backoffice)
  }
}

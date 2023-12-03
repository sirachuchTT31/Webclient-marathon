import { Component } from '@angular/core';
import { MasterdataService } from 'src/app/index/services/master-data.service';
import { NgxSpinnerService } from 'ngx-spinner';
import Swal from 'sweetalert2';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AdminService } from 'src/app/index/services/admin.service';
import { OrganizerService } from 'src/app/index/services/organizer.service';
@Component({
  selector: 'app-organizer-content',
  templateUrl: './organizer-content.component.html',
  styleUrls: ['./organizer-content.component.scss']
})
export class OrganizerContentComponent {
  organ_create_form: FormGroup
  organ_edit_form: FormGroup
  master_organizer_all: any
  id_Organizer: any
  constructor(private organizerService: OrganizerService, private spinner: NgxSpinnerService, private modalService: NgbModal) {
    this.organ_create_form = new FormGroup({
      username: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required]),
      name: new FormControl('', [Validators.required]),
      lastname: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required]),
      tel: new FormControl('', [Validators.required]),
      address: new FormControl('', [Validators.required])
    })
    this.organ_edit_form = new FormGroup({
      name: new FormControl('', [Validators.required]),
      lastname: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required]),
      tel: new FormControl('', [Validators.required]),
      address: new FormControl('', [Validators.required])
    })
  }
  ngOnInit(): void {
    this.spinner.show()
    this.getallOrganizer()
  }
  openModalCreate(modal: any) {
    this.modalService.open(modal, { size: 'lg' })
    this.organ_create_form.reset()
  }
  openModalUpdate(modal: any, _id: any, name: any, lastname: any, email: any, tel: any,
    address: any) {
    this.modalService.open(modal, { size: 'lg' })
    this.id_Organizer = _id
    this.organ_edit_form = new FormGroup({
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
  checkcreateorganizerButton() {
    if (this.organ_create_form.valid == true) {
      return true
    }
    else {
      return false
    }
  }
  checkeditorganizerButton() {
    if (this.organ_edit_form.valid == true) {
      return true
    }
    else {
      return false
    }
  }
  onEdit() {
    console.log(this.organ_edit_form.value)
    if (this.organ_edit_form.valid == true) {
      this.spinner.show()
      let new_list = {
        organ_id: this.id_Organizer,
        organ_name: this.organ_edit_form.controls['name'].value,
        organ_lastname: this.organ_edit_form.controls['lastname'].value,
        organ_tel: this.organ_edit_form.controls['tel'].value,
        organ_address: this.organ_edit_form.controls['address'].value,
        organ_email: this.organ_edit_form.controls['email'].value,
      }
      this.organizerService.postEditOrganizer(new_list).subscribe(async (rs) => {
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
          this.getallOrganizer()
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
  createOrganizer() {
    // let list = this.admin_create_form.value
    if (this.organ_create_form.valid == true) {
      let new_list = {
        organ_username: this.organ_create_form.controls['username'].value,
        organ_password: this.organ_create_form.controls['password'].value,
        organ_name: this.organ_create_form.controls['name'].value,
        organ_lastname: this.organ_create_form.controls['lastname'].value,
        organ_tel: this.organ_create_form.controls['tel'].value,
        organ_address: this.organ_create_form.controls['address'].value,
        organ_email: this.organ_create_form.controls['email'].value,
      }
      this.organizerService.postCreateOrganizer(new_list).subscribe(async (rs) => {
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
          this.getallOrganizer()
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
          organ_id: id
        }
        this.spinner.show()
        this.organizerService.postDeleteOrganizer(params).subscribe(async (rs) => {
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
            this.getallOrganizer()
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
  getallOrganizer() {
    this.organizerService.getallOrganizerdata().subscribe((rs) => {
      if (rs?.status == true) {
        this.master_organizer_all = rs.result
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

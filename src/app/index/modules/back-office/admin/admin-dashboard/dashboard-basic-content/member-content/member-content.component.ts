import { Component } from '@angular/core';
import { MasterdataService } from 'src/app/index/services/master-data.service';
import { NgxSpinnerService } from 'ngx-spinner';
import Swal from 'sweetalert2';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MemberService } from 'src/app/index/services/member.service';

@Component({
  selector: 'app-member-content',
  templateUrl: './member-content.component.html',
  styleUrls: ['./member-content.component.scss']
})
export class MemberContentComponent {
  member_create_form: FormGroup
  member_edit_form: FormGroup
  master_member_all: any
  id_member: any
  constructor(private memberService: MemberService, private spinner: NgxSpinnerService, private modalService: NgbModal) {
    this.member_create_form = new FormGroup({
      username: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required]),
      name: new FormControl('', [Validators.required]),
      lastname: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required]),
      tel: new FormControl('', [Validators.required]),
      address: new FormControl('', [Validators.required])
    })
    this.member_edit_form = new FormGroup({
      name: new FormControl('', [Validators.required]),
      lastname: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required]),
      tel: new FormControl('', [Validators.required]),
      address: new FormControl('', [Validators.required])
    })
  }
  ngOnInit(): void {
    this.spinner.show()
    this.getallMember()
  }
  openModalCreate(modal: any) {
    this.modalService.open(modal, { size: 'lg' })
    this.member_create_form.reset()
  }
  openModalUpdate(modal: any, _id: any, name: any, lastname: any, email: any, tel: any,
    address: any) {
    this.modalService.open(modal, { size: 'lg' })
    this.id_member = _id
    this.member_edit_form = new FormGroup({
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
  checkcreatememberButton() {
    if (this.member_create_form.valid == true) {
      return true
    }
    else {
      return false
    }
  }
  checkeditmemberButton() {
    if (this.member_edit_form.valid == true) {
      return true
    }
    else {
      return false
    }
  }
  onEdit() {
    console.log(this.member_edit_form.value)
    if (this.member_edit_form.valid == true) {
      this.spinner.show()
      let new_list = {
        member_id: this.id_member,
        member_name: this.member_edit_form.controls['name'].value,
        member_lastname: this.member_edit_form.controls['lastname'].value,
        member_tel: this.member_edit_form.controls['tel'].value,
        member_address: this.member_edit_form.controls['address'].value,
        member_email: this.member_edit_form.controls['email'].value,
      }
      this.memberService.postEditMember(new_list).subscribe(async (rs) => {
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
          this.getallMember()
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
  createMember() {
    // let list = this.admin_create_form.value
    if (this.member_create_form.valid == true) {
      let new_list = {
        member_username: this.member_create_form.controls['username'].value,
        member_password: this.member_create_form.controls['password'].value,
        member_name: this.member_create_form.controls['name'].value,
        member_lastname: this.member_create_form.controls['lastname'].value,
        member_tel: this.member_create_form.controls['tel'].value,
        member_address: this.member_create_form.controls['address'].value,
        member_email: this.member_create_form.controls['email'].value,
      }
      this.memberService.postCreateMember(new_list).subscribe(async (rs) => {
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
          this.getallMember()
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
          member_id: id
        }
        this.spinner.show()
        this.memberService.postDeleteMember(params).subscribe(async (rs) => {
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
            this.getallMember()
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
  getallMember() {
    this.memberService.getallMemberdata().subscribe((rs) => {
      if (rs?.status == true) {
        this.master_member_all = rs.result
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

import { CryptlibService } from './../../../../services/crypt-lib.service';
import { LocalStorageService } from 'src/app/index/services/local-storage.service';
import { Component, ElementRef, ViewChild } from '@angular/core';
import Swal from 'sweetalert2';
import { NgxSpinnerService } from 'ngx-spinner';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs';
import { MasterdataService } from 'src/app/index/services/master-data.service';
import { EventService } from 'src/app/index/services/event.service';
@Component({
  selector: 'app-organizer-dashboard',
  templateUrl: './organizer-dashboard.component.html',
  styleUrls: ['./organizer-dashboard.component.scss']
})

export class OrganizerDashboardComponent {
  master_location: any
  reg_by_organizer_object: any
  filter_reg: any
  auth_id: any
  status_form: FormGroup
  create_register_running_event: FormGroup
  // update_register_running_event_Form: FormGroup
  image_upload: Array<any> = []
  previews: string[] = [];
  collapsed: boolean[] = []
  status_object_array = [
    {
      id: '06',
      value: '06',
      label: 'งานทั้งหมด'
    },
    {
      id: '01',
      value: '01',
      label: 'งานที่รอการอนุมัติ'
    },
    {
      id: '02',
      value: '02',
      label: 'งานที่อนุมัติเรียบร้อย'
    },
    {
      id: '03',
      value: '03',
      label: 'งานที่ไม่ผ่านเงื่อนไข'
    },
    {
      id: '04',
      value: '04',
      label: 'งานที่ถูกยกเลิก'
    },
    {
      id: '05',
      value: '05',
      label: 'งานที่เสร็จ'
    },
  ]
  mockData = [
    {
      reg_event_name: 'งานวิ่งเพื่อการกุศล',
      reg_event_due_date: '2024-05-30',
      reg_event_status: '01',
      reg_event_path_img: '../../../../assets/img/reg_by_organizer/5880559.jpg'
    }
  ]
  today: any
  perPage : any = 0
  totalRecord : number =0
  currentPage: number = 0
  @ViewChild('fileUpload', { static: true }) fileUpload!: ElementRef;
  constructor(
    private eventService: EventService,
    private localStorageService: LocalStorageService,
    private spinner: NgxSpinnerService,
    private modalService: NgbModal,
    private masterdataService: MasterdataService,
    private cryptlibService: CryptlibService
  ) {
    this.auth_id = this.localStorageService.getId()
    this.status_form = new FormGroup({
      status: new FormControl('06')
    })
    this.create_register_running_event = new FormGroup({
      reg_event_name: new FormControl('', [Validators.required]),
      reg_event_due_date: new FormControl(''),
      reg_event_price: new FormControl('', [Validators.required]),
      reg_event_amount: new FormControl('', [Validators.required]),
      reg_event_detail: new FormControl('', [Validators.required]),
      reg_event_distance: new FormControl('', [Validators.required]),
      // reg_event_path_img: new FormControl('', [Validators.required]),
      location_id: new FormControl(null, [Validators.required]),
    })
  }
  ngOnInit(): void {
    this.spinner.show()
    this.getEventRegister()
    this.getAllMasterLocation()
    this.today = new Date()
    setTimeout(() => {
      this.spinner.hide()
    }, 3000)
  }
  ngAfterViewInit(): void {
  }
  openModalCreate(modal: any) {
    this.modalService.open(modal, { size: 'lg' })
    this.create_register_running_event.reset()
  }
  openModalUpdate(modal: any, list: any) {
    this.modalService.open(modal, { size: 'lg' })
    this.create_register_running_event = new FormGroup({
      reg_event_id: new FormControl(list?.reg_event_id),
      reg_event_name: new FormControl(list?.reg_event_name, [Validators.required]),
      reg_event_due_date: new FormControl(list?.reg_event_due_date),
      reg_event_price: new FormControl(list?.reg_event_price, [Validators.required]),
      reg_event_amount: new FormControl(list?.reg_event_amount, [Validators.required]),
      reg_event_detail: new FormControl(list?.reg_event_detail, [Validators.required]),
      reg_event_distance: new FormControl(list?.reg_event_distance, [Validators.required]),
      // reg_event_path_img: new FormControl('', [Validators.required]),
      location_id: new FormControl(list?.location_id, [Validators.required]),
    })
  }
  formatNumber(x: any) {
    if (x) {
      x = x.toString()
      x = x.replace(/\D/g, "").replace(/\B(?=(\d{3})+(?!\d))/g, ",")
      return x;
    }
  }
  changePage(event: any) {
    this.currentPage = event
  }
  changeStatustotext(status: any) {
    if (status == '01') {
      return 'รอการอนุมัติ'
    }
    else if (status == '02') {
      return 'อนุมัติเรียบร้อย'
    }
    else if (status == '03') {
      return 'งานของคุณไม่ผ่านเงื่อนไข'
    }
    else if (status == '04') {
      return 'งานของคุณถูกยกเลิก'
    }
    else {
      return 'จบงาน'
    }
  }
  filterReg() {
    if (this.status_form.controls['status'].value != '06') {
      this.filter_reg = this.reg_by_organizer_object.filter((res: any) => res.status_code == this.status_form.controls['status'].value)
    }
    else {
      this.filter_reg = this.reg_by_organizer_object
    }
  }
  uploadFile(event: any): void {
    var selectedFiles = event.target.files;
    this.previews?.pop()
    this.image_upload?.pop()
    for (let k = 0; k < selectedFiles.length; k++) {
      if (selectedFiles[k].type == 'image/jpeg' || selectedFiles[k].type == 'image/png') {
        const reader = new FileReader();
        reader.onload = (e: any) => {
          this.previews.push(e.target.result);
        };
        reader.readAsDataURL(selectedFiles[k]);
        this.image_upload.push(selectedFiles[k])
      }
      else {
        Swal.fire({
          showCloseButton: true,
          showConfirmButton: false,
          icon: "error",
          // title: rs?.status_code,
          text: 'ประเภทไฟล์ไม่ถูกต้อง',
        });
      }
    }
    event.target.value = null
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
  getEventRegister() {
    this.eventService.getAllEventRegister({ page: 0, per_page: 5 }).subscribe((rs) => {
      if (rs?.status === true) {
        this.reg_by_organizer_object = rs.results
        this.filter_reg = rs.results
        this.totalRecord = rs.totalRecord
        this.perPage = rs.per_page
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
  getAllMasterLocation() {
    this.masterdataService.getAllMasterLocation().subscribe((rs) => {
      if (rs?.status == true) {
        this.master_location = rs.results
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
  checkupdateModal() {
    if (this.create_register_running_event.valid == true) {
      return true
    }
    else {
      return false
    }
  }
  checkcreateModal() {
    if (this.create_register_running_event.valid == true && this.image_upload?.length > 0) {
      return true
    }
    else {
      return false
    }
  }
  saveData() {
    try {
      this.spinner.show()
      const data = this.create_register_running_event
      let param = {
        name: data.controls['reg_event_name'].value,
        due_date: data.controls['reg_event_due_date'].value,
        price: data.controls['reg_event_price'].value,
        max_amount: data.controls['reg_event_amount'].value,
        detail: data.controls['reg_event_detail'].value,
        distance: data.controls['reg_event_distance'].value,
        path_image: '',
        location_id: data.controls['location_id'].value,
        auth_id: this.auth_id
      }
      this.eventService.postCreateEvent(param).subscribe((rs) => {
        if (rs?.status == true) {
          let id = this.cryptlibService.encryptText(String(rs?.result))
          console.log('id', id)
          this.eventService.postUploadFileEvent(this.image_upload, id).subscribe((rs) => {
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
              this.getEventRegister()
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

      setTimeout(() => {
        this.spinner.hide()
      }, 5000)
    }
    catch (e) {
      this.spinner.hide()
    }
  }
  postEditdataANDupdatestatusbeforereject() {
    this.spinner.show()
    let update = this.create_register_running_event
    let param = {
      reg_event_status: '03',
      reg_event_id: update?.controls['reg_event_id']?.value ? update?.controls['reg_event_id']?.value : null
    }
    let param_update = {
      reg_event_id: update?.controls['reg_event_id']?.value ? update?.controls['reg_event_id']?.value : null,
      reg_event_name: update?.controls['reg_event_name']?.value ? update?.controls['reg_event_name']?.value : null,
      reg_event_due_date: update?.controls['reg_event_due_date']?.value ? update?.controls['reg_event_due_date']?.value : null,
      reg_event_price: update?.controls['reg_event_price']?.value ? update?.controls['reg_event_price']?.value : null,
      reg_event_amount: update?.controls['reg_event_amount']?.value ? update?.controls['reg_event_amount']?.value : null,
      reg_event_detail: update?.controls['reg_event_detail']?.value ? update?.controls['reg_event_detail']?.value : null,
      reg_event_distance: update?.controls['reg_event_distance']?.value ? update?.controls['reg_event_distance']?.value : null,
      location_id: update?.controls['location_id']?.value ? update?.controls['location_id']?.value : null,
    }
    this.eventService.postUpdateregevent(param_update).subscribe((rs) => {
      if (rs?.status == true) {
        this.eventService.postUpdatestatusregevent(param).subscribe((rs) => {
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
            this.getEventRegister()
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
  postUpdatestatusregeventsuccess(reg_event_id: string) {
    Swal.fire({
      icon: "question",
      title: "งานวิ่งของคุณสำเร็จแล้วหรือไม่",
      showCancelButton: true,
      showCloseButton: true,
      confirmButtonText: "ตกลง",
      cancelButtonText: "ยกเลิก",
      confirmButtonColor: '#0d6efd',
      cancelButtonColor: '#dc3545',
    }).then((result) => {
      if (result.isConfirmed) {
        this.spinner.show()
        let param = {
          reg_event_status: '02',
          reg_event_id: reg_event_id
        }
        this.eventService.postUpdatestatusregevent(param).subscribe((rs) => {
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
            this.getEventRegister()
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
    })
  }
}

import { LocalStorageService } from 'src/app/index/services/local-storage.service';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { RegisterrunningeventService } from 'src/app/index/services/register-running-event.service';
import Swal from 'sweetalert2';
import { NgxSpinnerService } from 'ngx-spinner';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs';
import { MasterdataService } from 'src/app/index/services/master-data.service';
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
  image_upload: Array<any> = []
  previews: string[] = [];
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
  @ViewChild('fileUpload', { static: true }) fileUpload!: ElementRef;
  constructor(private register_running_event_Service: RegisterrunningeventService, private localStorageService: LocalStorageService, private spinner: NgxSpinnerService, private modalService: NgbModal,
    private masterdataService: MasterdataService) {
    this.auth_id = this.localStorageService.getId()
    this.status_form = new FormGroup({
      status: new FormControl('06')
    })
    this.create_register_running_event = new FormGroup({
      reg_event_name: new FormControl('', [Validators.required]),
      reg_event_price: new FormControl('', [Validators.required]),
      reg_event_amount: new FormControl('', [Validators.required]),
      reg_event_detail: new FormControl('', [Validators.required]),
      reg_event_distance: new FormControl('', [Validators.required]),
      // reg_event_path_img: new FormControl('', [Validators.required]),
      req_due_date: new FormControl('', [Validators.required]),
      location_id: new FormControl(null, [Validators.required]),
    })

  }
  ngOnInit(): void {
    this.spinner.show()
    this.getRegbyorganizer()
    this.getLocation()
    // this.filter_reg = this.reg_by_organizer_object
  }
  ngAfterViewInit(): void {
  }
  openModalCreate(modal: any) {
    this.modalService.open(modal, { size: 'lg' })
    this.create_register_running_event.reset()
  }
  formatNumber(x: any) {
    if (x) {
      x = x.toString()
      x = x.replace(/\D/g, "").replace(/\B(?=(\d{3})+(?!\d))/g, ",")
      return x;
    }
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
      this.filter_reg = this.reg_by_organizer_object.filter((res: any) => res.reg_event_status == this.status_form.controls['status'].value)
      console.log("this.filter_reg", this.filter_reg)
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
  checkcreateModal() {
    console.log("this.image_upload.length", this.image_upload?.length)
    console.log("this.create_register_running_event.valid", this.create_register_running_event.valid)
    if (this.create_register_running_event.valid == true && this.image_upload?.length > 0) {
      return true
    }
    else {
      return false
    }
  }
  getRegbyorganizer() {
    this.register_running_event_Service.getRegisterrunningeventOrganizer(this.auth_id).subscribe((rs) => {
      if (rs?.status == true) {
        this.reg_by_organizer_object = rs.result
        this.filter_reg = rs.result
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
  getLocation() {
    this.masterdataService.getLocation().subscribe((rs) => {
      if (rs?.status == true) {
        this.master_location = rs.result
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

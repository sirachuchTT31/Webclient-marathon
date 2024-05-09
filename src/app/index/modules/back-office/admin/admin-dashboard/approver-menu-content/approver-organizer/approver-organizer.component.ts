import { Component } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { LocalStorageService } from 'src/app/index/services/local-storage.service';
import { TaskApproverService } from 'src/app/index/services/task-approver.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-approver-organizer',
  templateUrl: './approver-organizer.component.html',
  styleUrls: ['./approver-organizer.component.scss']
})
export class ApproverOrganizerComponent {
  organizer_approver_list: any
  admin_id: any
  constructor(private taskService: TaskApproverService, private spinner: NgxSpinnerService, private localStorageService: LocalStorageService) {

  }
  ngOnInit(): void {
    this.getRegistereventbyapprover()
    //SET ADMIN ID
    this.admin_id = this.localStorageService?.getId()
  }
  ngAfterViewInit(): void {
    this.getRegistereventbyapprover()
  }
  updatestatusapprover(organ_id: string) {
    Swal.fire({
      title: "คุณต้องการอนุมัติใช่หรือไม่",
      text: "ถ้าบันทึกจะไม่สามารถกลับมาแก้ไขได้",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "บันทึก",
      cancelButtonText: 'ยกเลิก'
    }).then((result) => {
      if (result.isConfirmed) {
        this.spinner.show()
        let param = {
          organ_id: organ_id,
          status: 'Approver',
          reason: '',
          admin_id: this.admin_id
        }
        this.taskService.updateOrganizerbyapprover(param).subscribe((rs) => {
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
            this.getRegistereventbyapprover()
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
    });

  }
  updatestatusreject(organ_id: string) {
    let reason: string = ""
    Swal.fire({
      title: "คุณต้องการอนุมัติใช่หรือไม่",
      text: "ถ้าบันทึกจะไม่สามารถกลับมาแก้ไขได้",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "บันทึก",
      cancelButtonText: 'ยกเลิก',
      input: "textarea",
      inputPlaceholder: "ระบุเหตุผล",
      inputValue: reason,
      inputValidator: (value) => {
        return new Promise((resolve) => {
          if (value) {
            reason = value
            resolve()
          } else {
            resolve('กรุณาระบุเหตุผล')
          }
        })
      }
    }).then((result) => {
      if (result.isConfirmed) {
        this.spinner.show()
        // เหลือเพิ่มช่องเหตุผลใน UI
        let param = {
          organ_id: organ_id,
          status: 'RJ',
          reason: reason,
          admin_id: this.admin_id
        }
        this.taskService.updateOrganizerbyapprover(param).subscribe((rs) => {
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
            this.getRegistereventbyapprover()
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
    });

  }
  newDate(date: Date) {
    return new Date(date).toLocaleString('en-GB')
  }
  getRegistereventbyapprover() {
    console.log('test')
    this.taskService.getOrganizerbyapprover().subscribe((rs) => {
      if (rs?.status == true) {
        this.organizer_approver_list = rs.result
        console.log(' this.organizer_approver_list', this.organizer_approver_list)
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

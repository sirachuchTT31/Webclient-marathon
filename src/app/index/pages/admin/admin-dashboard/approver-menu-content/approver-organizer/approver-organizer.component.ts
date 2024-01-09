import { Component } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { TaskApproverService } from 'src/app/index/services/task-approver.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-approver-organizer',
  templateUrl: './approver-organizer.component.html',
  styleUrls: ['./approver-organizer.component.scss']
})
export class ApproverOrganizerComponent {
  reg_event_by_approver_list: any
  constructor(private taskService: TaskApproverService, private spinner: NgxSpinnerService,) {

  }
  ngOnInit(): void {
    this.getRegistereventbyapprover()
  }
  updatestatusapprover(trans_id: string) {
    Swal.fire({
      title: "คุณต้องการอนุมัติใช่หรือไม่",
      text: "ถ้าบันทึกจะไม่สามารถกลับมาแก้ไขได้",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "บันทึก",
      cancelButtonText : 'ยกเลิก'
    }).then((result) => {
      if (result.isConfirmed) {
        let param = {
          trans_id: trans_id
        }
        this.taskService.updateRegistereventbyapprover(param).subscribe((rs) => {
          if (rs?.status == true) {
            Swal.fire({
              showCloseButton: true,
              showConfirmButton: false,
              icon: "success",
              // title: rs?.status_code,
              timer: 3000,
              text: rs?.message,
            });
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
  getRegistereventbyapprover() {
    this.taskService.getRegistereventbyapprover().subscribe((rs) => {
      if (rs?.status == true) {
        this.reg_event_by_approver_list = rs.result
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

import { Component, SimpleChanges } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { BackOfficeService } from 'src/app/index/services/back-office.service';
import { LocalStorageService } from 'src/app/index/services/local-storage.service';
import { TaskApproverService } from 'src/app/index/services/task-approver.service';
import { updateEvent } from 'src/app/index/shared/interface/back-office';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-approver-running',
  templateUrl: './approver-running.component.html',
  styleUrls: ['./approver-running.component.scss'],
})
export class ApproverRunningComponent {
  dateRange: any
  config = {
    currentPage: 1,
    pageSize: 10,
    totalRecord: 0
  }
  constructor(
    private taskService: TaskApproverService,
    private spinner: NgxSpinnerService,
    private localStorageService: LocalStorageService,
    private backofficeService: BackOfficeService
  ) { }
  // register_event_by_approver: any
  eventNameSearch: string = ''
  eventAllList: any
  admin_id: any
  ngOnInit(): void {
    this.getAllJobEventBackoffice()
    //SET ADMIN ID
    this.admin_id = this.localStorageService?.getId()
  }
  ngOnChanges(changes: SimpleChanges): void {
    console.log(this.dateRange)
  }
  countIndex(pageSize: number, current_page: number, index: number) {
    return pageSize * (current_page - 1) + index;
  }

  changePage(event: any) {
    this.config.currentPage = event;
    this.getAllJobEventBackoffice()
  }

  updateEvent(data: updateEvent) {
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
        let param = {
          event_id: data.event_id,
          status: data.status
        }
        this.backofficeService.updateEventBackoffice(param).subscribe((rs) => {
          if (rs?.status == true) {
            Swal.fire({
              showCloseButton: true,
              showConfirmButton: false,
              icon: "success",
              // title: rs?.status_code,
              timer: 3000,
              text: rs?.message,
            });
            this.getAllJobEventBackoffice()
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

  clearEventSearch() {
    this.eventNameSearch = ''
  }

  onFilter() {
    this.getAllJobEventBackoffice(this.eventNameSearch, this.dateRange?.startDate, this.dateRange?.endDate)
  }


  getAllJobEventBackoffice(keyword?: string, startDate?: string, endDate?: string) {
    const cleanKeyword = keyword ? keyword : ''
    const cleanStartDate = startDate ? startDate : ''
    const cleanEndDate = endDate ? endDate : ''
    this.backofficeService.getAllJobEventBackoffice({ page: this.config.currentPage ? this.config.currentPage - 1 : 0, per_page: this.config.pageSize }, cleanKeyword, cleanStartDate, cleanEndDate).subscribe((rs) => {
      if (rs?.status === true) {
        this.eventAllList = rs?.results
      }
      else {
        this.eventAllList = null
      }
    })
  }

}

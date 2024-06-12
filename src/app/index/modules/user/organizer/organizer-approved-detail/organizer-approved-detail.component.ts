import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { Subscription } from 'rxjs';
import { CryptlibService } from 'src/app/index/services/crypt-lib.service';
import { EventService } from 'src/app/index/services/event.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-organizer-approved-detail',
  templateUrl: './organizer-approved-detail.component.html',
  styleUrls: ['./organizer-approved-detail.component.scss']
})
export class OrganizerApprovedDetailComponent {
  substcription !: Subscription
  listData: any
  queryParams: any
  config = {
    currentPage: 1,
    pageSize: 5,
    totalRecord: 0
  }
  eventName: string = ''
  constructor(
    private route: ActivatedRoute,
    private eventService: EventService,
    private spinner: NgxSpinnerService,
    private cryptlibService: CryptlibService,
  ) { }
  ngOnInit(): void {
    this.spinner.show()
    this.queryParams = this.route.snapshot.queryParams;
    if (!this.queryParams['clientName'] || !this.queryParams['clientId']) {
      window.location.href = 'user/organizer-dashboard'
    }
    if (this.queryParams['clientName']) {
      this.eventName = this.cryptlibService.decryptCipher(this.queryParams['clientName'])
    }
    this.getEventRegisterUserJoin()
    setTimeout(() => {
      this.spinner.hide()
    }, 3000)
  }
  ngOnDestroy(): void {
    this.substcription?.unsubscribe();
  }

  countIndex(pageSize: number, current_page: number, index: number) {
    return pageSize * (current_page - 1) + index;
  }

  changePage(event: any) {
    this.config.currentPage = event
    this.getEventRegisterUserJoin();
  }

  updateApprovedEventRegister(data: any, status: string) {
    console.log(data)
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
        const payload = {
          event_join_id: Number(data?.EventJoin?.id),
          status: status,
          user_id: Number(data?.user_id)
        }
        this.eventService.postUpdateApprovedEventRegister(payload).subscribe((rs) => {
          if (rs?.status === true) {
            Swal.fire({
              showCloseButton: true,
              showConfirmButton: false,
              icon: "success",
              timer: 3000,
              text: rs?.message,
            });
            this.getEventRegisterUserJoin()
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
      }
    })
  }

  getEventRegisterUserJoin() {
    let orginalText = ''
    if (this.queryParams['clientId']) {
      orginalText = this.cryptlibService.decryptCipher(this.queryParams['clientId'])
    }
    const event = this.eventService.getEventRegisterUserJoin({ page: this.config.currentPage ? this.config.currentPage - 1 : 0, per_page: 5 }, Number(orginalText)).subscribe((rs) => {
      if (rs?.status === true) {
        this.listData = rs.results;
        this.config.totalRecord = rs.total_record;
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
    this.substcription?.add(event)
  }

}

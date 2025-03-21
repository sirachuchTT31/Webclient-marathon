import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinnerService } from 'ngx-spinner';
import { Subscription } from 'rxjs';
import { ModalPaymentDetailComponent } from 'src/app/index/component/modal-payment-detail/modal-payment-detail.component';
import { StatusUserRegisterEvent } from 'src/app/index/constant/work-flow';
import { CryptlibService } from 'src/app/index/services/crypt-lib.service';
import { EventService } from 'src/app/index/services/event.service';
import { PaymentService } from 'src/app/index/services/payment.service';
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
    currentPage: 0,
    pageSize: 5,
    totalRecord: 0
  }
  eventName: string = ''
  workFlow = StatusUserRegisterEvent;
  constructor(
    private route: ActivatedRoute,
    private eventService: EventService,
    private spinner: NgxSpinnerService,
    private cryptlibService: CryptlibService,
    private paymentService: PaymentService,
    private modalService: NgbModal
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
    this.getListPayment()
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
    this.getListPayment();
  }

  openModal(payments: any[]) {
    const modalRef = this.modalService.open(ModalPaymentDetailComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.data = payments;
  }

  updateApprovedEventRegister(data: any, status: string) {
    let reason: string = ""
    if (status === '14') {
      Swal.fire({
        title: "คุณต้องการอนุมัติใช่หรือไม่",
        text: "ถ้าบันทึกจะไม่สามารถกลับมาแก้ไขได้",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "บันทึก",
        cancelButtonText: 'ยกเลิก',
      }).then((result) => {
        if (result.isConfirmed) {
          console.log(data);
          const payload = {
            event_join_id: Number(data?.EventJoin?.id),
            status: status,
            user_id: Number(data?.Users?.id),
            invoice_id: Number(data?.EventJoin?.Invoice?.id),
            reason: ''
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
              this.getListPayment()
              window.location.reload();
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
    else {
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
        inputValidator: (value: any) => {
          return new Promise((resolve) => {
            if (value) {
              reason = value
              resolve('')
            } else {
              resolve('กรุณาระบุเหตุผล')
            }
          })
        }
      }).then((result) => {
        if (result.isConfirmed) {
          const payload = {
            event_join_id: Number(data?.EventJoin?.id),
            status: status,
            user_id: Number(data?.user_id),
            reason: reason
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
              this.getListPayment()
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
  }

  getListPayment() {
    let orginalText = ''
    if (this.queryParams['clientId']) {
      orginalText = this.cryptlibService.decryptCipher(this.queryParams['clientId'])
    }
    const event = this.paymentService.getAllPayment({ page: this.config.currentPage ? this.config.currentPage : 1, per_page: 5, event_id: Number(orginalText) }).subscribe((rs) => {
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

import { Component, ElementRef, inject, Input, ViewChild } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import Swal from 'sweetalert2';
import { ETYPE_PAYMENT } from '../../constant/constant';
import { ICreatepayment } from '../../shared/interface/register-running-by-approver';
import { PaymentService } from '../../services/payment.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { LocalStorageService } from '../../services/local-storage.service';
import { CryptlibService } from '../../services/crypt-lib.service';

@Component({
  selector: 'app-modal-payment',
  templateUrl: './modal-payment.component.html',
  styleUrls: ['./modal-payment.component.scss']
})
export class ModalPaymentComponent {
  @ViewChild('fileUpload', { static: true }) fileUpload!: ElementRef;
  activeModal = inject(NgbActiveModal);
  @Input() data!: any;
  isPaymentCash: boolean = false;
  image_upload: Array<any> = []
  previews: string[] = [];

  constructor(
    private readonly paymentService: PaymentService,
    private spinner: NgxSpinnerService,
    private localStorageService: LocalStorageService,
    private cryptLibService: CryptlibService
  ) { }

  ngOnInit(): void {
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
          text: 'ประเภทไฟล์ไม่ถูกต้อง',
        });
      }
    }
    console.log(this.previews)
    event.target.value = null
  }

  handleSubmit() {
    const invoiceParse = this.data.EventJoin?.Invoice?.invoice_detail
      ? JSON.parse(this.data.EventJoin?.Invoice?.invoice_detail)
      : null;
    const body: ICreatepayment = {
      event_id: parseInt(this.data?.EventJoin?.Event?.id),
      invoice_id: parseInt(this.data.EventJoin?.Invoice?.id),
      type_payment: this.isPaymentCash ? ETYPE_PAYMENT.CASH : ETYPE_PAYMENT.ONLINE,
      event_join_id: parseInt(this.data.EventJoin?.id),
      total_price: parseFloat(invoiceParse.price),
      user_id: this.cryptLibService.decryptCipher(this.localStorageService.getId() ?? '')
    };

    try {
      this.spinner.show();
      this.paymentService.postCreatePayment(body)
        .subscribe((result) => {
          console.log(result);
          if (result?.status) {
            if (!this.isPaymentCash) {
              this.paymentService.postUploadFilePayment(this.image_upload, result?.result?.id)
                .subscribe((upload) => {
                  if (upload?.status) {
                    Swal.fire({
                      showCloseButton: true,
                      showConfirmButton: false,
                      icon: "success",
                      timer: 3000,
                      text: upload?.message,
                    });
                  } else {
                    Swal.fire({
                      showCloseButton: true,
                      showConfirmButton: false,
                      icon: "error",
                      text: upload?.message,
                    });
                  }
                })
            } else {
              Swal.fire({
                showCloseButton: true,
                showConfirmButton: false,
                icon: "success",
                timer: 3000,
                text: result?.message,
              });
            }
          } else {
            Swal.fire({
              showCloseButton: true,
              showConfirmButton: false,
              icon: "error",
              text: result?.message,
            });
          }
        });
    } catch (error) {
      console.log(error)
    } finally {
      this.spinner.hide();
      this.activeModal.close();
    }
  }
}

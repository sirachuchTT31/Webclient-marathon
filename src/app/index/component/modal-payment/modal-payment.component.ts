import { Component, ElementRef, inject, Input, ViewChild } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-modal-payment',
  templateUrl: './modal-payment.component.html',
  styleUrls: ['./modal-payment.component.scss']
})
export class ModalPaymentComponent {
  @ViewChild('fileUpload', { static: true }) fileUpload!: ElementRef;
  activeModal = inject(NgbActiveModal);
  image_upload: Array<any> = []
  previews: string[] = [];
  // @Input() name: string;

  uploadFile(event: any): void {
    var selectedFiles = event.target.files;
    this.previews?.pop()
    this.image_upload?.pop()
    for (let k = 0; k < selectedFiles.length; k++) {
      if (selectedFiles[k].type == 'image/jpeg' || selectedFiles[k].type == 'image/png') {
        console.log(selectedFiles[k])
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
}

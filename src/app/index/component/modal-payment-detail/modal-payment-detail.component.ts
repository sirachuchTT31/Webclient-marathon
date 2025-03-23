import { Component, inject, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-modal-payment-detail',
  templateUrl: './modal-payment-detail.component.html',
  styleUrls: ['./modal-payment-detail.component.scss']
})
export class ModalPaymentDetailComponent implements OnInit {

  @Input() data: any;
  activeModal = inject(NgbActiveModal)

  ngOnInit(): void {
    console.log(this.data);
  }

}

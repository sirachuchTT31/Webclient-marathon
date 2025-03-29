import { Component, inject, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-modal-invoice',
  templateUrl: './modal-invoice.component.html',
  styleUrls: ['./modal-invoice.component.scss']
})
export class ModalInvoiceComponent {
  @Input() data: any
  activeModal = inject(NgbActiveModal)
}

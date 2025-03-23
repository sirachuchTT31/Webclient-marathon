import { Component, inject, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-modal-recipt',
  templateUrl: './modal-recipt.component.html',
  styleUrls: ['./modal-recipt.component.scss']
})
export class ModalReciptComponent {
  @Input() data: any
  activeModal = inject(NgbActiveModal)
}

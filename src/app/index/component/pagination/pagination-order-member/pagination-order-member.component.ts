import { ChangeDetectorRef, Component, EventEmitter, Input, Output, SimpleChanges, ViewChild, inject } from '@angular/core';
import { StatusEvent, StatusUserRegisterEvent } from 'src/app/index/constant/work-flow';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalPaymentComponent } from '../../modal-payment/modal-payment.component';
import { UtilCovert } from 'src/app/index/utils/util-covert';
import { ModalReciptComponent } from '../../modal-recipt/modal-recipt.component';
import { ModalInvoiceComponent } from '../../modal-invoice/modal-invoice.component';

@Component({
  selector: 'app-pagination-order-member',
  templateUrl: './pagination-order-member.component.html',
  styleUrls: ['./pagination-order-member.component.scss']
})
export class PaginationOrderMemberComponent {
  private modalService = inject(NgbModal);
  private utilCovert = new UtilCovert();
  amount = 1000;
  payer = 'John Doe';
  date = '2025-03-21';
  paymentNumber = '123456789';
  event = 'Fun Run';
  quantity = 1;
  constructor(public cdr: ChangeDetectorRef) { }
  @Input() paginationConfig = {
    pageSize: 0,
    totalRecord: 0
  }
  config: any = {
    currentPage: 0,
    pageSize: 0,
    totalRecord: 0
  }
  @Input() data: any
  @Output() currentPage = new EventEmitter<number>();
  workFlow = StatusUserRegisterEvent;
  eventWorkflow = StatusEvent;
  ngOnInit(): void {
    this.config = {
      currentPage: this.config.currentPage,
      pageSize: this.paginationConfig?.pageSize,
      totalRecord: this.paginationConfig?.totalRecord
    }
  }
  ngOnChanges(changes: SimpleChanges): void {
    const data = changes['data']?.currentValue;
    const pagination = changes['paginationConfig']?.currentValue;
    if (data?.results) {
      this.data = data;
    }
    if (pagination) {
      this.config = {
        currentPage: 1,
        pageSize: this.paginationConfig?.pageSize,
        totalRecord: pagination.totalRecord
      }
    }
    this.cdr.detectChanges();
  }
  countIndex(pageSize: number, current_page: number, index: number) {
    return pageSize * (current_page - 1) + index;
  }
  changePage(event: any) {
    this.config.currentPage = event.pageIndex;
    this.currentPage.emit(event.pageIndex)
  }

  openModal(data: any) {
    const modalRef = this.modalService.open(ModalPaymentComponent, {
      size: "lg",
      centered: true,
      backdrop: "static",
      keyboard: false,
    });
    modalRef.componentInstance.data = data;
  }

  openModalInvoice(data: any) {
    const modalRef = this.modalService.open(ModalInvoiceComponent, {
      size: "lg",
      centered: true,
      backdrop: "static",
      keyboard: false,
    })
    modalRef.componentInstance.data = data;
  }

  openModalRecipt(data: any) {
    const modalRef = this.modalService.open(ModalReciptComponent, {
      size: "lg",
      centered: true,
      backdrop: "static",
      keyboard: false,
    });
    modalRef.componentInstance.data = data;
  }

  covertJSON(data: any): any {
    return this.utilCovert.jsonCovertObject(data);
  }
}

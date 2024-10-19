import { ChangeDetectorRef, Component, EventEmitter, Input, Output, SimpleChanges, inject } from '@angular/core';
import { StatusUserRegisterEvent } from 'src/app/index/constant/work-flow';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalPaymentComponent } from '../../modal-payment/modal-payment.component';
import { UtilCovert } from 'src/app/index/utils/util-covert';

@Component({
  selector: 'app-pagination-order-member',
  templateUrl: './pagination-order-member.component.html',
  styleUrls: ['./pagination-order-member.component.scss']
})
export class PaginationOrderMemberComponent {
  private modalService = inject(NgbModal);
  private utilCovert = new UtilCovert();
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
  workFlow = StatusUserRegisterEvent
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
    this.config.currentPage = event
    this.currentPage.emit(event)
  }

  openModal() {
    const modalRef = this.modalService.open(ModalPaymentComponent, {
      size: "lg",
      centered: true,
      backdrop: "static",
      keyboard: false,
    });
  }

  covertJSON(data: any) : any {
    return this.utilCovert.jsonCovertObject(data);
  }
}

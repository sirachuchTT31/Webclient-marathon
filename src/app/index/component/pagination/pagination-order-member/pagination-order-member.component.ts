import { ChangeDetectorRef, Component, EventEmitter, Input, Output, SimpleChanges } from '@angular/core';
import { StatusUserRegisterEvent } from 'src/app/index/constant/work-flow';

@Component({
  selector: 'app-pagination-order-member',
  templateUrl: './pagination-order-member.component.html',
  styleUrls: ['./pagination-order-member.component.scss']
})
export class PaginationOrderMemberComponent {
  constructor(public cdr : ChangeDetectorRef){}
  @Input() paginationConfig = {
    pageSize: 0,
    totalRecord: 0
  }
  config : any = {
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
}

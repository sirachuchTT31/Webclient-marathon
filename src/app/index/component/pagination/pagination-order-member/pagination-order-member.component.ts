import { Component, EventEmitter, Input, Output, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-pagination-order-member',
  templateUrl: './pagination-order-member.component.html',
  styleUrls: ['./pagination-order-member.component.scss']
})
export class PaginationOrderMemberComponent {
  @Input() paginationConfig = {
    pageSize: 0,
    totalRecord: 0
  }
  config = {
    currentPage: 0,
    pageSize: 0,
    totalRecord: 0
  }
  @Input() data: any
  @Output() currentPage = new EventEmitter<number>();
  ngOnInit(): void {
    this.config = {
      currentPage : 1,
      pageSize : this.paginationConfig?.pageSize,
      totalRecord : this.paginationConfig?.totalRecord
    }
  }
  ngOnChanges(changes: SimpleChanges): void {
    this.data = changes['data']?.currentValue
  }
  countIndex(pageSize: number, current_page: number, index: number) {
    return pageSize * (current_page - 1) + index;
  }
  changePage(event: any) {
    this.config.currentPage = event
    this.currentPage.emit(event)
  }
}

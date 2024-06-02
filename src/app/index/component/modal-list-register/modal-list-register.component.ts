import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { EventService } from '../../services/event.service';
import { NgxSpinnerService } from 'ngx-spinner';
import Swal from 'sweetalert2';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-modal-list-register',
  templateUrl: './modal-list-register.component.html',
  styleUrls: ['./modal-list-register.component.scss']
})
export class ModalListRegisterComponent {
  substcription !: Subscription
  listData : any
  config = {
    currentPage: 1,
    pageSize: 5,
    totalRecord: 0
  }
  constructor(
    private eventService: EventService,
    private spinner: NgxSpinnerService,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) { }

  ngOnInit(): void {
    console.log("🚀 ~ ModalListRegisterComponent ~ data:", this.data)
    this.spinner.show();
    this.getEventRegisterUserJoin()
    setTimeout(() => {
      this.spinner.hide()
    },5000)
    console.log(this.listData)
  }

  ngOnDestroy(): void {
    this.substcription?.unsubscribe();
  }

  countIndex(pageSize: number, current_page: number, index: number) {
    return pageSize * (current_page - 1) + index;
  }

  changePage(event: any) {
    this.config.currentPage = event
    this.getEventRegisterUserJoin(event - 1);
  }

  getEventRegisterUserJoin(page?: number) {
    const event = this.eventService.getEventRegisterUserJoin({ page: page ? page : 0, per_page: 5 }, this.data?.id).subscribe((rs) => {
      if (rs?.status === true) {
        this.listData = rs.results;
        this.config.totalRecord = rs.total_record;
        this.config.pageSize = rs.per_page;
      }
      else {
        this.spinner.hide()
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

import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { Subscription } from 'rxjs';
import { CryptlibService } from 'src/app/index/services/crypt-lib.service';
import { EventService } from 'src/app/index/services/event.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-organizer-approved-detail',
  templateUrl: './organizer-approved-detail.component.html',
  styleUrls: ['./organizer-approved-detail.component.scss']
})
export class OrganizerApprovedDetailComponent {
  substcription !: Subscription
  listData: any
  queryParams: any
  config = {
    currentPage: 1,
    pageSize: 5,
    totalRecord: 0
  }
  eventName: string = ''
  constructor(
    private route: ActivatedRoute,
    private eventService: EventService,
    private spinner: NgxSpinnerService,
    private cryptlibService: CryptlibService,
  ) { }
  ngOnInit(): void {
    this.spinner.show()
    this.queryParams = this.route.snapshot.queryParams;
    if (!this.queryParams['clientName'] || !this.queryParams['clientId']) {
      window.location.href = 'user/organizer-dashboard'
    }
    if (this.queryParams['clientName']) {
      this.eventName = this.cryptlibService.decryptCipher(this.queryParams['clientName'])
    }
    this.getEventRegisterUserJoin()
    setTimeout(() => {
      this.spinner.hide()
    }, 3000)
  }
  ngOnDestroy(): void {
    this.substcription?.unsubscribe();
  }

  countIndex(pageSize: number, current_page: number, index: number) {
    return pageSize * (current_page - 1) + index;
  }

  changePage(event: any) {
    this.config.currentPage = event
    this.getEventRegisterUserJoin();
  }

  getEventRegisterUserJoin() {
    let orginalText = ''
    if (this.queryParams['clientId']) {
      orginalText = this.cryptlibService.decryptCipher(this.queryParams['clientId'])
    }
    const event = this.eventService.getEventRegisterUserJoin({ page: this.config.currentPage ? this.config.currentPage - 1 : 0, per_page: 5 }, Number(orginalText)).subscribe((rs) => {
      if (rs?.status === true) {
        this.listData = rs.results;
        this.config.totalRecord = rs.total_record;
      }
      else {
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

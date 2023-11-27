import { Component } from '@angular/core';
import { MasterdataService } from 'src/app/index/services/master-data.service';
import { NgxSpinnerService } from 'ngx-spinner';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-admin-content',
  templateUrl: './admin-content.component.html',
  styleUrls: ['./admin-content.component.scss']
})
export class AdminContentComponent {
  constructor(private masterdataService: MasterdataService,private spinner : NgxSpinnerService) { }
  master_admin_all: any
  ngOnInit(): void {
    this.spinner.show()
    this.getallAdmindata()
  }

  getallAdmindata() {
    this.masterdataService.getallAdmindata().subscribe((rs) => {
      if (rs?.status == true) {
        this.master_admin_all = rs.result
        this.spinner.hide()
      }
      else {
        this.spinner.hide()
        Swal.fire({
          showCloseButton: true,
          showConfirmButton: false,
          icon: "error",
          // title: rs?.status_code,
          text: rs?.message,
        });
      }
    })
  }
}

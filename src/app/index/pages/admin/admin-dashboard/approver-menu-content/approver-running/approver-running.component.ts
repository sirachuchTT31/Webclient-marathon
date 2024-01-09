import { Component } from '@angular/core';
import { TaskApproverService } from 'src/app/index/services/task-approver.service';

@Component({
  selector: 'app-approver-running',
  templateUrl: './approver-running.component.html',
  styleUrls: ['./approver-running.component.scss']
})
export class ApproverRunningComponent {
  constructor(private approverService: TaskApproverService) { }
  register_event_by_approver: any
  ngOnInit(): void {
    this.getRegbyApprover()
  }

  getRegbyApprover() {
    this.approverService.getRegistereventbyapprover().subscribe((rs) => {
      if (rs?.status == true) {
        this.register_event_by_approver = rs.result
      }
      else {

      }
    })
  }
}

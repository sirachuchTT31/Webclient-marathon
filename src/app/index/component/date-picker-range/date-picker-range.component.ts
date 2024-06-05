import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import * as moment from 'moment';

@Component({
  selector: 'app-date-picker-range',
  templateUrl: './date-picker-range.component.html',
  styleUrls: ['./date-picker-range.component.scss'],
})
export class DatePickerRangeComponent {
  InitForm: FormGroup

  @Output() currentPage = new EventEmitter<{ startDate: any, endDate: any }>();
  constructor(private _fb: FormBuilder) {
    this.InitForm = this._fb.group({
      start: '',
      end: ''
    })
  }

  cleanGMT(dateGMT: any) {
    const date = moment(dateGMT).locale("th").format('DD-MM-YYYY');
    return date
  }

  setDate() {
    let start = this.cleanGMT(this.InitForm.get('start')?.value)
    let end = this.cleanGMT(this.InitForm.get('end')?.value,)
    this.currentPage.emit(
      {
        startDate: start,
        endDate: end,
      }
    )
  }
  

  clearDate() {
    this.InitForm.reset()
  }
}

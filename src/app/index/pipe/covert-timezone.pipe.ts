import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment';

@Pipe({
  name: 'covertTimezone'
})
export class CovertTimezonePipe implements PipeTransform {

  transform(value: string | Date, format: string = 'YYYY-MM-DD HH:mm:ss'): string  {
    if(!value) return '';


    return moment(value).utcOffset(7).locale('th').format('LLLL');
  }

}

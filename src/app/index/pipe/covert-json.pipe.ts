import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'covertJson'
})
export class CovertJsonPipe implements PipeTransform {

  transform(value:any): unknown {
    if(!value) return '';
    return JSON.parse(value);
  }

}

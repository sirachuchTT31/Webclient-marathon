import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'covertJson'
})
export class CovertJsonPipe implements PipeTransform {

  transform(value: string | object | null): any {
    if (!value) return null;
    return typeof value === 'string' ? JSON.parse(value) : value;
  }

}

import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'beautyNumber'
})
export class BeautyNumberPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    return null;
  }

}

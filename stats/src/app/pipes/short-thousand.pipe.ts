import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'shortThousand'
})
export class ShortThousandPipe implements PipeTransform {

  transform(value: any): any {
    const negativeValue = value < 0;
    value = `${Math.abs(value)}`;
    let thousands = value.length / 3;

    if (thousands == Math.floor(thousands)) {
      thousands -= 1;
    }

    thousands = Math.floor(thousands);

    let string = thousands > 0 ? `${value.slice(0, -3 * thousands)}${'k'.repeat(thousands)}` : value;
    return negativeValue ? `-${string}` : string;
  }

}

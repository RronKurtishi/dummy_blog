import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'paragraphcase',
  standalone: true
})
export class ParagraphCasePipe implements PipeTransform {
  transform(value: unknown, ...args: unknown[]): unknown {
    if (typeof value !== 'string') {
      return value;
    }
    return value.charAt(0).toUpperCase() + value.slice(1);
  }
}

import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'replaceUppercase',
  standalone: true,
})
export class ReplaceUppercasePipe implements PipeTransform {
  transform(value: string, replacement: string = '*'): string {
    let newValue: string = '';
    for (let i = 0; i < value.length; i++) {
      let char = value.charAt(i);
      if (/[A-Z]/.test(char)) {
        char = ' ' + char;
      }
      newValue = newValue + char;
    }
    return newValue;
  }
}

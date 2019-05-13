import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'removeSplChar'
})
export class RemoveSpecialCharPipe implements PipeTransform {
    transform(value: string, regX?: any, replaceVal?: string, isReplaceOnce?: boolean): any {
        if (value) {
            regX = (regX && regX.length > 0) ? regX : '_';
            replaceVal = (replaceVal && replaceVal.length > 0) ? replaceVal : ' ';
            return value.replace(new RegExp(regX, isReplaceOnce ? '' : 'g'), replaceVal);
        }
    }
}

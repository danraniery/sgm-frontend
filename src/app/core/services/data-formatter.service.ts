import {Injectable} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';

@Injectable({
    providedIn: 'root'
})
export class DataFormatterService {

    constructor() {
    }

    public checkEmptySpacesByFormGroupAndFieldName(formGroup: FormGroup | any, fieldName: string, event: any) {
        const formControl = this.checkEmptySpacesInFormControl(formGroup.get([fieldName]), event);
        formGroup.get([fieldName]).setValue(formControl.value);
        return formGroup;
    }

    public removeEmptySpacesByFormGroupAndFieldName(formGroup: FormGroup | any, fieldName: string) {
        const formControl = this.removeEmptySpacesInFormControl(formGroup.get([fieldName]));
        formGroup.get([fieldName]).setValue(formControl.value);
        return formGroup;
    }

    public checkEmptySpacesInFormControl(formControl: FormControl, event: any): FormControl {
        if (event.key === ' ' && !formControl.value) {
            event.preventDefault();
        } else {
            if (event.key === ' ') {
                const value = formControl.value.toString();
                if (value.substring(0, 1) === ' ') {
                    formControl.setValue(value.substring(1, value.length));
                } else {
                    formControl.setValue(value.replace('  ', ' '));
                }
            }
        }
        return formControl;
    }

    public removeEmptySpacesInFormControl(formControl: FormControl): FormControl {
        if (formControl.value) {
            formControl.setValue(formControl.value.toString().trim());
        }
        return formControl;
    }

}

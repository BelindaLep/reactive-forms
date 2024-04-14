import { AbstractControl, ValidatorFn, ValidationErrors } from '@angular/forms';

export function experienceValidator(digitsAfterComma: number): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
        const value = control.value;
        const regex = new RegExp(`^\\d+(\\.\\d{1,${digitsAfterComma}})?$`);  
        const isValid = regex.test(value);   
        
        return !isValid ? {experienceValid: false}: null;
    };
}

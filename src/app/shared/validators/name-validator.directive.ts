import { AbstractControl } from '@angular/forms';

export const nameValidator = (
  control: AbstractControl
): { [key: string]: any } | null => {
  const valid = /^[A-Za-z]+$/.test(control.value);
  return valid ? null : { invalidName: { valid: false, value: control.value } };
};

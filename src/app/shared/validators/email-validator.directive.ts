import { AbstractControl } from '@angular/forms';

export const emailValidator = (
  control: AbstractControl
): { [key: string]: any } | null => {
  const valid = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(
    control.value
  );
  return valid
    ? null
    : { invalidEmail: { valid: false, value: control.value } };
};

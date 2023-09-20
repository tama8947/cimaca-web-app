import { type FormikTouched } from 'formik';
import { type FormikInstance, type ModuleFormData } from '../../types/forgot-password.types';

type NameInput = keyof FormikTouched<ModuleFormData>;

export const focusOnError = (params: ParamsFocusErrorFunction<FormikInstance>) => {
  const { formikInstance } = params;
  if (formikInstance?.isSubmitting ?? false) {
    const inputs = document.querySelectorAll<HTMLInputElement>('.inputfocus');
    for (const input of Array.from(inputs)) {
      if (formikInstance?.errors[input.name as NameInput] !== undefined) {
        input.focus();
        return;
      }
    }
  }
};

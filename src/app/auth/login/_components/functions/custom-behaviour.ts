import { type FormikTouched } from 'formik';
import { type FormikInstanceLogin, type TypeLoginData } from '../../types/login-types';

type NameInput = keyof FormikTouched<TypeLoginData>;
interface ParamsFocusErrorFunction {
  formikInstance?: FormikInstanceLogin
  messageError?: string
}
export const focusOnError = (params: ParamsFocusErrorFunction) => {
  const { formikInstance, messageError } = params;
  if (formikInstance?.isSubmitting ?? false) {
    const inputs = document.querySelectorAll<HTMLInputElement>('.inputfocus');
    for (const input of Array.from(inputs)) {
      if (formikInstance?.errors[input.name as NameInput] !== undefined) {
        input.focus();
        return;
      }
    }
  }

  if (messageError?.includes('No existe el usuario ingresado') ?? false) {
    setTimeout(() =>
      document.querySelector<HTMLInputElement>('#email')?.focus(), 100
    );
  }

  if (messageError?.includes('Contraseña Incorrecta') ?? false) {
    setTimeout(() =>
      document.querySelector<HTMLInputElement>('#password')?.focus(), 100
    );
  }
};

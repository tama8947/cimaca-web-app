import { type FormikTouched } from 'formik';
import { redirect } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { useEffect } from 'react';
import { type FormikInstance, type ModuleFormData } from '../../types/login-types';

type NameInput = keyof FormikTouched<ModuleFormData>;

export const focusOnError = (params: ParamsFocusErrorFunction<FormikInstance>) => {
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

export const useCustomRedirectCardLogin = () => {
  const { status } = useSession();
  useEffect(() => {
    if (status === 'authenticated') {
      redirect('/dashboard');
    }
  }, [status]);
};

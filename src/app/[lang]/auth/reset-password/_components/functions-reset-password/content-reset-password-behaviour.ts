import axios from 'axios';
import { type FormikTouched } from 'formik';
import { useRouter, useSearchParams } from 'next/navigation';
import { useContext, useState } from 'react';
import { routes } from '../../types/metadata';
import {
  type FormikInstance,
  type ModuleFormData
} from '../../types/reset-password-types';
import { NotificationContext } from '@/components/layouts/app-layout/contexts/custom-context';

type NameInput = keyof FormikTouched<ModuleFormData>;

export const focusOnError = (
  params: ParamsFocusErrorFunction<FormikInstance>
) => {
  const { formikInstance } = params;
  if (formikInstance?.isSubmitting ?? false) {
    const inputs = document.querySelectorAll<HTMLInputElement>('.inputfocus');
    const stateFocus = { focused: false };
    for (const input of Array.from(inputs)) {
      if (
        formikInstance?.errors[input.name as NameInput] !== undefined &&
        !stateFocus.focused
      ) {
        input.focus();
        stateFocus.focused = true;
        return;
      }
    }
    stateFocus.focused = false;
  }
};

export const useRedirectTokenValidation = () => {
  const [loaded, setLoaded] = useState(false);

  const searchParams = useSearchParams();

  const toast = useContext(NotificationContext);

  const router = useRouter();

  if (!loaded) setLoaded(true);
  else return;

  if (searchParams.get('token') === null || searchParams.get('token') === '') {
    toast?.current?.show({
      summary  : 'Error',
      detail   : 'Url de validación incorrecta.',
      severity : 'error'
    });
    if (typeof location !== 'undefined') router.push('/auth/login');
    return;
  }

  axios
    .post<string>(
    routes.resetPassword,
    {},
    {
      headers: {
        Authorization  : `Bearer ${searchParams.get('token')}`,
        OnlyValidation : 'true'
      }
    }
  )
    .catch((error) => {
      toast?.current?.show({
        summary  : 'Error',
        detail   : error.response.data,
        severity : 'error'
      });

      if (typeof location !== 'undefined') router.push('/auth/login');
    });
};

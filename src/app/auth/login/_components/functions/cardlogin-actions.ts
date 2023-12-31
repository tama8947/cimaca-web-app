import { type AppRouterInstance } from 'next/dist/shared/lib/app-router-context';
import { signIn } from 'next-auth/react';
import { type Toast } from 'primereact/toast';
import { type Dispatch, type MutableRefObject, type SetStateAction } from 'react';
import { type TypeLoginData } from '../../types/login-types';
import { focusOnError } from './custom-behaviour';

interface SubmitActionFunction {
  setLoading: Dispatch<SetStateAction<boolean>>
  data: TypeLoginData
  router: AppRouterInstance
  toast: MutableRefObject<Toast | null> | undefined
}

export const submitAction = async ({
  setLoading,
  data,
  router,
  toast
}: SubmitActionFunction) => {
  setLoading(true);
  await signIn('credentials', { ...data, redirect: false }).then((res) => {
    res?.error &&
      toast?.current?.show({
        summary  : 'Error',
        detail   : res.error,
        severity : 'error'
      });
    res?.error && focusOnError({ messageError: res.error });
    !res?.error &&
      toast?.current?.show({
        summary  : 'Sesión Iniciada',
        detail   : 'Inicio de sesión exitoso',
        severity : 'success'
      });
    !res?.error && router.push('/dashboard');
    setLoading(false);
  });
};

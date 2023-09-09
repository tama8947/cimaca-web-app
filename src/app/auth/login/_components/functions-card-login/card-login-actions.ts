import { type AppRouterInstance } from 'next/dist/shared/lib/app-router-context';
import { signIn } from 'next-auth/react';
import { type Toast } from 'primereact/toast';
import {
  type Dispatch,
  type MutableRefObject,
  type SetStateAction
} from 'react';
import { type TypeLoginData } from '../../types/login-types';
import { focusOnError } from './card-login-behaviour';

interface SubmitActionFunction {
  setLoading: Dispatch<SetStateAction<boolean>>
  data: TypeLoginData
  router: AppRouterInstance
  toast: MutableRefObject<Toast | null> | undefined
}

export const submitAction = ({
  setLoading,
  data,
  router,
  toast
}: SubmitActionFunction) => {
  setLoading(true);
  signIn('credentials', { ...data, redirect: false })
    .then((res) => {
      if (res?.error !== undefined && res.error !== null) {
        toast?.current?.show?.({
          summary  : 'Error',
          detail   : res.error,
          severity : 'error'
        });

        focusOnError({ messageError: res.error });
      } else {
        toast?.current?.show?.({
          summary  : 'Sesión Iniciada',
          detail   : 'Inicio de sesión exitoso',
          severity : 'success'
        });

        router.push('/dashboard');
      }
      setLoading(false);
    })
    .catch((error) => {
      console.log(error);
    });
};

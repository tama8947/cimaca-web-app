import { signIn } from 'next-auth/react';
import { type ModuleFormData } from '../../types/login-types';
import { focusOnError } from './content-content-behaviour';

export const submitAction = ({
  setLoading,
  data,
  router,
  toast
}: SubmitAuthActionFunction<ModuleFormData>) => {
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
      console.error(error);
    });
};

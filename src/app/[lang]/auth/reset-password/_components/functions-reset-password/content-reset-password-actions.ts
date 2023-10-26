import axios from 'axios';
import { routes } from '../../types/metadata';
import { type ModuleFormData } from '../../types/reset-password-types';

export const submitAction = ({
  setLoading,
  data,
  router,
  toast,
  token
}: SubmitAuthActionFunction<ModuleFormData>) => {
  setLoading(true);

  axios
    .post<string>(routes.resetPassword, data, {
    headers: { Authorization: `Bearer ${token}` }
  })
    .then((res) => {
      toast?.current?.show({
        summary  : 'Contraseña Actualizada',
        detail   : res.data,
        severity : 'success'
      });
      router.push('/auth/login');
      setLoading(false);
    })
    .catch((err: AxiosErrorResponse) => {
      console.error(err.response);
      toast?.current?.show({
        summary  : 'Error',
        detail   : err.response.data,
        severity : 'error'
      });
      setLoading(false);
    });
};

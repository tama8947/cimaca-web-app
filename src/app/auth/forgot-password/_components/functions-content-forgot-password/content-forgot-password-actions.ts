import axios from 'axios';
import { type ModuleFormData } from '../../types/forgot-password.types';
import { routes } from '../../types/metadata';

export const submitAction = ({
  setLoading,
  data,
  router,
  toast
}: SubmitAuthActionFunction<ModuleFormData>) => {
  setLoading(true);

  axios
    .post<string>(routes.requestRecoveryUrl, data)
    .then((res) => {
      toast?.current?.show({
        summary  : 'Información Correcta',
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

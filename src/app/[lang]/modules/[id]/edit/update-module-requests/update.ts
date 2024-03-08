import axios from 'axios';
import { useRouter } from 'next/navigation';
import { useContext } from 'react';
import { useMutation } from 'react-query';
import { redirectionOnCreateOrUpdate, singularName } from '../../../metadata';
import { type ModuleUpdateData } from '../update-module-form-config/schema';
import { NotificationContext } from '@/components/layouts/app-layout/contexts/custom-context';

type TypeModule = ModuleUpdateData;

const requestUpdate = async (data: TypeModule) => {
  return (await axios.post('/api/modules/modules/update', data)).data;
};

export const useUpdateModule = () => {
  const router = useRouter();
  const toast = useContext(NotificationContext);

  const mutation = useMutation({
    mutationFn : requestUpdate,
    onSuccess  : () => {
      toast?.current?.show(
        {
          severity : 'success',
          summary  : `${singularName} creado`,
          detail   : `El ${singularName} se ha creado correctamente`
        }
      );
      router.push(redirectionOnCreateOrUpdate);
    },
    onError: (error: AxiosErrorResponse) => {
      if (error.response.data === '') {
        toast?.current?.show({
          severity : 'error',
          summary  : `Error creando ${singularName}`,
          detail   : error.message
        });
      } else {
        toast?.current?.show({
          severity : 'error',
          summary  : `Error creando ${singularName}`,
          detail   : error.response.data
        });
      }
    }
  });
  return { update: mutation.mutate as (data: TypeModule) => Promise<void> };
};

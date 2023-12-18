import axios from 'axios';
import { useSession } from 'next-auth/react';
import { useQuery } from 'react-query';
import { type RolesType } from '@/global-types/permissions-types';

export type ModuleData = {
  created_at: Date
  icon: string
  id: string
  label: string
  name: string
  parent_id: null
  updated_at: Date
  url: string
}

export type RoleReadPermissions = {
  module: ModuleData
  module_id: string
  permissions: string[]
  role_id: string
}

const getPermissions = async (email: string) => {
  return (await axios.get<RolesType>(`/api/auth/permissions?email=${email}`)).data;
};

export const useQueryPermissions = () => {
  const { data } = useSession();
  return useQuery(['get_permissions'], async () => {
    return await getPermissions(data?.user?.email as string);
  }, {
    enabled              : data?.user?.email !== undefined,
    refetchOnWindowFocus : true,
    refetchOnReconnect   : true,
    refetchOnMount       : true,
    refetchInterval      : 5000
  });
};

export const useGetPermissions = () => {
  const { data, refetch } = useQueryPermissions();

  return { data, refetch };
};

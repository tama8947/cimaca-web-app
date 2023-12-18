import axios from 'axios';
import { useSession } from 'next-auth/react';
import { useQuery } from 'react-query';

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

const getModules = async (email: string) => {
  return (await axios.get<RoleReadPermissions[]>(`/api/modules/roles/read-permissions?email=${email}`)).data;
};

export const useGetMenuData = () => {
  const { data } = useSession();

  return useQuery(['menu_data'], async () => {
    return await getModules(data?.user?.email as string);
  }, { enabled: data?.user?.email !== undefined });
};

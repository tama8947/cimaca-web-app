import axios from 'axios';
import { useEffect } from 'react';
import { useQuery } from 'react-query';

type Module = {
  created_at: Date
  icon: string
  id: string
  label: string
  name: string
  parent_id: null
  state: string
  updated_at: Date
  url: string
}

const getModule = async (id: string) => {
  return (await axios.get<Module>(`/api/modules/modules/get-one?id=${id}`)).data;
};

export const useGetOneModule = (id: string) => {
  const { data, refetch } = useQuery(['one-module'], async () => {
    return await getModule(id);
  }, { enabled: id !== undefined });

  useEffect(() => { void refetch(); }, [id]);

  return data;
};

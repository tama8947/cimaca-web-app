import axios from 'axios';
import { useEffect } from 'react';
import { useQuery } from 'react-query';
import { type Module } from '../modules-types/types';
import { validatePaginationSearchParams } from '@/utils/url/validate-url-search-params';

type TypeData = { data: Module[], totalRecords: number };
export const useGetModuleForTable = (searchParams: string) => {
  const getData = async () => await axios.get<TypeData>(`/api/modules/modules/get-for-table?${searchParams}`);
  const { data, isLoading, isFetching, refetch } = useQuery(['modules'], getData,
    { enabled: validatePaginationSearchParams(searchParams) });

  useEffect(() => {
    refetch();
  }, [searchParams]);
  return { data: data?.data, isLoading: isLoading || isFetching, refetch };
};

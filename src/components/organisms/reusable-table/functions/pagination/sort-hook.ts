import { type ReadonlyURLSearchParams, useSearchParams } from 'next/navigation';
import { type DataTableStateEvent } from 'primereact/datatable';
import { useCallback, useEffect, useState } from 'react';

const sortConvertionToString = (sortOrder: SortConfig['sortOrder']): SortOptions => {
  if (sortOrder === 1) return 'asc';

  if (sortOrder === -1) return 'desc';

  return '';
};

const sortConvertionToCode = (sortOrder: SortOptions) => {
  if (sortOrder === 'asc') return 1;

  if (sortOrder === 'desc') return -1;

  return 0;
};

const validSortPagination = (
  searchParams: ReadonlyURLSearchParams
) => {
  const orderBy = searchParams.get('orderBy')!;
  const sortOrder = searchParams.get('sortOrder')!;

  if (typeof orderBy !== 'string') return false;

  if (!['asc', 'desc'].includes(sortOrder) || typeof orderBy !== 'string') return false;

  return true;
};

export const useSortTableColumns = (initialFieldSort: SortHandling) => {
  const [{ sortField, sortOrder }, setSortConfig] = useState<SortState>({
    sortField : initialFieldSort?.sortField ?? '',
    sortOrder : sortConvertionToCode(initialFieldSort?.sortOrder)
  });
  const [sortURL, setSortURL] = useState('');

  const [initialLoad, setInitialLoad] = useState(false);

  const searchParams = useSearchParams();

  const handleSort = (event: DataTableStateEvent) => {
    setSortURL(`orderBy=${event.sortField}&sortOrder=${sortConvertionToString(event.sortOrder)}`);
  };

  const updateSortStateFromURL = useCallback(() => {
    const orderBy = searchParams.get('orderBy')!;
    const sortOrder = searchParams.get('sortOrder')!;

    setSortConfig({
      sortField : orderBy,
      sortOrder : sortConvertionToCode(sortOrder as SortOptions)
    });
  }, [searchParams]);

  useEffect(() => {
    updateSortStateFromURL();
  }, [updateSortStateFromURL]);

  const setInitialSortConfig = useCallback(() => {
    const { sortField, sortOrder } = initialFieldSort;
    if ((!initialLoad && !validSortPagination(searchParams)) || !validSortPagination(searchParams)) {
      setSortURL(`orderBy=${sortField}&sortOrder=${sortOrder}`);
    }
    setInitialLoad(true);
  }, [initialFieldSort, initialLoad, searchParams]);

  useEffect(() => {
    setInitialSortConfig();
  }, [setInitialSortConfig]);
  return { sortURL, sortField, sortOrder, handleSort };
};

import { useSearchParams } from 'next/navigation';
import { type ColumnProps } from 'primereact/column';
import { useCallback, useEffect, useState } from 'react';

export const useSearch = (columns: ColumnProps[]) => {
  const [firstLoad, setFirstLoad] = useState(false);
  const [searchState, setStateSearch] = useState<SearchState>({
    searchField: columns.filter((col) => !['numeric', 'date']
      .includes(col.dataType as string))[0]?.field,
    search: ''
  });
  const [searchURL, setSearchURL] = useState('');

  const searchParams = useSearchParams();

  const executeSearch = () => {
    setSearchURL(`searchField=${searchState.searchField}&search=${searchState.search}`);
  };

  const cleanSearch = () => {
    setStateSearch({ ...searchState, search: '' });
    setSearchURL(`searchField=${searchState.searchField}&search=`);
  };

  const initializeState = useCallback(() => {
    const search = searchParams.get('search');
    const searchField = searchParams.get('searchField');

    if (firstLoad) return;
    else setFirstLoad(true);

    setStateSearch({
      searchField : searchField ?? searchState.searchField,
      search      : search ?? ''
    });
  }, [searchParams, searchState.searchField, firstLoad]);

  useEffect(() => {
    initializeState();
  }, [initializeState]);
  return { searchURL, searchState, setStateSearch, executeSearch, cleanSearch };
};

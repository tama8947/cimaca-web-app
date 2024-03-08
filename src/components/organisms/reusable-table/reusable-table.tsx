'use client';

import { Column, type ColumnProps } from 'primereact/column';
import { DataTable } from 'primereact/datatable';
import { filters } from './_components/tfooter-components/paginator/functions/config';
import Pagination from './_components/tfooter-components/paginator/paginator';
import THead from './_components/thead';
import OverlayFilters from './_components/thead-components/overlay-filters/overlay-filters';
import { SearchParamsContext } from './contexts/search-contexts';
import { useURLSearchParams } from './functions/pagination/manage-url-hooks';
import { usePagination } from './functions/pagination/pagination-hooks/pagination-hook';
import { useDateSearch } from './functions/pagination/search-hooks/date-search-hook';
import { useSearch } from './functions/pagination/search-hooks/general-search-hook';
import { useSortTableColumns } from './functions/pagination/sort-hook';
import { processData } from './functions/process-data';
import { type ActionButton, type CustomColumnProps } from './types/modified-types';

type PropsReusableTable<T> = {
  readonly loading?: boolean
  readonly columns: CustomColumnProps[]
  readonly customPagination?: CustomPaginationData
  readonly actionButtons?: ActionButton[]
  readonly data: T[]
}

export default function ReusableTable<T extends object> ({
  data,
  columns,
  loading,
  customPagination,
  ...props
}: PropsReusableTable<T>) {
  const {
    paginationState,
    paginationURL,
    handlePaginationState
  } = usePagination(customPagination);

  const { sortURL, sortField, sortOrder, handleSort } = useSortTableColumns({
    sortField : customPagination?.sortBy as string,
    sortOrder : customPagination?.sortOrder
  });

  const {
    searchURL,
    searchState,
    setStateSearch,
    executeSearch,
    cleanSearch
  } = useSearch(columns as ColumnProps[]);

  const { searchDateURL, setChangesSearchDateURL, clearSearchDateURL } = useDateSearch();

  const searchStateAndActions = {
    columns,
    searchState,
    setStateSearch,
    executeSearch,
    cleanSearch,
    setChangesSearchDateURL,
    clearSearchDateURL
  };

  useURLSearchParams([paginationURL, sortURL, searchURL, searchDateURL], data);

  return (
    <SearchParamsContext.Provider value={searchStateAndActions}>
      <DataTable
              value={processData(data, props.actionButtons)}
              size="small"
              tableStyle={{ minWidth: '50rem' }}
              dataKey="id"
              filters={filters}
              filterDisplay="row"

              onSort={handleSort}
              sortField={sortField}
              sortOrder={sortOrder}
              header={
                <THead />
              }
              footer={
                <Pagination paginationConfig={{
                  totalRecords: customPagination?.totalRecords ?? 0,
                  paginationState,
                  handlePaginationState
                }}
                  sortConfig={{ sortField: 'sortField', sortOrder: 1, handleSort }}
                  />
              }
              loading={(loading ?? false) }
              // globalFilter={globalFilterValue}
              emptyMessage="No customers found."
          >
        {columns.map((col, key) => (
          <Column key={key} {...col } filter showFilterMenu={false}
                    filterElement={col.dataType === 'date'
                      ? <OverlayFilters key={key} dataType={col.dataType} fieldName={col.field} />
                      : <div key={key}></div>}
                    sortFunction={(e) => {
                      return (e.data);
                    }
                  } />
        ))}
      </DataTable>
    </SearchParamsContext.Provider>
  );
}

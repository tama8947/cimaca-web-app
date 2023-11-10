'use client';
import { Column, type ColumnProps } from 'primereact/column';
import { DataTable } from 'primereact/datatable';
import { type ChangeEvent, useState } from 'react';
import { PaginatorLeft, PaginatorRight } from './_components/tfooter-components';
import THead from './_components/thead';
import { filters } from './functions/config';

interface PropsReusableTable<T> {
  loading: boolean
  columns: ColumnProps[]
  data: T[]
}

export default function ReusableTable <T extends object> ({ data, columns, loading }: PropsReusableTable<T>) {
  const [globalFilterValue, setGlobalFilterValue] = useState('');

  const onGlobalFilterChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const _filters = { ...filters };

    _filters.global.value = value;

    // setFilters(_filters);
    setGlobalFilterValue(value);
  };

  return (
    <DataTable
      value={data}
      size="normal"
      paginator
      rows={5}
      rowsPerPageOptions={[5, 10, 25, 50]}
      tableStyle={{ minWidth: '50rem' }}
      paginatorTemplate="RowsPerPageDropdown FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink"
      currentPageReportTemplate="{first} to {last} of {totalRecords}"
      paginatorLeft={<PaginatorLeft/>}
      paginatorRight={<PaginatorRight/>}
      dataKey="id"
      filters={filters}
      filterDisplay="row"
      loading={loading}
      globalFilterFields={[
        'name',
        'country.name',
        'representative.name',
        'status'
      ]}
      header={<THead globalFilterValue={globalFilterValue} onGlobalFilterChange={(onGlobalFilterChange)}/>}
      emptyMessage="No customers found."
    >
      {columns.map((col, key) => <Column key={key} {...col} />)}
    </DataTable>
  );
}

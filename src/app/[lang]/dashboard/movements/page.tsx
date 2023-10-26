'use server';

import React from 'react';
import { type Locale } from '@/i18n.config';
import { getDictionary } from '@/utils/internationalization/dictionary';
import { Button, Column, DataTable, FilterMatchMode, /* FilterOperator, */ InputText } from '@/utils/prime-react';

interface Category {
  id: string
  created_at: string
  updated_at: string
  state: string
  domain: string
  range_value: string
  description: string
  optional: string
}

interface Movement {
  id: string
  created_at: Date
  updated_at: Date
  user_id: string
  amount: number
  category_id: string
  comment: string
  category?: Category | undefined
}

export default async function MovementsPage ({
  params: { lang }
}: {
  params: { lang: Locale }
}) {
  const { titles } = await getDictionary(lang);

  const movementsData = getDailyMovements();
  const [movements] = await Promise.all([movementsData]);
  const paginatorLeft = <Button type="button" icon="pi pi-refresh" text />;
  const paginatorRight = <Button type="button" icon="pi pi-download" text />;
  const globalFilterValue = '';
  const loading = true;

  const filters = {
    global         : { value: null, matchMode: FilterMatchMode.CONTAINS },
    name           : { value: null, matchMode: FilterMatchMode.STARTS_WITH },
    'country.name' : { value: null, matchMode: FilterMatchMode.STARTS_WITH },
    representative : { value: null, matchMode: FilterMatchMode.IN },
    status         : { value: null, matchMode: FilterMatchMode.EQUALS },
    verified       : { value: null, matchMode: FilterMatchMode.EQUALS }
  };

  const onGlobalFilterChange = (e: any) => {
    const value = e.target.value;
    const _filters = { ...filters };

    _filters.global.value = value;

    // setFilters(_filters);
    // setGlobalFilterValue(value);
  };
  const renderHeader = () => {
    return (
            <div className="flex justify-content-end">
                <span className="p-input-icon-left">
                    <i className="pi pi-search" />
                    <InputText value={globalFilterValue} onChange={onGlobalFilterChange} placeholder="Keyword Search" />
                </span>
            </div>
    );
  };
  const header = renderHeader();

  return (
        <div>
            <h1>{titles.movements}</h1>
            <DataTable
                value={movements}
                size='normal'
                paginator rows={5}
                rowsPerPageOptions={[5, 10, 25, 50]}
                tableStyle={{ minWidth: '50rem' }}
                paginatorTemplate="RowsPerPageDropdown FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink"
                currentPageReportTemplate="{first} to {last} of {totalRecords}"
                paginatorLeft={paginatorLeft}
                paginatorRight={paginatorRight}
                dataKey="id"
                filters={filters}
                filterDisplay="row"
                loading={loading}
                globalFilterFields={['name', 'country.name', 'representative.name', 'status']}
                header={header}
                emptyMessage="No customers found.">
                    <Column field="id" header="ID"></Column>
                    <Column field="amount" header="Date"></Column>
                    <Column field="comment" header="Description" sortable></Column>
            </DataTable>
        </div>
  );
};

// This function gets called at build time so it can be used to fetch data in server side rendering mode
async function getDailyMovements (): Promise<Movement[]> {
  try {
    const response = await fetch(`${process.env.STAGE_URL}/api/daily-movements`, { next: { revalidate: 30 } });
    const body = await response.text();
    const data = JSON.parse(body).data;
    return data || [];
  } catch (error) {
    console.error(error);
    throw error;
  }
}

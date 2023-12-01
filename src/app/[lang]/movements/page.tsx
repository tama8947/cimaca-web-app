'use server';

import React from 'react';
import { getDailyMovements } from './functions/fetch-data';
import ReusableTable from '@/components/organisms/reusable-table/reusable-table';
import { type CustomColumnProps } from '@/components/organisms/reusable-table/types/modified-types';
import { type Locale } from '@/i18n.config';
import { getDictionary } from '@/utils/internationalization/dictionary';

type PropsMovementsPage = {
  readonly params: { lang: Locale }
  readonly searchParams:
  | string
  | string[][]
  | Record<string, string>
  | URLSearchParams
  | undefined
}

export default async function MovementsPage ({
  params: { lang },
  searchParams
}: PropsMovementsPage) {
  const { titles } = await getDictionary(lang);

  const searchParamsString = new URLSearchParams(searchParams).toString();

  const movementsData = getDailyMovements(searchParamsString);

  const [movements, totalRecords] = await movementsData;

  const columns: CustomColumnProps[] = [
    {
      field  : 'id',
      header : 'ID'
    },
    {
      field    : 'amount',
      header   : 'Amount',
      sortable : true,
      dataType : 'numeric'
    },
    { field: 'comment', header: 'Description' },
    {
      field    : 'created_at',
      header   : 'Date',
      sortable : true,
      dataType : 'date'
    }
  ];

  return (
        <div>
            <h1>{titles.movements}</h1>
            <ReusableTable
                customPagination={{
                  type         : 'offset',
                  totalRecords : totalRecords ?? 0,
                  sortBy       : 'created_at',
                  sortOrder    : 'desc'
                }}
                columns={columns}
                data={movements ?? []}
            />
        </div>
  );
}

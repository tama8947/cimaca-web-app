'use server';

import { type ColumnProps } from 'primereact/column';
import React from 'react';
import ReusableTable from '@/components/organisms/reusable-table/reusable-table';
import { type Locale } from '@/i18n.config';
import { getDictionary } from '@/utils/internationalization/dictionary';
import { getDailyMovements } from './functions/fetch-data';

export default async function MovementsPage ({
  params: { lang }
}: {
  params: { lang: Locale }
}) {
  const { titles } = await getDictionary(lang);

  const movementsData = getDailyMovements();
  const [movements] = await Promise.all([movementsData]);

  const columns: ColumnProps[] = [{
    field: 'id', header: 'ID'
  }, {
    field: 'amount', header: 'Date'
  }, { field: 'comment', header: 'Description' }];

  return (
        <div>
            <h1>{titles.movements}</h1>
            <ReusableTable loading={false} columns={columns} data={movements}/>
        </div>
  );
};

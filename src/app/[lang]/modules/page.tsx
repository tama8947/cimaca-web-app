'use client';

import Link from 'next/link';
import { pluralName } from './metadata';
import { getModulesForTable } from './modules-fetch-data/get-for-table';
import { columns } from './modules-table-config/columns';
import { actionButtons } from './modules-table-config/custom-components';
import ReusableTable from '@/components/organisms/reusable-table/reusable-table';
import { type Locale } from '@/i18n.config';

type PropsUsersPage = {
  readonly params: { lang: Locale }
  readonly searchParams:
  | string
  | string[][]
  | Record<string, string>
  | URLSearchParams
  | undefined
};

export default async function UsersPage ({
  params: { lang },
  searchParams
}: PropsUsersPage) {
  const searchParamsString = new URLSearchParams(searchParams).toString();
  const dataPromise = getModulesForTable(searchParamsString);

  const [data, totalRecords] = await dataPromise;

  return (
    <>
      <div className="card p-fluid">
        <div className="flex flex-row justify-content-between align-items-center mb-2">
          <h5 className="mb-0">{pluralName}</h5>
          <Link href={'modules/create'}>
            <button className="p-button p-button-success w-auto p-button-sm">
              Crear
            </button>
          </Link>
        </div>
        <ReusableTable
          customPagination={{
            type         : 'offset',
            totalRecords : totalRecords ?? 0,
            sortBy       : 'name',
            sortOrder    : 'asc'
          }}
          columns={columns}
          actionButtons={actionButtons}
          data={data ?? []}
        />
      </div>
    </>
  );
}

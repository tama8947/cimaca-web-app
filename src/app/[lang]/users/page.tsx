import Link from 'next/link';
import { getUsers } from './functions/fetch-data';
import { columns } from './table-config/columns';
import { actionButtons } from './table-config/data-with-buttons';
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
  const dataPromise = getUsers(searchParamsString);

  const [data, totalRecords] = await dataPromise;

  return (
    <main>
      <div className="card p-fluid">
        <div className="flex flex-row justify-content-between align-items-center mb-2">
          <h5 className="mb-0">Usuarios</h5>
          <Link href={'users/create'}>
            <button className="p-button p-button-success w-auto p-button-sm">
              Crear
            </button>
          </Link>
        </div>
        <ReusableTable
          customPagination={{
            type         : 'offset',
            totalRecords : totalRecords ?? 0,
            sortBy       : 'created_at',
            sortOrder    : 'desc'
          }}
          columns={columns}
          actionButtons={actionButtons}
          data={data ?? []}
        />
      </div>
    </main>
  );
}

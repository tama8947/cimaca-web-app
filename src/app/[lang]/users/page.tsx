import { getUsers } from './functions/fetch-data';
import ReusableTable from '@/components/organisms/reusable-table/reusable-table';
import { type CustomColumnProps } from '@/components/organisms/reusable-table/types/modified-types';
import { type Locale } from '@/i18n.config';

type PropsUsersPage = {
  readonly params: { lang: Locale }
  readonly searchParams:
  | string
  | string[][]
  | Record<string, string>
  | URLSearchParams
  | undefined
}

export default async function UsersPage ({
  params: { lang },
  searchParams
}: PropsUsersPage) {
  const searchParamsString = new URLSearchParams(searchParams).toString();
  const dataPromise = getUsers(searchParamsString);

  const [data, totalRecords] = await dataPromise;
  const columns: CustomColumnProps[] = [
    {
      field  : 'id',
      header : 'ID'
    },
    {
      field  : 'name',
      header : 'Name'
    },
    {
      field  : 'last_name',
      header : 'Last Name'
    },
    { field: 'email', header: 'Email' },
    { field: 'role', header: 'Role' },
    {
      field    : 'created_at',
      header   : 'Date',
      sortable : true,
      dataType : 'date'
    }
  ];

  return <main>
  <div className="card p-fluid">
      <h5>Usuarios</h5>
      <ReusableTable
                customPagination={{
                  type         : 'offset',
                  totalRecords : totalRecords ?? 0,
                  sortBy       : 'created_at',
                  sortOrder    : 'desc'
                }}
                columns={columns}
                data={data ?? []}
            />
  </div> </main>;
};

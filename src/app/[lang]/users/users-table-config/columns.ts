import { type CustomColumnProps } from '@/components/organisms/reusable-table/types/modified-types';

export const columns: CustomColumnProps[] = [
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
  },
  { field: 'actions', header: 'Actions' }
];

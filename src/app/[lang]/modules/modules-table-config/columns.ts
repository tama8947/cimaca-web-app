import { type CustomColumnProps } from '@/components/organisms/reusable-table/types/modified-types';

export const columns: CustomColumnProps[] = [
  {
    field  : 'id',
    header : 'ID'
  },
  {
    field    : 'name',
    header   : 'Name',
    sortable : true
  },
  {
    field    : 'label',
    header   : 'Label',
    sortable : true
  },
  {
    field    : 'url',
    header   : 'Route',
    sortable : true
  },
  { field: 'actions', header: 'Actions' }
];
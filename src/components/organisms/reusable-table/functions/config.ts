import { FilterMatchMode } from 'primereact/api';

export const filters = {
  global         : { value: 'null', matchMode: FilterMatchMode.CONTAINS },
  name           : { value: null, matchMode: FilterMatchMode.STARTS_WITH },
  'country.name' : { value: null, matchMode: FilterMatchMode.STARTS_WITH },
  representative : { value: null, matchMode: FilterMatchMode.IN },
  status         : { value: null, matchMode: FilterMatchMode.EQUALS },
  verified       : { value: null, matchMode: FilterMatchMode.EQUALS }
};

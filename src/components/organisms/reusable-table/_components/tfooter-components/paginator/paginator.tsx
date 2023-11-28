import { type DataTableStateEvent } from 'primereact/datatable';
import { Paginator, type PaginatorPageChangeEvent } from 'primereact/paginator';

type PropsPagination = {
  readonly sortConfig: SortState & { handleSort: (ev: DataTableStateEvent) => void }
  readonly paginationConfig: PaginationStateHandling
}

const rowsPerPage = [5, 10, 25, 50];

export default function Pagination ({ sortConfig, paginationConfig }: PropsPagination) {
  const { paginationState } = paginationConfig;
  const { first, rows } = paginationState;

  const onPageChange = (event: PaginatorPageChangeEvent) => {
    if (paginationConfig === undefined) return;
    paginationConfig.handlePaginationState(event);
  };
  return (
    <Paginator
      first={first}
      rows={rows}
      totalRecords={paginationConfig?.totalRecords}
      onPageChange={onPageChange}
      template="RowsPerPageDropdown FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink"
      currentPageReportTemplate="{first} to {last} of {totalRecords}"
      rowsPerPageOptions={rowsPerPage}
    />
  );
}

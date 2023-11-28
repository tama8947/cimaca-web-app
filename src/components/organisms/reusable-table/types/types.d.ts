type SortOptions = 'asc' | 'desc' | '' | undefined

type CustomPaginationData = {
  type: 'offset' | 'cursor'
  totalRecords: number
  sortBy: string
  sortOrder: SortOptions
}

type PaginationState = {
  first: number
  rows: number
  page: number
  pageCount: number
}

type PaginationStateHandling = {
  totalRecords: number
  paginationState: PaginationState
  handlePaginationState: (ev: PaginatorPageChangeEvent) => void
}

type SortHandling = {
  sortField: string | undefined
  sortOrder: SortOptions
}

type SortState = {
  sortField: string | undefined
  sortOrder: 1 | 0 | -1 | null | undefined
}

type SortConfig = SortState

type SearchState = {
  searchField: string | undefined
  search: string
}

type InitialConfigPagination = {
  rowsNumber: number
  type: CustomPaginationData['type'] | undefined
  searchParams: ReadonlyURLSearchParams
  setPaginationConfig: Dispatch<SetStateAction< PaginationState>>
  sortConfig: SortConfig
}

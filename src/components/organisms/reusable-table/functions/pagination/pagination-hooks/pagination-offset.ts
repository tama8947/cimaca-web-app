import { useSearchParams } from 'next/navigation';
import { type PaginatorPageChangeEvent } from 'primereact/paginator';
import { type Dispatch, type SetStateAction, useCallback, useEffect } from 'react';

const typePagination: CustomPaginationData['type'] = 'offset';

const useOffsetPagination = (
  handlePaginationState: Dispatch<SetStateAction<PaginationState>>,
  handlePaginationURL: Dispatch<SetStateAction<string>>
) => {
  const searchParams = useSearchParams();

  const validateOffsetPagination = useCallback(() => {
    const rows = parseInt(searchParams.get('rows')!);
    const page = parseInt(searchParams.get('page')!);

    if (isNaN(rows)) return false;

    if (isNaN(page)) return false;

    return true;
  }, [searchParams]);

  const updateOffsetPagination = ({ rows, page }: PaginatorPageChangeEvent) => {
    handlePaginationURL(`type=${typePagination}&rows=${rows}&page=${page + 1}`);
  };

  const initOffsetPagination = (rows: number) => {
    if (validateOffsetPagination()) return;

    handlePaginationURL(`type=${typePagination}&rows=${rows}&page=1`);
  };

  const updateStatePaginationFromURL = useCallback(() => {
    const rows = parseInt(searchParams.get('rows')!);
    const page = parseInt(searchParams.get('page')!);

    const first = (page - 1) * rows;

    handlePaginationState((paginationConfigCurrent) => {
      return { ...paginationConfigCurrent, first, rows, page };
    });
  }, [searchParams, handlePaginationState]);

  useEffect(() => { updateStatePaginationFromURL(); }, [updateStatePaginationFromURL]);

  return { initOffsetPagination, updateOffsetPagination };
};

export default useOffsetPagination;

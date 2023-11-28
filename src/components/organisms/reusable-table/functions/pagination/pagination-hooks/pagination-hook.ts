import { type PaginatorPageChangeEvent } from 'primereact/paginator';
import { useCallback, useEffect, useState } from 'react';
import useOffsetPagination from './pagination-offset';

const rowsPerPage = [5, 10, 25, 50];

export const usePagination = (paginationConfig: CustomPaginationData | undefined) => {
  const [paginationURL, setPaginationURL] = useState('');

  const [paginationState, setPaginationState] = useState<PaginationState>({
    first     : 0,
    rows      : rowsPerPage[0],
    page      : 0,
    pageCount : 4
  });

  const {
    initOffsetPagination, updateOffsetPagination
  } = useOffsetPagination(
    setPaginationState,
    setPaginationURL
  );

  const handlePaginationState = (event: PaginatorPageChangeEvent) => {
    if (paginationConfig?.type === 'offset') updateOffsetPagination(event);
  };

  const initPaginationState = useCallback(() => {
    if (paginationConfig?.type === 'offset') initOffsetPagination(rowsPerPage[0]);
  }, [initOffsetPagination, paginationConfig]);

  useEffect(() => {
    initPaginationState();
  }, [initPaginationState]);

  return { paginationURL, paginationState, handlePaginationState };
};

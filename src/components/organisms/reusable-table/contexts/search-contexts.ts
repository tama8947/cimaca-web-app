import { createContext, type Dispatch, type SetStateAction } from 'react';
import { type CustomColumnProps } from '../types/modified-types';

export const SearchParamsContext = createContext<{
  columns?: CustomColumnProps[]
  searchState?: SearchState
  setStateSearch?: Dispatch<SetStateAction<SearchState>>
  executeSearch?: () => void
  cleanSearch?: () => void
  setChangesSearchDateURL?: (fieldName: string, startDate: string, endDate: string) => void
  clearSearchDateURL?: (fieldName: string) => void
}>({});

export const validatePaginationSearchParams = (searchParams: string) => {
  const searchParamsObj = new URLSearchParams(searchParams);

  if (!['offset'].includes(searchParamsObj.get('type') as string)) return false;

  if (isNaN(parseInt(searchParamsObj.get('rows') as string))) return false;

  if (isNaN(parseInt(searchParamsObj.get('page') as string))) return false;

  if (!searchParamsObj.has('orderBy')) return false;

  if (!['asc', 'desc'].includes(searchParamsObj.get('sortOrder') as string)) return false;
};

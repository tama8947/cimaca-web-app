import { useState } from 'react';

export const useDateSearch = () => {
  const [searchDateURL, setSearchDateURL] = useState('');

  const setChangesSearchDateURL = (
    fieldName: string,
    startDate: string,
    endDate: string
  ) => {
    const dateToQueryParams = new URLSearchParams({
      [`${fieldName}CustomSearch`] : fieldName,
      [`${fieldName}DataType`]     : 'date',
      [`${fieldName}StartDate`]    : startDate,
      [`${fieldName}EndDate`]      : endDate

    }).toString();

    setSearchDateURL(dateToQueryParams);
  };

  const clearSearchDateURL = (fieldName: string) => {
    const editableSearchParams = new URLSearchParams(searchDateURL);

    editableSearchParams.delete(`${fieldName}CustomSearch`);
    editableSearchParams.delete(`${fieldName}DataType`);
    editableSearchParams.delete(`${fieldName}StartDate`);
    editableSearchParams.delete(`${fieldName}EndDate`);

    setSearchDateURL(editableSearchParams.toString());
  };
  // fieldNameCustomSearch=field
  // fieldNameDataType=date
  // fieldNameStartDate= fieldNameEndDate
  return { searchDateURL, setChangesSearchDateURL, clearSearchDateURL };
};

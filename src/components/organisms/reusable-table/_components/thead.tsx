import { Button } from 'primereact/button';
import { Dropdown } from 'primereact/dropdown';
import { InputText } from 'primereact/inputtext';
import { type FormEvent, useContext } from 'react';
import { SearchParamsContext } from '../contexts/search-contexts';

export default function THead () {
  const {
    searchState,
    setStateSearch: handleSearchState,
    columns, executeSearch,
    cleanSearch
  } = useContext(SearchParamsContext);

  const { search, searchField } = searchState as SearchState;

  const convertedOptions = () => {
    return columns?.filter((column) => !['numeric', 'date']
      .includes(column.dataType as string))
      ?.map((column) => ({ label: column.header, value: column.field }));
  };

  const updateSearchState = (change: Partial<SearchState>) => {
    handleSearchState?.({ searchField, search, ...change });
  };

  const submitSearch = (ev: FormEvent<HTMLFormElement>) => {
    ev.preventDefault();
    executeSearch?.();
  };

  return (
    <div className='flex justify-content-between flex-column-reverse  md:flex-row'>
      <form onSubmit={submitSearch}
              className="flex justify-content-end align-items-center pt-1 w-full">

        <Dropdown filter value={searchField}
                options={convertedOptions()} onChange={(ev) => { updateSearchState({ searchField: ev.value }); }}
                className='p-inputtext-sm max-w-7rem md:max-w-min mr-2'/>

        <span className=" mr-2">

          <InputText
                    className="p-inputtext-sm w-full"
                    value={search}
                    onChange={(ev) => { updateSearchState({ search: ev.target.value }); }}
                    placeholder="Texto a buscar"
                />
        </span>

        <Button size='small' type="submit" icon='pi pi-search' />
        <Button className='ml-2' size='small'
                severity='secondary' icon='pi pi-replay' type='reset' onClick={cleanSearch} />

      </form>
    </div>
  );
}

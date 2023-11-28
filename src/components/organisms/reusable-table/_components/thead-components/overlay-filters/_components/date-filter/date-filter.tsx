import { useSearchParams } from 'next/navigation';
import { Button } from 'primereact/button';
import { Calendar } from 'primereact/calendar';
import { type OverlayPanel } from 'primereact/overlaypanel';
import { type Nullable } from 'primereact/ts-helpers';
import { type FormEvent, type MouseEvent, type RefObject, useCallback, useContext, useEffect, useState } from 'react';
import { SearchParamsContext } from '@/components/organisms/reusable-table/contexts/search-contexts';

type PropsDateFilter = {
  readonly fieldName: string | undefined
  readonly refOverlay: RefObject<OverlayPanel>
}

export default function DateFilter ({ fieldName, refOverlay }: PropsDateFilter) {
  const [startDate, setStartDate] = useState<Nullable<string | Date | Date[]>>('');
  const [endDate, setEndDate] = useState <Nullable<string | Date | Date[]>>('');

  const [showValidation, setShowValidation] = useState(false);

  const { setChangesSearchDateURL, clearSearchDateURL } = useContext(SearchParamsContext);

  const searchParams = useSearchParams();

  const searchDateRange = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (startDate !== '' && endDate !== '') {
      const formatedStartDate = new Date(startDate as string).toISOString();
      const formatedEndDate = new Date(endDate as string).toISOString();

      setChangesSearchDateURL?.(fieldName as string, formatedStartDate, formatedEndDate);
    }
    setShowValidation(true);
    refOverlay.current?.hide();
  };

  const errorMessage = (value: string) => value === ''
    ? <small className="p-error">{showValidation && 'Este campo es requerido'}</small>
    : <small className="p-error">&nbsp;</small>;

  const clearDate = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    clearSearchDateURL?.(fieldName as string);
    refOverlay.current?.hide();
  };

  const loadDateValues = useCallback(() => {
    const startDate = searchParams.get(`${fieldName}StartDate`);
    const endDate = searchParams.get(`${fieldName}EndDate`);

    if (startDate !== null && endDate !== null) {
      setStartDate(new Date(startDate));
      setEndDate(new Date(endDate));
    } else {
      setStartDate('');
      setEndDate('');
      setShowValidation(false);
    }
  }, [searchParams, fieldName]);

  useEffect(() => {
    loadDateValues();
  }, [loadDateValues]);

  return <form onSubmit={searchDateRange} className="flex justify-content-center flex-column">
    <Calendar className="p-inputtext-sm" showIcon
      placeholder='Fecha Inicial' mask='99/99/9999' dateFormat='dd/mm/yy'
      value={startDate} onChange={(e) => { setStartDate(e.value); }}
      />
       {errorMessage(startDate as string) }

    <Calendar className="p-inputtext-sm mt-2" showIcon
      placeholder='Fecha Final' mask='99/99/9999' dateFormat='dd/mm/yy'
      value={endDate} onChange={(e) => { setEndDate(e.value); }}
    />
      {errorMessage(endDate as string) }

    <div className='flex justify-content-between mt-4'>
      <Button size='small' label='Limpiar' outlined type='reset' onClick={clearDate} />
      <Button size='small' type="submit" label='Buscar' />
    </div>
  </form>;
}

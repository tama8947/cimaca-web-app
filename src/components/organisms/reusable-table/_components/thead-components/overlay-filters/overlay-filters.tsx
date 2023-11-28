import { Button } from 'primereact/button';
import { OverlayPanel } from 'primereact/overlaypanel';
import { useRef } from 'react';
import { type CustomColumnProps } from '../../../types/modified-types';
import DateFilter from './_components/date-filter/date-filter';
import NumberFilter from './_components/number-filter/number-filter';

type PropsOverlayFilters = {
  readonly dataType: CustomColumnProps['dataType']
  readonly fieldName: string | undefined
}

const allowedDataTypes: Array<CustomColumnProps['dataType']> = ['date', 'numeric'];

export default function OverlayFilters ({ dataType, fieldName }: PropsOverlayFilters) {
  const refOverlay = useRef<OverlayPanel>(null);

  if (allowedDataTypes.includes(dataType)) {
    return <>
      <div className='flex justify-content-center-start'>
        <Button className='max-w-min p-0' size='small' text severity='secondary' label='Filtro'
              icon='pi pi-filter' onClick={(e) => refOverlay.current?.toggle(e)} />
      </div>
      <OverlayPanel ref={refOverlay} >
        {dataType === 'numeric' && <NumberFilter/>}
        {dataType === 'date' && <DateFilter fieldName={fieldName} refOverlay={refOverlay}/>}
      </OverlayPanel>
    </>;
  }
}

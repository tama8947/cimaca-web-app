import { Button } from 'primereact/button';
import { Dropdown } from 'primereact/dropdown';
import { InputText } from 'primereact/inputtext';
import { optionsNumberFilter } from './options';

export default function NumberFilter () {
  return <form className="flex justify-content-center flex-column">
    <Dropdown filter value={'>'} options={optionsNumberFilter}
      className='mr-2 p-inputtext-sm w-full'/>
      <span className="p-input-icon-left mt-2">
          <i className="pi pi-search" />
          <InputText
              keyfilter="int"
              className="p-inputtext-sm "
              placeholder="Valor"
          />
      </span>
      <div className='flex justify-content-between mt-4'>
        <Button size='small' label='Limpiar' outlined type='reset' />
        <Button size='small' type="submit" label='Buscar' />
      </div>
  </form>;
}

'use client';

import { yupResolver } from '@hookform/resolvers/yup';
import { Button } from 'primereact/button';
import { Dropdown } from 'primereact/dropdown';
import { Controller, useForm } from 'react-hook-form';
import { singularName } from '../metadata';
import { validationSchema } from './create-module-form-config/schema';
import { useCreateModule } from './create-module-requests/create';
import ErrorMsg from '@/components/atoms/error-msg/error-msg';
import Input from '@/components/atoms/input/input';
import { optionsEnabledDisabled } from '@/utils/reused-data/selects';

export default function createModulePage () {
  const { register, control, handleSubmit, formState:{ errors } } = useForm({
    resolver: yupResolver(validationSchema)
  });

  const { create } = useCreateModule();

  const responsiveStyleInputs = 'field col-12 sm:col-6 md:col-6 lg:col-6 xl:col-3';
  /* eslint-disable  @typescript-eslint/no-misused-promises */
  return <main>
    <form className="card p-fluid" onSubmit={
      handleSubmit(create)} >
      <h5>Crear {singularName}</h5>
      <div className="formgrid grid">
        <div className={responsiveStyleInputs}>
          <Input label='Nombre' {...register('name')}
          errorMessage={ errors.name?.message} />
        </div>
        <div className={responsiveStyleInputs}>
          <Input label='Label' {...register('label')}
          errorMessage={ errors.label?.message} />
        </div>
        <div className={responsiveStyleInputs}>
          <Input label='Icono' {...register('icon')}
          errorMessage={ errors.icon?.message} />
        </div>
        <div className={responsiveStyleInputs}>
          <Input label='URL' {...register('url')}
          errorMessage={ errors.url?.message} />
        </div>
        <div className={responsiveStyleInputs}>
          <label htmlFor='state' >Estado:</label>
          <Controller name='state' control={control} render={({ field }) => (
            <Dropdown id={field.name} value={field.value} onChange={(e) => { field.onChange(e.value); }}
              optionLabel="name" optionValue='code' className='p-inputtext-sm mb-none'
              options={optionsEnabledDisabled}
             />
          )} />
          <ErrorMsg msg={errors.state?.message} />
        </div>
      </div>
      <div className='flex justify-content-end'><Button label='Crear' className='p-button-sm w-min'/></div>
    </form>
  </main>;
}

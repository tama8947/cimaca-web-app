'use client';

import { yupResolver } from '@hookform/resolvers/yup';
import { useParams } from 'next/navigation';
import { Button } from 'primereact/button';
import { Dropdown } from 'primereact/dropdown';
import { useEffect } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { singularName } from '../../metadata';
import { type ModuleUpdateData, validationSchema } from './update-module-form-config/schema';
import { useGetOneModule } from './update-module-requests/get-one';
import { useUpdateModule } from './update-module-requests/update';
import ErrorMsg from '@/components/atoms/error-msg/error-msg';
import Input from '@/components/atoms/input/input';
import { optionsEnabledDisabled } from '@/utils/reused-data/selects';

export default function updateModulePage () {
  const params = useParams();

  const data = useGetOneModule(params.id as string);

  const { register, control, handleSubmit, formState:{ errors }, getValues, setValue } = useForm({
    defaultValues : data ?? {},
    resolver      : yupResolver(validationSchema)
  });

  useEffect(() => {
    if (data !== undefined) {
      const currentValues = getValues();
      for (const key in currentValues) {
        if (key in currentValues) {
          const keyFormField = key as keyof typeof currentValues;
          const dataModule = data as ModuleUpdateData;
          setValue(keyFormField, dataModule[key as keyof typeof dataModule]);
        }
      }
    }
    // setValue()
  }, [data]);

  const { update } = useUpdateModule();

  const responsiveStyleInputs = 'field col-12 sm:col-6 md:col-6 lg:col-6 xl:col-3';
  /* eslint-disable  @typescript-eslint/no-misused-promises */
  return <main>
    <form className="card p-fluid" onSubmit={ handleSubmit(update)} >
      <h5>Crear {singularName}</h5>
      <div className="formgrid grid">
        <div className={responsiveStyleInputs}>
          <Input label='Nombre' {...register('name')}
          errorMessage={errors.name?.message} />
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

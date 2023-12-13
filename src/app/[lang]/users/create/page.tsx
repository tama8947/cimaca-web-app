'use client';

import { yupResolver } from '@hookform/resolvers/yup';
import { Button } from 'primereact/button';
import { Dropdown } from 'primereact/dropdown';
import { Controller, useForm } from 'react-hook-form';
import { validationSchema } from './create-user-form-config/schema';
import { createUser } from './create-user-requests/request';
import Input from '@/components/atoms/input/input';
import { optionsEnabledDisabled } from '@/utils/reused-data/selects';

export default function createUserPage () {
  const { register, control, handleSubmit, formState:{ errors } } = useForm({
    resolver: yupResolver(validationSchema)
  });

  const { name, email } = errors;

  const responsiveStyleInputs = 'field col-12 sm:col-6 md:col-6 xl:col-3';
  /* eslint-disable  @typescript-eslint/no-misused-promises */
  return <main>
    <form className="card p-fluid" onSubmit={
      handleSubmit(createUser)} >
      <h5>Crear Usuario</h5>
      <div className="formgrid grid">
        <div className={responsiveStyleInputs}>
          <Input label='Nombre' {...register('name')}
          errorMessage={ name?.message} />
        </div>
        <div className={responsiveStyleInputs}>
          <Input label='Email' {...register('email')}
          errorMessage={email?.message} />
        </div>
        <div className={responsiveStyleInputs}>
          <Input type='password' label='Contraseña' {...register('email')}
          errorMessage={email?.message} />
        </div>
        <div className={responsiveStyleInputs}>
          <label htmlFor="">Role:</label>
          <Controller name='state' control={control} render={({ field }) => (
            <Dropdown id={field.name} value={field.value} onChange={(e) => { field.onChange(e.value); }}
              optionLabel="name" className='p-inputtext-sm mb-none'
              options={optionsEnabledDisabled}
             />
          )} />
        </div>
        <div className={responsiveStyleInputs}>
          <label htmlFor="">Estado:</label>
          <Controller name='state' control={control} render={({ field }) => (
            <Dropdown id={field.name} value={field.value} onChange={(e) => { field.onChange(e.value); }}
              optionLabel="name" className='p-inputtext-sm mb-none'
              options={optionsEnabledDisabled}
             />
          )} />
        </div>
      </div>
      <Button label='Crear' className='p-button-sm'/>
    </form>
  </main>;
}

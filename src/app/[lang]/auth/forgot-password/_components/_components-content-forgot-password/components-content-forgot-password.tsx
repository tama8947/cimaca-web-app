import { InputText } from 'primereact/inputtext';
import { useEffect } from 'react';
import ErrorMsg from '@/components/atoms/error-msg/error-msg';
import Logo from '@/components/atoms/logo/logo';
import { type FormikInstance } from '../../types/forgot-password.types';
import { focusOnError } from '../functions-content-forgot-password/content-forgot-password-behaviour';

export function ContentHead () {
  return (
    <div className="text-center mb-5">
      <Logo/>
      <div className="text-900 text-2xl font-medium mb-3">Recuperar Contraseña</div>
      <span className="text-600 text-sm font-medium">
        Ingrese su correo electrónico
      </span>
    </div>
  );
}

type CardInputProps = {
  readonly loading: boolean
  readonly formikInstance: FormikInstance
}

export function ContentInputs ({ formikInstance, loading }: CardInputProps) {
  useEffect(() => {
    focusOnError({ formikInstance });
  }, [formikInstance]);
  return (
    <>
      <div className="flex flex-column mb-5 ">
        <label htmlFor="email" className="block text-900 text-md font-medium ">
          Correo Electrónico
        </label>
        <InputText
          id="email"
          name="email"
          type="text"
          autoFocus
          disabled={loading}
          onChange={formikInstance?.handleChange}
          value={formikInstance?.values?.email}
          placeholder="Correo Electrónico"
          className="inputfocus p-inputtext-sm w-full  mt-2 mb-1"
        />
        <ErrorMsg msg={formikInstance?.errors?.email} />
      </div>
    </>
  );
}

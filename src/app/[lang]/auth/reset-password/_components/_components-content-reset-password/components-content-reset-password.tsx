import { Password } from 'primereact/password';
import { useEffect } from 'react';
import { type FormikInstance } from '../../types/reset-password-types';
import { focusOnError } from '../functions-reset-password/content-reset-password-behaviour';
import ErrorMsg from '@/components/atoms/error-msg/error-msg';
import Logo from '@/components/atoms/logo/logo';

export function ContentHead () {
  return (
    <div className="text-center mb-5">
      <Logo/>
      <div className="text-900 text-2xl font-medium mb-3">Cambiar Contraseña</div>
      <span className="text-600 text-sm font-medium">
        Ingrese su nueva contraseña
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
          Contraseña
        </label>
        <Password
            id="password"
            name="password"
            type="password"
            feedback={false}
            autoFocus
            disabled={loading}
            onChange={formikInstance?.handleChange}
            value={formikInstance?.values?.password}
            placeholder="Contraseña"
            className="p-inputtext-sm mt-2 mb-1"
            inputClassName="w-full inputfocus"
            toggleMask
          />
        <ErrorMsg msg={formikInstance?.errors?.password} />
      </div>
      <div className="flex flex-column mb-5 ">
        <label htmlFor="email" className="block text-900 text-md font-medium ">
          Confirmación Contraseña
        </label>
        <Password
            id="passwordConfirmation"
            name="passwordConfirmation"
            type="passwordConfirmation"
            feedback={false}
            disabled={loading}
            onChange={formikInstance?.handleChange}
            value={formikInstance?.values?.passwordConfirmation}
            placeholder="Confirmación Contraseña"
            className="inputfocus p-inputtext-sm  mt-2 mb-1"
            inputClassName="w-full inputfocus"
            toggleMask
          />
        <ErrorMsg msg={formikInstance?.errors?.passwordConfirmation} />
      </div>
    </>
  );
}

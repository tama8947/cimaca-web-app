import Image from 'next/image';
import { InputText } from 'primereact/inputtext';
import { Password } from 'primereact/password';
import { useEffect } from 'react';
import ErrorMsg from '@/components/atoms/error-msg';
import { type FormikInstanceLogin } from '../../types/login-types';
import { focusOnError } from '../functions-card-login/card-login-behaviour';
import './components-card-login.scss';

export function TitleCard () {
  return (
    <div className="text-center mb-5">
      <Image
        src="/icons/Logo-Web-D-La-Macarena.png"
        alt="Logo D´La Macarena"
        height="70"
        width="175"
        className="mb-3"
      />
      <div className="text-900 text-2xl font-medium mb-3">Iniciar Sesión</div>
      <span className="text-600 text-sm font-medium">Inicia sesión para continuar</span>
    </div>
  );
}

interface CardInputProps {
  loading: boolean
  formikInstance: FormikInstanceLogin
}

export function CardInputs ({ formikInstance, loading }: CardInputProps) {
  useEffect(() => { focusOnError({ formikInstance }); }, [formikInstance]);
  return (
    <>
      <div className="flex flex-column ">
        <label htmlFor="email" className="block text-900 text-md font-medium ">
          Email
        </label>
        <InputText
          id="email"
          name="email"
          type="text"
          autoFocus
          disabled={loading}
          onChange={ formikInstance?.handleChange}
          value={formikInstance?.values?.email}
          placeholder="Email address"
          className="inputfocus p-inputtext-sm w-full  mt-2"
        />
        <ErrorMsg msg={formikInstance?.errors?.email} />
      </div>
      <label
        htmlFor="password"
        className="block text-900 font-medium text-md mt-5"
      >
        Password
      </label>
      <Password
        name="password"
        inputId="password"
        disabled={loading}
        onChange={ formikInstance?.handleChange}
        value={formikInstance?.values?.password}
        placeholder="Password"
        feedback={false}
        // toggleMask
        className="w-full custom-input-password flex align-items-center mt-2 p-inputtext-sm "
        inputClassName="inputfocus w-full  md:w-30rem"
      ></Password>
      <ErrorMsg msg={formikInstance?.errors?.password} />
      <div className="flex align-items-center justify-content-between mb-5 gap-5">
        {/* <div className="flex align-items-center">
          <Checkbox
            inputId="rememberme1"
            // checked={props.checked}
            // onChange={(e) => props.setChecked(e.checked ?? false)}
            className="mr-2"
          ></Checkbox>
          <label htmlFor="rememberme1">Remember me</label>
        </div> */}
        <a
          className="font-medium text-sm no-underline mt-2 ml-0 text-right cursor-pointer"
          style={{ color: 'var(--primary-color)' }}
          href="/auth/login/forgot-password"
        >
          ¿Has olvidado tu contraseña?
        </a>
      </div>
    </>
  );
}

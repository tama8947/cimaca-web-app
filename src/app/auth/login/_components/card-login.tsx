'use client';
import { type FormikConfig, useFormik } from 'formik';
import { useRouter } from 'next/navigation';
import { Button } from 'primereact/button';
import { classNames } from 'primereact/utils';
import { useContext, useState } from 'react';
import { NotificationContext } from '@/components/layouts/app-layout/contexts/custom-context';
import { LayoutContext } from '@/components/layouts/app-layout/contexts/layout-context';
import { initialValuesLoginSchema, loginSchema } from '../schemas/login-schema';
import { type TypeLoginData } from '../types/login-types';
import {
  CardInputs,
  TitleCard
} from './_components-card-login/card-components';
import { submitAction } from './functions/cardlogin-actions';

function CardLogin () {
  const [loading, setLoading] = useState(false);
  const { layoutConfig } = useContext(LayoutContext);
  const router = useRouter();
  const toast = useContext(NotificationContext);
  const containerClassName = classNames(
    'surface-ground flex w-full align-items-center justify-content-center min-h-screen min-w-screen overflow-hidden',
    { 'p-input-filled': layoutConfig.inputStyle === 'filled' }
  );
  const optionsFormik: FormikConfig<TypeLoginData> = {
    initialValues    : initialValuesLoginSchema,
    validationSchema : loginSchema,
    onSubmit         : async (data) => { submitAction({ setLoading, data, router, toast }); }
  };

  const formik = useFormik(optionsFormik);

  return (
    <div className={containerClassName}>
      <div className="flex flex-column w-9 sm:w-8 md:w-7 lg:w-auto align-items-center justify-content-center">
        {/* <img
          src={`/layout/images/logo-${
            layoutConfig.colorScheme === "light" ? "dark" : "white"
          }.svg`}
          alt="Sakai logo"
          className="mb-5 w-6rem flex-shrink-0"
        /> */}
        <div
          style={{
            borderRadius : '56px',
            padding      : '0.3rem',
            background:
              'linear-gradient(180deg, var(--primary-color) 10%, rgba(33, 150, 243, 0) 30%)'
          }}
          className="w-full"
        >
          <div
            className="w-full surface-card py-8 px-6 sm:px-7"
            style={{ borderRadius: '53px' }}
          >
            <TitleCard />
            <form onSubmit={formik.handleSubmit}>
              <CardInputs
                loading={loading}
                formikInstance={formik}
              ></CardInputs>
              <Button
                loading={loading}
                label="Sign In"
                size="small"
                className="w-full text-md"
                type="submit"
              ></Button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CardLogin;

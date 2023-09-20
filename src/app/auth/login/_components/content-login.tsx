'use client';
import { type FormikConfig, useFormik } from 'formik';
import { useRouter } from 'next/navigation';
import { Button } from 'primereact/button';
import { useContext, useState } from 'react';
import { NotificationContext } from '@/components/layouts/app-layout/contexts/custom-context';
import StyledBorderCard from '@/components/molecules/styled-border-card/styled-border-card';
import { initialValuesModule, moduleSchema } from '../schemas/login-schema';
import { type ModuleFormData } from '../types/login-types';
import {
  ContentHead,
  ContentInputs
} from './_components-content-login/components-content-login';
import { submitAction } from './functions-content-login/content-content-actions';
import { useCustomRedirectCardLogin } from './functions-content-login/content-content-behaviour';

export default function ContentLogin () {
  const [loading, setLoading] = useState(false);
  const toast = useContext(NotificationContext);

  const router = useRouter();

  const optionsFormik: FormikConfig<ModuleFormData> = {
    initialValues    : initialValuesModule,
    validationSchema : moduleSchema,
    onSubmit         : async (data) => {
      submitAction({ setLoading, data, router, toast });
    }
  };

  const formik = useFormik(optionsFormik);

  useCustomRedirectCardLogin();

  return (
    <StyledBorderCard>
      <ContentHead />
      <form onSubmit={formik.handleSubmit}>
        <ContentInputs loading={loading} formikInstance={formik}></ContentInputs>
        <Button
          loading={loading}
          label="Iniciar Sesión"
          size="small"
          className="w-full text-md"
          type="submit"
        ></Button>
      </form>
    </StyledBorderCard>
  );
}

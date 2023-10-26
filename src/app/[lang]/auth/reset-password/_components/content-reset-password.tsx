'use client';
import { type FormikConfig, useFormik } from 'formik';
import { useRouter, useSearchParams } from 'next/navigation';
import { Button } from 'primereact/button';
import { useContext, useState } from 'react';
import { NotificationContext } from '@/components/layouts/app-layout/contexts/custom-context';
import StyledBorderCard from '@/components/molecules/styled-border-card/styled-border-card';
import {
  initialValuesModule,
  moduleSchema
} from '../schemas/reset-password-schema';
import { type ModuleFormData } from '../types/reset-password-types';
import {
  ContentHead,
  ContentInputs
} from './_components-content-reset-password/components-content-reset-password';
import { submitAction } from './functions-reset-password/content-reset-password-actions';
import { useRedirectTokenValidation } from './functions-reset-password/content-reset-password-behaviour';

export default function ContentResetPassword () {
  const [loading, setLoading] = useState(false);

  const toast = useContext(NotificationContext);

  const router = useRouter();

  const searchParams = useSearchParams();

  const optionsFormik: FormikConfig<ModuleFormData> = {
    initialValues    : initialValuesModule,
    validationSchema : moduleSchema,
    onSubmit         : async (data) => {
      submitAction({
        setLoading,
        data,
        router,
        toast,
        token: searchParams.get('token') as string
      });
    }
  };

  const formik = useFormik(optionsFormik);

  useRedirectTokenValidation();

  return (
    <StyledBorderCard>
      <ContentHead />
      <form onSubmit={formik.handleSubmit}>
        <ContentInputs loading={loading} formikInstance={formik}></ContentInputs>
        <Button
          loading={loading}
          label="Cambiar contraseña"
          size="small"
          className="w-full text-md"
          type="submit"
        ></Button>
      </form>
    </StyledBorderCard>
  );
}

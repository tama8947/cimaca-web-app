'use client';
import { type FormikConfig, useFormik } from 'formik';
import { useRouter } from 'next/navigation';
import { Button } from 'primereact/button';
import { useContext, useState } from 'react';
import {
  initialValuesModule,
  moduleSchema
} from '../schemas/forgot-password-schema';
import { type ModuleFormData } from '../types/forgot-password.types';
import {
  ContentHead,
  ContentInputs
} from './_components-content-forgot-password/components-content-forgot-password';
import { submitAction } from './functions-content-forgot-password/content-forgot-password-actions';
import { NotificationContext } from '@/components/layouts/app-layout/contexts/custom-context';
import StyledBorderCard from '@/components/molecules/styled-border-card/styled-border-card';

export default function ContentForgotPassword () {
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

  return (
    <StyledBorderCard>
      <ContentHead />
      <form onSubmit={formik.handleSubmit}>
        <ContentInputs loading={loading} formikInstance={formik}></ContentInputs>
        <Button
          loading={loading}
          label="Enviar enlace de recuperación"
          size="small"
          className="w-full text-md"
          type="submit"
        ></Button>
      </form>
    </StyledBorderCard>
  );
}

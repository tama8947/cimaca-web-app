import { object, string } from 'yup';
import { type ModuleFormData } from '../types/forgot-password.types';

const emailInvalidmessage =
  'El formato de email debe ser válido, ejemplo: micorreo@dominio.com';

const fieldsValidations = {
  email: string()
    .email(emailInvalidmessage)
    .required('Este campo es requerido')
};

export const moduleSchema = object().shape(fieldsValidations);

export const initialValuesModule = Object.keys(fieldsValidations).reduce(
  (previous, current) => ({ ...previous, [current]: '' }),
  {}
) as unknown as ModuleFormData;

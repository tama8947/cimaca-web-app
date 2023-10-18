import { object, string } from 'yup';
import { type TypeLoginData } from '../types/login-types';

const emailInvalidmessage =
  'El formato de email debe ser válido, ejemplo: micorreo@dominio.com';

const fieldsValidations = {
  email: string()
    .email(emailInvalidmessage)
    .required('Este campo es requerido'),
  password: string().required('Este campo es requerido')
};

export const loginSchema = object().shape(fieldsValidations);

export const initialValuesLoginSchema = Object.keys(fieldsValidations).reduce(
  (previous, current) => ({ ...previous, [current]: '' }),
  {}
) as unknown as TypeLoginData;

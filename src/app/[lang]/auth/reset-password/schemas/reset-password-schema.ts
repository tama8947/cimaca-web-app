import { object, ref, string } from 'yup';
import { type ModuleFormData } from '../types/reset-password-types';

const fieldsValidations = {
  password: string()
    .required('Este campo es requerido')
    .min(8, 'La contraseña debe tener al menos 8 caracteres')
    .test(
      'has-uppercase',
      'La contraseña debe contener al menos una letra mayúscula',
      (value) => /[A-Z]/.test(value)
    )
    .test(
      'has-lowercase',
      'La contraseña debe contener al menos una letra minúscula',
      (value) => /[a-z]/.test(value)
    )
    .test(
      'has-number',
      'La contraseña debe contener al menos un número',
      (value) => /\d/.test(value)
    )
    .test(
      'has-special-character',
      'La contraseña debe contener al menos un carácter especial admitido (@$!%*?&-_...)',
      (value) => /[`!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?~ºª¡¿]/.test(value)
    ),
  passwordConfirmation: string()
    .required('Este campo es requerido')
    .min(8, 'La contraseña debe tener al menos 8 caracteres')
    .test(
      'has-uppercase',
      'La contraseña debe contener al menos una letra mayúscula',
      (value) => /[A-Z]/.test(value)
    )
    .test(
      'has-lowercase',
      'La contraseña debe contener al menos una letra minúscula',
      (value) => /[a-z]/.test(value)
    )
    .test(
      'has-number',
      'La contraseña debe contener al menos un número',
      (value) => /\d/.test(value)
    )
    .test(
      'has-special-character',
      'La contraseña debe contener al menos un carácter especial admitido (@$!%*?&-_...)',
      (value) => /[`!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?~ºª¡¿]/.test(value)
    ).oneOf([ref('password')], 'Las contraseñas no coinciden')
};

export const moduleSchema = object().shape(fieldsValidations);

export const initialValuesModule = Object.keys(fieldsValidations).reduce(
  (previous, current) => ({ ...previous, [current]: '' }),
  {}
) as unknown as ModuleFormData;

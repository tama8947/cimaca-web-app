import { type useFormik } from 'formik';
import { type InferType } from 'yup';
import { type loginSchema } from '../schemas/login-schema';

export type TypeLoginData = InferType<typeof loginSchema>

export type FormikInstanceLogin = ReturnType<typeof useFormik<TypeLoginData>>

import { type useFormik } from 'formik';
import { type InferType } from 'yup';
import { type moduleSchema } from '../schemas/forgot-password-schema';

export type ModuleFormData = InferType<typeof moduleSchema>

export type FormikInstance = ReturnType<typeof useFormik<ModuleFormData>>
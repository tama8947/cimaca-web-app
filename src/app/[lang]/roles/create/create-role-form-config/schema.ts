import * as yup from 'yup';

export const validationSchema = yup.object().shape({
  name   : yup.string().required(),
  roleId : yup.string().required(),
  state  : yup.string().required()
});

export type UserCreateData = yup.InferType<typeof validationSchema>

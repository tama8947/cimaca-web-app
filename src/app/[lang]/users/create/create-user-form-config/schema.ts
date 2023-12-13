import * as yup from 'yup';

export const validationSchema = yup.object().shape({
  name     : yup.string().required(),
  email    : yup.string().email('Invalid mail').required(),
  password : yup.string().required(),
  state    : yup.string().oneOf(['enabled', 'disabled']).required(),
  roleId   : yup.string().required()
});

export type UserCreateData = yup.InferType<typeof validationSchema>

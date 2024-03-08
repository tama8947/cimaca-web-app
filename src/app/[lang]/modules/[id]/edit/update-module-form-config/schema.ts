import * as yup from 'yup';

export const validationSchema = yup.object().shape({
  name  : yup.string().required(),
  label : yup.string().required(),
  icon  : yup.string().required(),
  url   : yup.string().required(),
  state : yup.string().required()
});

export type ModuleUpdateData = yup.InferType<typeof validationSchema>

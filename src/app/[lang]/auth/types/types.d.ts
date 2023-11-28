declare type SubmitAuthActionFunction<ModuleFormData> = {
  setLoading: Dispatch<SetStateAction<boolean>>
  data: ModuleFormData
  router: AppRouterInstance
  toast: MutableRefObject<Toast | null> | undefined
  token?: string
}

declare type ParamsFocusErrorFunction<FormikInstance> = {
  formikInstance?: FormikInstance
  messageError?: string
}

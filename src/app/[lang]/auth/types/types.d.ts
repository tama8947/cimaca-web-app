declare interface SubmitAuthActionFunction<ModuleFormData> {
  setLoading: Dispatch<SetStateAction<boolean>>
  data: ModuleFormData
  router: AppRouterInstance
  toast: MutableRefObject<Toast | null> | undefined
  token?: string
}

declare interface ParamsFocusErrorFunction<FormikInstance> {
  formikInstance?: FormikInstance
  messageError?: string
}

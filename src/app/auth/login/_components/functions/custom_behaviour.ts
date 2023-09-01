import { FormikTouched } from "formik";
import { FormikInstanceLogin, TypeLoginData } from "../../types/login_types";

type NameInput = keyof FormikTouched<TypeLoginData>;
type ParamsFocusErrorFunction = {
  formikInstance?: FormikInstanceLogin;
  messageError?: string;
};
export const focusOnError = (params: ParamsFocusErrorFunction) => {
  const { formikInstance, messageError } = params;
  if (formikInstance?.isSubmitting) {
    const inputs = document.querySelectorAll<HTMLInputElement>(".inputfocus");
    for (const input of Array.from(inputs)) {
      if (formikInstance.errors[input.name as NameInput]) {
        input.focus();
        return;
      }
    }
  }

  if (messageError?.includes("No existe el usuario ingresado")) {
    setTimeout(() =>
      document.querySelector<HTMLInputElement>("#email")?.focus(),100
    );
  }
  if (messageError?.includes("Contraseña Incorrecta")) {
    setTimeout(() =>
      document.querySelector<HTMLInputElement>("#password")?.focus(),100
    );
  }
};

import { signIn } from "next-auth/react";
import { focusOnError } from "./custom_behaviour";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context";
import { Dispatch, MutableRefObject, SetStateAction } from "react";
import { Toast } from "primereact/toast";
import { TypeLoginData } from "../../types/login_types";
type SubmitActionFunction = {
  setLoading: Dispatch<SetStateAction<boolean>>;
  data: TypeLoginData;
  router: AppRouterInstance;
  toast: MutableRefObject<Toast | null> | undefined;
};
export const submitAction = ({
  setLoading,
  data,
  router,
  toast,
}: SubmitActionFunction) => {
  setLoading(true);
  signIn("credentials", { ...data, redirect: false }).then((res) => {
    res?.error &&
      toast?.current?.show({
        summary: "Error",
        detail: res.error,
        severity: "error",
      });
    res?.error && focusOnError({ messageError: res.error });
    !res?.error &&
      toast?.current?.show({
        summary: "Sesión Iniciada",
        detail: "Inicio de sesión exitoso",
        severity: "success",
      });
    !res?.error && router.push("/dashboard");
    setLoading(false);
  });
};

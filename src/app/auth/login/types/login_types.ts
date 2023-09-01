import { InferType } from "yup";
import { loginSchema } from "../schemas/login_schema";
import { useFormik } from "formik";

export type TypeLoginData = InferType<typeof loginSchema>

export type FormikInstanceLogin = ReturnType<typeof useFormik<TypeLoginData>>
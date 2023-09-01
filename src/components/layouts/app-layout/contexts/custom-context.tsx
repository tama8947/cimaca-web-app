import { Toast } from "primereact/toast";
import { createContext } from "react";

export const NotificationContext = createContext<
    React.MutableRefObject<Toast | null> | undefined
>(undefined);
import { type ButtonProps } from 'primereact/button';
import { type ColumnProps } from 'primereact/column';

export type CustomColumnProps = ColumnProps & { dataType?: 'date' | 'numeric' | null }

export type ActionButton = ButtonProps & {
  goto?: string
  isstatebutton?: 'true' | 'false'
  labeldisabled?: string
  severityenabled?: 'primary' | 'secondary' | 'success' | 'info' | 'warning' | 'danger' | 'light' | 'dark'
  severitydisabled?: 'primary' | 'secondary' | 'success' | 'info' | 'warning' | 'danger' | 'light' | 'dark'
};

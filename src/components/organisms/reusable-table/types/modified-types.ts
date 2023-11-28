import { type ColumnProps } from 'primereact/column';

export type CustomColumnProps = ColumnProps & { dataType?: 'date' | 'numeric' | null }

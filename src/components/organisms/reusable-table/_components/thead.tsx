import { InputText } from 'primereact/inputtext';

interface THeadReusableTableProps {
  globalFilterValue: string
  onGlobalFilterChange: React.ChangeEventHandler<HTMLInputElement>
}

export default function THead ({ globalFilterValue, onGlobalFilterChange }: THeadReusableTableProps) {
  return <div className="flex justify-content-end">
 <span className="p-input-icon-left">
     <i className="pi pi-search" />
     <InputText value={globalFilterValue} onChange={onGlobalFilterChange} placeholder="Keyword Search" />
 </span>
</div>;
}

import { InputText, type InputTextProps } from 'primereact/inputtext';
import { classNames } from 'primereact/utils';
import { type ForwardedRef, forwardRef } from 'react';
import './input.scss';

type PropsInput = {
  readonly id?: string
  readonly label?: string
  readonly error?: boolean
  readonly errorMessage?: string
} & InputTextProps

export default forwardRef(
  function Input ({ errorMessage, ...props }: PropsInput,
    ref: ForwardedRef<HTMLInputElement>) {
    const { id, label } = props;
    const classes = classNames('p-inputtext-sm', { 'p-invalid': errorMessage });
    return <>
      <label htmlFor={id}>{label}</label>
      <InputText ref={ref} {...props} type="text" className={classes}/>
      {(errorMessage !== undefined) && <small
     className='p-error'>{errorMessage}</small>}
    </>;
  });

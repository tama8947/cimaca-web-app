import React from 'react';

type PropsErrorMsg = { readonly msg: string | undefined }

export default function ErrorMsg (props: PropsErrorMsg) {
  return <small className="p-error">{props.msg ?? ''}</small>;
}

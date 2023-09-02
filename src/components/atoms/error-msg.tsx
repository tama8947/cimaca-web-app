import React from 'react';

interface PropsErrorMsg { msg: string | undefined }

export default function ErrorMsg (props: PropsErrorMsg) {
  return <small className="p-error">{props.msg ?? ''}</small>;
}

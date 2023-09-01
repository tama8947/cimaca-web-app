import React from 'react'
type PropsErrorMsg={msg: string |undefined}
function ErrorMsg(props:PropsErrorMsg) {
  return (
    <small className='p-error'>{props.msg??""}</small>
  )
}

export default ErrorMsg
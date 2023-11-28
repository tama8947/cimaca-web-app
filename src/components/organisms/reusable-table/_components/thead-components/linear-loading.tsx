import { ProgressBar } from 'primereact/progressbar';
// import { useEffect, useState } from 'react';

export default function LinearLoading ({ loading = false }:
{ readonly loading: boolean }) {
  // const [value, setValue] = useState(0);
  // const [hidden, setHidden] = useState(true);

  // useEffect(() => {
  //   if (!loading) {
  //     setValue(0);

  //     setTimeout(() => {
  //       setValue(100);
  //       setHidden(true);
  //     }, 800);
  //   } else {
  //     setHidden(false);
  //     setValue(0);
  //     setValue(50);
  //   }
  // }, [loading]);

  // useEffect(() => {
  //   setValue(50);
  // }, []);
  return <ProgressBar value={'value'}
    style={{ height: '2px'/* , opacity: hidden ? 0 : 1 */ }}>

  </ProgressBar>;
};

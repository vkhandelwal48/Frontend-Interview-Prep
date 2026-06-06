import { useId, useRef } from 'react';

export default function Email() {
  const id1 = useId();
  const id2 = useId();
  const ref = useRef(null);
  return (
    <>
      <label htmlFor={id1}>Email</label>
      <input id={id1} type="email" ref={ref} />
      <br />
      <label htmlFor={id2}>Name</label>
      <input id={id2} type="text" />
    </>
  )
}

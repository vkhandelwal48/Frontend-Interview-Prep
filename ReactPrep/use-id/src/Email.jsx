import { useId, useRef } from 'react';

export default function Email() {
  const id = useId();
  const ref = useRef(null);
  return (
    <>
      <label htmlFor={`${id}-email`}>Email</label>
      <input id={`${id}-email`} type="email" ref={ref} />
      <br />
      <label htmlFor={`${id}-name`}>Name</label>
      <input id={`${id}-name`} type="text" />
    </>
  )
}

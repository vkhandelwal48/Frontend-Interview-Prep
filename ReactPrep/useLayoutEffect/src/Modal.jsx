import { useState, useRef, useLayoutEffect } from 'react';

export default function Modal() {
  const [show, setShow] = useState(false);
  const popup = useRef();
  const button = useRef();

  useLayoutEffect(() => {
    if (popup.current == null || button.current == null) return;
    const { bottom } = button.current.getBoundingClientRect();
    popup.current.style.top = `${bottom + 25}px`;
  }, [show]);

  return (
    <>
      <button ref={button} onClick={() => setShow(prev => !prev)}>
        Click Here
      </button>
      {show && (
        <div ref={popup} style={{ position: "absolute" }}>
          This is a popup
        </div>
      )}
    </>
  )
}

// If useEffect was used here, the Text would briefly flash
// in the wrong position before jumping to the correct one.

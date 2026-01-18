import { useEffect, useState } from "react";
import "./index.css";

const Bar = () => {
  const [startTransition, setStartTransition] = useState(false);

  useEffect(() => setStartTransition(true), []);

  return (
    <div className="bar">
      <div className={['bar-contents', startTransition && 'bar-contents-filled'].filter(Boolean).join(' ')}/>
    </div>
  )
}

export default Bar;

import { useState } from "react";
import Bar from "./Bar";
import './index.css';


const ProgressBar = () => {
  const [bars, setBars] = useState(0);
  return (
    <div className="wrapper">
      <div>
        <button onClick={() => setBars(bars + 1)}>Add</button>
      </div>
      <div className="bars">
        {Array(bars).fill(null).map((_, ind) =>(
          <Bar key={ind} />
        ))}
      </div>
    </div>
  )
}

export default ProgressBar;

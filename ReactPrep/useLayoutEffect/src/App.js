import { useState, useEffect } from 'react';

function App() {
  const [count, setCount] = useState(0);

  useEffect (() => {
    console.log(count);
  }, [count]);

  return (
    <>
      <button onClick={() => setCount(c => c + 1)}>Increment</button>
      <button>{count}</button>
    </>
  );
}

export default App;

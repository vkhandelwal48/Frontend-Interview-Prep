import { useState } from 'react';

import Counter from './components/Counter/Counter.jsx';
import Header from './components/Header.jsx';
import { log } from './log.js';
import ConfigureCounter from './components/Counter/ConfigureCounter.jsx';

function App() {
  log('<App /> rendered');

  const [chosenCount, setChosenCount] = useState(0);

  function handleSetCount(newCount) {
    setChosenCount(newCount);
    // this state update is scheduled by React
    // React will re-render App component
    // During the re-render, the new chosenCount value will be used
    // to set the key prop of the first Counter component

    // setChosenCount((prevChosenCount) => prevChosenCount + 1);
    // This demonstrates that multiple state updates in the same event
    // handler are batched together by React.
    // The final chosenCount after this function completes will be
    // the previous chosenCount + 1

    // both state updates are scheduled, but only one re-render will occur
    // after this function completes because React batches state updates
    // console.log(chosenCount); // logs the old chosenCount value
  }

  return (
    <>
      <Header />
      <main>
        <ConfigureCounter onSet={handleSetCount}/>
        <Counter key={chosenCount} initialCount={chosenCount} />
        // key value here ensures that the Counter component is remounted
        // whenever the chosenCount changes, resetting its internal state.
        <Counter initialCount={0} />
      </main>
    </>
  );
}

export default App;

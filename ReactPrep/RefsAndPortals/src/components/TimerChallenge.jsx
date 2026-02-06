import { useRef, useState } from "react";
import ResultModal from "./ResultModal";

export default function TimerChallenge({ title, targetTime }) {
  const timer = useRef();
  const dialog = useRef();
  const [timerStarted, setTimerStarted] = useState(false);

  function handleStart() {
    setTimerStarted(true);
    timer.current = setTimeout(() => {
      dialog.current.showModal();// standard browser feature
    }, targetTime * 1000);
  }

  function handleStop() {
    clearTimeout(timer.current);
  }
  return (
    <>
      <ResultModal ref={dialog} targetTime={targetTime} result="lost" />
      <section className="challenge">
        <h2>{title}</h2>
        <p className="challenge-time">
          {targetTime} second{targetTime > 1 ? "s" : ""}
        </p>
        <p>
          <button onClick={timerStarted ? handleStop : handleStart}>{timerStarted ? "Stop" : "Start"} Challenge</button>
        </p>
        <p className={timerStarted ? "active" : ""}>
          {timerStarted ? "Time is running..." : "Timer inactive"}
        </p>
      </section>
    </>
  )
}

// We cannot use timer variable to store the timeout ID because it will be re-initialized on every render,
// and we would lose the reference to the original timer. This means that when we call clearTimeout(timer),
// it would not clear the correct timer, leading to unexpected behavior. To fix this,
// we can use a ref to store the timer ID, which will persist across renders and allow us
// to correctly clear the timeout when needed.

// now we have defined timer variable outside the component, so it will not be re-initialized on every render,
// and we can use it to store the timeout ID. When the component re-renders, the timer variable will
// still hold the correct timeout ID, allowing us to clear the timeout correctly when the user clicks the 
// "Stop Challenge" button but in case of multiple TimerChallenge components, they will all share the same
// timer variable, which can lead to conflicts and unexpected behavior.

// To avoid this, we can use a ref to store the timer ID for each instance of the TimerChallenge component,
// ensuring that each component has its own timer and can manage it independently.
// as timer is not a state variable, changes to it will not trigger a re-render of the component,
// which is why we can use it to store the timer ID without causing unnecessary re-renders.

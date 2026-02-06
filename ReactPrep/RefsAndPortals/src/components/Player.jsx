import { useRef, useState } from "react";

export default function Player() {
  const playerName = useRef();
  // const [enteredPlayerName, setEnteredPlayerName] = useState("");

  function handleClick() {
    // setEnteredPlayerName(playerName.current.value);
    playerName.current.value = ""; // changing dom value directly, not recommended but works for this example
  }

  return (
    <section id="player">
      <h2>Welcome {playerName.current ? playerName.current.value : "unknown entity"}</h2>
      <p>
        <input ref={playerName} type="text" />
        <button onClick={handleClick}>Set Name</button>
      </p>
    </section>
  );
}

// playerName.current remains undefined on initial render, but after the first render,
// it will be set to the input element. When the button is clicked, handleClick will 
// read the current value of the input field using playerName.current.value and
// update the enteredPlayerName state. This will cause the component to re-render and
// display the updated name.

// So whenever the button is clicked, the name displayed in the <h2> will update to reflect the current value of the input field.
// but there won't be any re-render when the input value changes, only when the button is clicked,
// because the state is only updated in the handleClick function.
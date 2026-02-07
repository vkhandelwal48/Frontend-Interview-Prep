import { useImperativeHandle, useRef } from "react";
import { createPortal } from "react-dom";

export default function ResultModal({ ref, remainingTime, targetTime, onReset }) {
	const dialogRef = useRef();
	const score = Math.round((1 -  remainingTime / (targetTime * 1000)) * 100)
	useImperativeHandle(ref, () => {
		return {
			open() {
				dialogRef.current.showModal();
			}
		};
	});
	return createPortal(
		<dialog ref={dialogRef} className="result-modal">
			<h2>{remainingTime <= 0 ? "You lost" : `Your Score: ${score}`}!</h2>
			<p>The target time was <strong>{targetTime} seconds.</strong></p>
			<p>You stopped the timer with <strong>{(remainingTime / 1000).toFixed(2)} seconds left.</strong></p>
			<form method="dialog" onSubmit={onReset}>
				<button>Close</button>
			</form>
		</dialog>,
		document.getElementById("modal")
	);
}

// createPortal takes 1st argument as the JSX we want to render and
// 2nd argument is the DOM node where we want to render that JSX.
// In this case, we are rendering the dialog element in the body of the document.
// This allows us to render the dialog outside of the normal React component hierarchy,
// which is necessary for it to function properly as a modal.

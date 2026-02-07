import { useImperativeHandle, useRef } from "react";

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
	return (
		<dialog ref={dialogRef} className="result-modal">
			<h2>{remainingTime <= 0 ? "You lost" : `Your Score: ${score}`}!</h2>
			<p>The target time was <strong>{targetTime} seconds.</strong></p>
			<p>You stopped the timer with <strong>{(remainingTime / 1000).toFixed(2)} seconds left.</strong></p>
			<form method="dialog" onSubmit={onReset}>
				<button>Close</button>
			</form>
		</dialog>
	);
}

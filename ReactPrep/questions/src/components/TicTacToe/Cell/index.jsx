import './index.css';

const Cell = ({ index, mark, disabled, turn, onClick }) => {
  return (
    <button
      aria-label={mark === null ? `Mark cell ${index} as ${turn}`: undefined}
      className="cell"
      disabled={disabled}
      onClick={onClick}
    >
      <span>{mark}</span>
    </button>
  )
}

export default Cell;

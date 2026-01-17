import { useState } from "react"
import Cell from "./Cell";
import './index.css';

const CELLS_IN_A_LINE = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
]

const determineWinner = (board) => {
  for(let i = 0; i < CELLS_IN_A_LINE.length; i++) {
    const [a, b, c] = CELLS_IN_A_LINE[i];
    if(board[a] === board[b] && board[b] === board[c]) {
      return board[a];
    }
  }
  return null;
}

const TicTacToe = () => {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [xIsPlaying, setXIsPlaying] = useState(true);

  const winner = determineWinner(board);

  const onReset = () => {
    setBoard(Array(9).fill(null));
    setXIsPlaying(true);
  }

  const getStatusMessage = () => {
    if(winner) {
      return `Winner is ${winner}`;
    }
    if(!board.includes(null)) {
      return "It's a draw!";
    }
    return `Player ${xIsPlaying ? 'X' : 'O'}'s turn`;
  }

  return (
    <div className="tic-tac-toe">
      <div>{getStatusMessage()}</div>
      <div className="board">
        {Array(9).fill(null).map((_, index) => index).map((cellIndex) => {
          return (
            <Cell
              key={cellIndex}
              disabled={board[cellIndex] !== null || winner !== null}
              index={cellIndex}
              mark={board[cellIndex]}
              onClick={() => {
                const newBoard = board.slice();
                newBoard[cellIndex] = xIsPlaying ? 'X' : 'O';
                setBoard(newBoard);
                setXIsPlaying(!xIsPlaying);
              }}
            />
          )
        })}
      </div>
      <button
        onClick = {() => {
          if(!winner) {
            const confirm = window.confirm("Are you sure you want to reset the game?");
            if(!confirm) {
              return;
            }
          }
          onReset();
        }}
      >
        Reset
      </button>
    </div>
  )
}

export default TicTacToe;

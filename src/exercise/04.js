// useState: tic tac toe
// http://localhost:3000/isolated/exercise/04.js

import * as React from 'react'
import {useLocalStorageState} from '../utils'

// const KEY = 'squares'
const HISTORY_KEY = 'history'
const CURRENT_KEY = 'current'
const EMPTY = Array(9).fill(null)

function Board({squares, onSelectSquare}) {
  // const [squares, setSquares] = useLocalStorageState(KEY, EMPTY)
  // const [squares, setSquares] = React.useState(() => {
  //   const squaresFromStorage = window.localStorage.getItem(KEY)
  //   return squaresFromStorage ? JSON.parse(squaresFromStorage) : EMPTY
  // })

  // React.useEffect(() => {
  //   window.localStorage.setItem(KEY, JSON.stringify(squares))
  // }, [squares])

  // const nextValue = calculateNextValue(squares)
  // const winner = calculateWinner(squares)
  // const status = calculateStatus(winner, squares, nextValue)

  // function selectSquare(square) {
  // if (winner || squares[square]) {
  //   return
  // }

  // const updatedSquares = [...squares]
  // updatedSquares[square] = nextValue

  // setSquares(updatedSquares)
  // }

  // function restart() {
  //   setSquares(EMPTY)
  // }

  function renderSquare(i) {
    return (
      <button className="square" onClick={() => onSelectSquare(i)}>
        {squares[i]}
      </button>
    )
  }

  return (
    <div>
      {/* <div className="status">{status}</div> */}
      <div className="board-row">
        {renderSquare(0)}
        {renderSquare(1)}
        {renderSquare(2)}
      </div>
      <div className="board-row">
        {renderSquare(3)}
        {renderSquare(4)}
        {renderSquare(5)}
      </div>
      <div className="board-row">
        {renderSquare(6)}
        {renderSquare(7)}
        {renderSquare(8)}
      </div>
      {/* <button className="restart" onClick={restart}>
        restart
      </button> */}
    </div>
  )
}

function Game() {
  const [history, setHistory] = useLocalStorageState(HISTORY_KEY, [EMPTY])
  const [currentStep, setCurrentStep] = useLocalStorageState(CURRENT_KEY, 0)

  const currentSquares = history[currentStep]

  const nextValue = calculateNextValue(currentSquares)
  const winner = calculateWinner(currentSquares)
  const status = calculateStatus(winner, currentSquares, nextValue)

  function restart() {
    setHistory([EMPTY])
    setCurrentStep(0)
  }

  const moves = history.map((squares, step) => {
    const isCurrentStep = step === currentStep
    const description = step === 0 ? 'Go to game start' : `Go to move #${step}`
    return (
      <li key={step}>
        <button
          disabled={isCurrentStep}
          onClick={() => {
            setCurrentStep(step)
          }}
        >
          {description} {isCurrentStep && '(current)'}
        </button>
      </li>
    )
  })

  function handleSelectSquare(square) {
    if (winner || currentSquares[square]) {
      return
    }

    const nextSquares = [...currentSquares]
    nextSquares[square] = nextValue

    setHistory([...history.slice(0, currentStep + 1), nextSquares])
    setCurrentStep(currentStep + 1)
  }

  return (
    <div className="game">
      <div className="game-board">
        <Board
          squares={currentSquares.squares}
          onSelectSquare={handleSelectSquare}
        />
        <button className="restart" onClick={restart}>
          restart
        </button>
      </div>
      <div className="game-info">
        <div>{status}</div>
        <ol>{moves}</ol>
      </div>
    </div>
  )
}

function calculateStatus(winner, squares, nextValue) {
  return winner
    ? `Winner: ${winner}`
    : squares.every(Boolean)
    ? `Scratch: Cat's game`
    : `Next player: ${nextValue}`
}

function calculateNextValue(squares) {
  const xSquaresCount = squares.filter(r => r === 'X').length
  const oSquaresCount = squares.filter(r => r === 'O').length
  return oSquaresCount === xSquaresCount ? 'X' : 'O'
}

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ]
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i]
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a]
    }
  }
  return null
}

function App() {
  return <Game />
}

export default App

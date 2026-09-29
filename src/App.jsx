import Die from "./components/Die"
import Header from "./components/Header"
import { useState, useRef, useEffect } from "react"
import { nanoid } from "nanoid"
import ReactConfetti from "react-confetti"

export default function App() {

  const [dice, setDice] = useState(() => generateAllNewDice())

  const newGameRef = useRef(null)

  const gameWon = dice.every(die => die.isHeld === true && die.value === dice[0].value)

  useEffect(() => {
    if(gameWon){newGameRef.current.focus()}
  },[gameWon])

  // u dont have use effect everytime, especially if u can control it with react, use effect only for things beyond the control of react

  function generateAllNewDice() {
    // const randomNumbers = Array.from(Array(10), () => Math.floor((Math.random() * 6) + 1))
    // const numbers = [...Array(10)]
    // const randomNumbers = numbers.map(() => (Math.floor((Math.random() * 6) + 1 )))
    return new Array(10)
      .fill({})
      .map(() => {
        return {
          id: nanoid(),
          // Math.floor((Math.random() * 6) + 1)
          value: 5,
          isHeld: false
        }
      })
  }

  function rollDice() {

    gameWon ?
      setDice(generateAllNewDice()) :
      setDice(prevDice => prevDice.map(die => (
        die.isHeld ?
          die :
          { ...die, value: Math.floor((Math.random() * 6) + 1) }
      )))
  }

  function hold(id) {
    setDice(prevDice => {
      return prevDice.map(die => die.id === id ? { ...die, isHeld: !die.isHeld } : die)
    })
  }


  const diceElements = dice.map((die) =>
    <Die key={die.id}
      value={die.value}
      isHeld={die.isHeld}
      hold={() => hold(die.id)}
    />)

  return (
    <main>
      {gameWon ? <ReactConfetti /> : undefined}
      <div aria-live="polite" className="sr-only">
        {gameWon? <p>Congrats you won the game</p> : undefined}
      </div>
      <Header />
      <div className="dice-container">
        {diceElements}
      </div>
      <button
        ref={newGameRef}
        className="roll-button"
        onClick={rollDice}
      >{gameWon ? "New Game" : "Roll"}
      </button>
    </main>
  )
}
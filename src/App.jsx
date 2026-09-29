import Die from "./components/Die"
import Header from "./components/Header"
import { useState } from "react"
import { nanoid } from "nanoid"
import ReactConfetti from "react-confetti"

export default function App() {

  const [dice, setDice] = useState(generateAllNewDice())

  const gameWon = dice.every(die => die.isHeld === true && die.value === dice[0].value)


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
          value: Math.floor((Math.random() * 6) + 1),
          isHeld: false
        }
      })
  }

  function rollDice() {
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
      {gameWon?  <ReactConfetti /> : undefined}
      <Header />
      <div className="dice-container">
        {diceElements}
      </div>
      <button
        className="roll-button"
        onClick={rollDice}
      >{gameWon ? "New Game" : "Roll"}
      </button>
    </main>
  )
}
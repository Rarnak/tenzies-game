import Die from "./components/Die"
import { useState } from "react"
import { nanoid } from "nanoid"

export default function App() {

  const [dice, setDice] = useState(generateAllNewDice())

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
    setDice(generateAllNewDice())
  }

  function hold(id) {
    setDice(prevDice => {
      return prevDice.map(die => die.id === id ? {...die, isHeld: !die.isHeld} : die)
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
      <div className="dice-container">
        {diceElements}
      </div>
      <button
        className="roll-button"
        onClick={rollDice}
      >Roll</button>
    </main>
  )
}
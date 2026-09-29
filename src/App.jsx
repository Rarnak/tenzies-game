import Die from "./components/Die"
import { useState } from "react"

export default function App() {

  const [dice, setDice] = useState(generateAllNewDice())

  function generateAllNewDice() {
    // const randomNumbers = Array.from(Array(10), () => Math.floor((Math.random() * 6) + 1))
    // const numbers = [...Array(10)]
    // const randomNumbers = numbers.map(() => (Math.floor((Math.random() * 6) + 1 )))
    return new Array(10)
      .fill({})
      .map(() => {return {
        value:Math.floor((Math.random() * 6) + 1),
        isheld: false
      }})
  }

  function rollDice(){
    setDice(generateAllNewDice())
  }


  const diceElements = dice.map((die) => <Die value={die.value} />)

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
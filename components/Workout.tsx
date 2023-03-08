import { useState, useRef, useEffect } from 'react'

const initialSecondsLeft = 3
const initialTimerNumber = 3

export default function Workout() {
  const [secondsLeft, setSecondsLeft] = useState(initialSecondsLeft)
  const [timerNumber, setTimerNumber] = useState(initialTimerNumber)

  let timer = useRef<any>(0)

  function handleStartTimer() {
    timer.current = setInterval(() => {
      setSecondsLeft((s) => s - 1)
    }, 1000)
  }

  useEffect(() => {
    console.log(timer.current)
    if (secondsLeft === 0) {
      setSecondsLeft(initialSecondsLeft)
      setTimerNumber((s) => s - 1)
    }
    if (timerNumber === 0) {
      clearInterval(timer.current)
      timer.current = 0
      setTimerNumber(initialTimerNumber)
    }
  })

  return (
    <>
      <button onClick={handleStartTimer}>Start Timer</button>
      <div>Timer Number: {timerNumber}</div>
      <div>Seconds Left: {secondsLeft}</div>
    </>
  )
}

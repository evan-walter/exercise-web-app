import { useState, useRef, useEffect } from 'react'

const initialSecondsLeft = 3
const initialTimerNumber = 3
const initialCyclesLeft = 3

export default function Workout() {
  const [secondsLeft, setSecondsLeft] = useState(initialSecondsLeft)
  const [timerNumber, setTimerNumber] = useState(initialTimerNumber)
  const [cyclesLeft, setCyclesLeft] = useState(initialCyclesLeft)

  let timer = useRef<any>(0)

  function handleStartTimer() {
    timer.current = setInterval(() => {
      setSecondsLeft((s) => s - 1)
    }, 1000)
  }

  useEffect(() => {
    if (secondsLeft === 0) {
      setSecondsLeft(initialSecondsLeft)
      setTimerNumber((s) => s - 1)
    }
    if (timerNumber === 0) {
      setTimerNumber(initialTimerNumber)
      setCyclesLeft((s) => s - 1)
    }
    if (cyclesLeft === 0) {
      clearInterval(timer.current)
      timer.current = 0
      setCyclesLeft(initialCyclesLeft)
    }
  }, [secondsLeft, timerNumber, cyclesLeft])

  return (
    <>
      <div className='flex flex-col gap-y-4'>
        <div>
          <button onClick={handleStartTimer}>Start Timer</button>
        </div>
        <div>Cycles Left: {cyclesLeft}</div>
        <div
          className={`${
            timerNumber === 3 ? 'border-amber-600' : 'border-slate-600'
          } w-fit rounded-lg border p-2`}
        >
          <div>Timer Number: {3}</div>
          <div>
            Seconds Left: {timerNumber === 3 ? secondsLeft : initialSecondsLeft}
          </div>
        </div>
        <div
          className={`${
            timerNumber === 2 ? 'border-amber-600' : 'border-slate-600'
          } w-fit rounded-lg border p-2`}
        >
          <div>Timer Number: {2}</div>
          <div>
            Seconds Left: {timerNumber === 2 ? secondsLeft : initialSecondsLeft}
          </div>
        </div>
        <div
          className={`${
            timerNumber === 1 ? 'border-amber-600' : 'border-slate-600'
          } w-fit rounded-lg border p-2`}
        >
          <div>Timer Number: {1}</div>
          <div>
            Seconds Left: {timerNumber === 1 ? secondsLeft : initialSecondsLeft}
          </div>
        </div>
      </div>
    </>
  )
}

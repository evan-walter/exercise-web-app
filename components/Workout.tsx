import { useState, useRef, useEffect } from 'react'

const initialSecondsLeft = 3
const initialMinutesLeft = 1
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

  function displayedSecondsLeft() {}

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
  }, [secondsLeft, timerNumber])

  return (
    <>
      <div className='flex flex-col gap-y-4'>
        <div>
          <button onClick={handleStartTimer}>Start Timer</button>
        </div>
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

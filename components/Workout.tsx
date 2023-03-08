import { useState, useRef } from 'react'

export default function Workout() {
  const [startTime, setStartTime] = useState(0)
  const [now, setNow] = useState(0)
  const [timerId, setTimerId] = useState(1)
  const intervalRef = useRef<any>(null)

  function handleStart() {
    setStartTime(Date.now())
    setNow(Date.now())

    clearInterval(intervalRef.current)
    intervalRef.current = setInterval(() => {
      setNow(Date.now())
    }, 10)
  }

  function handleStop() {
    clearInterval(intervalRef.current)
  }

  let secondsPassed = 0
  if (startTime != null && now != null) {
    secondsPassed = (now - startTime) / 1000
  }

  function handleIncrementTimerId() {
    setTimerId((prevTimerId) => prevTimerId + 1)
  }

  let timerIdVariable = timerId

  if (secondsPassed > 3) {
    console.log('old timerId ', timerId)
    handleStop()
    handleStart()
    handleIncrementTimerId()
    console.log('new timerId ', timerId)
  }

  if (timerIdVariable > 3) {
    handleStop()
    console.log('stopped')
    console.log('intervalRef.current: ', intervalRef.current)
  }

  return (
    <>
      <div>
        <div>Timer ID: {1}</div>
        <div>Time passed: {timerId === 1 ? secondsPassed.toFixed(3) : 0.0}</div>
      </div>
      <div>
        <div>Timer ID: {2}</div>
        <div>Time passed: {timerId === 2 ? secondsPassed.toFixed(3) : 0.0}</div>
      </div>
      <div>
        <div>Timer ID: {3}</div>
        <div>Time passed: {timerId === 3 ? secondsPassed.toFixed(3) : 0.0}</div>
      </div>
      <button onClick={handleStart}>Start</button>
      <button onClick={handleStop}>Stop</button>
    </>
  )
}

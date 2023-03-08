import { useState, useRef, useEffect } from 'react'

const initialCyclesLeft = 19
const initialMinutesLeft = 0
const initialSecondsLeft = 5

export default function Workout() {
  // Old useState declarations
  const [isEditingCycles, setIsEditingCycles] = useState(false)
  const [isCreatingTimer, setIsCreatingTimer] = useState(false)
  const [inputCycles, setInputCycles] = useState(19)
  const [inputTitle, setInputTitle] = useState('Low')
  const [inputMinutes, setInputMinutes] = useState(0)
  const [inputSeconds, setInputSeconds] = useState(5)
  const [initialTimers, setInitialTimers] = useState<any>([])
  const [isCountingDown, setIsCountingDown] = useState(false)
  const [isPaused, setIsPaused] = useState(false)

  // New useState declarations
  const [currentSecondsLeft, setCurrentSecondsLeft] =
    useState(initialSecondsLeft)
  const [currentMinutesLeft, setCurrentMinutesLeft] =
    useState(initialMinutesLeft)
  const [currentTimerId, setCurrentTimerId] = useState(1)
  const [currentCyclesLeft, setCurrentCyclesLeft] = useState(initialCyclesLeft)

  let countDown = useRef<any>(0)

  // New helper function
  function handleStartTimer() {
    setIsCountingDown(true)
    countDown.current = setInterval(() => {
      setCurrentSecondsLeft(
        (prevCurrentSecondsLeft) => prevCurrentSecondsLeft - 1
      )
    }, 1000)
  }

  let currentSecondsLeftVariable = currentSecondsLeft
  let currentTimerIdVariable = currentTimerId
  let currentCyclesLeftVariable = currentCyclesLeft
  let initialTimersVariable = initialTimers

  function handleSetState(setState: any, state: any) {
    setState(state)
  }

  // New useEffect
  if (currentSecondsLeftVariable === 0) {
    // setCurrentSecondsLeft(initialSecondsLeft)
    handleSetState(setCurrentSecondsLeft, initialSecondsLeft)
    // setCurrentTimerId((prevCurrentTimerId) => prevCurrentTimerId + 1)
    handleSetState(
      setCurrentTimerId,
      (prevCurrentTimerId: any) => prevCurrentTimerId + 1
    )
  }
  if (currentTimerIdVariable === initialTimersVariable.length + 1) {
    // setCurrentTimerId(1)
    handleSetState(setCurrentTimerId, 1)
    // setCurrentCyclesLeft((prevCurrentCyclesLeft) => prevCurrentCyclesLeft - 1)
    handleSetState(
      setCurrentCyclesLeft,
      (prevCurrentCyclesLeft: any) => prevCurrentCyclesLeft - 1
    )
  }
  // // if (currentCyclesLeftVariable === 0) {
  // //   clearInterval(countDown.current)
  // //   countDown.current = 0
  // //   // setCurrentCyclesLeft(initialCyclesLeft)
  // //   handleSetState(setCurrentCyclesLeft, initialCyclesLeft)
  // // }

  // Old helper functions
  function handleCreateTimer() {
    setIsCreatingTimer((prevIsCreatingTimer) => !prevIsCreatingTimer)
    if (isCreatingTimer) {
      setInitialTimers((prevInitialTimers: any) => [
        ...prevInitialTimers,
        {
          id: prevInitialTimers.length + 1,
          title: inputTitle,
          minutes: inputMinutes,
          seconds: inputSeconds,
        },
      ])
    }
  }

  function handleDeleteTimer(currentTimerId: string) {
    setInitialTimers((prevInitialTimers: any) => [
      ...prevInitialTimers.filter(
        (prevInitialTimer: any) => prevInitialTimer.id !== currentTimerId
      ),
    ])
    setInitialTimers((prevInitialTimers: any) =>
      [...prevInitialTimers].map(
        (prevInitialTimer: any, prevInitialTimerIndex: number) => {
          return { ...prevInitialTimer, id: prevInitialTimerIndex + 1 }
        }
      )
    )
  }

  function handleDisplayWorkoutButtonText() {
    if (isCountingDown) {
      return 'Pause'
    } else if (isPaused) {
      return 'Resume'
    } else {
      return 'Start'
    }
  }

  function format(timeUnit: number) {
    return `${timeUnit >= 10 ? timeUnit : `0${timeUnit}`}`
  }

  // New JSX
  if (false) {
    return (
      <>
        <div className='flex flex-col gap-y-4'>
          <div>
            <button onClick={handleStartTimer}>Start Timer</button>
          </div>
          <div>Cycles Left: {currentCyclesLeft}</div>
          <div
            className={`${
              currentTimerId === 3 ? 'border-amber-600' : 'border-slate-600'
            } w-fit rounded-lg border p-2`}
          >
            <div>Timer Number: {3}</div>
            <div>
              Seconds Left:{' '}
              {currentTimerId === 3 ? currentSecondsLeft : initialSecondsLeft}
            </div>
          </div>
          <div
            className={`${
              currentTimerId === 2 ? 'border-amber-600' : 'border-slate-600'
            } w-fit rounded-lg border p-2`}
          >
            <div>Timer Number: {2}</div>
            <div>
              Seconds Left:{' '}
              {currentTimerId === 2 ? currentSecondsLeft : initialSecondsLeft}
            </div>
          </div>
          <div
            className={`${
              currentTimerId === 1 ? 'border-amber-600' : 'border-slate-600'
            } w-fit rounded-lg border p-2`}
          >
            <div>Timer Number: {1}</div>
            <div>
              Seconds Left:{' '}
              {currentTimerId === 1 ? currentSecondsLeft : initialSecondsLeft}
            </div>
          </div>
        </div>
      </>
    )
  }

  // Old JSX
  return (
    <div className='flex flex-col gap-y-4'>
      {initialTimers.length > 0 ? (
        <button
          className={`${
            isCountingDown ? 'bg-yellow-600' : 'bg-green-600'
          } mb-2 w-fit rounded-full py-2 px-4 text-lg font-semibold text-white`}
          onClick={handleStartTimer}
        >
          {`${handleDisplayWorkoutButtonText()} Workout`}
        </button>
      ) : null}
      <div className='flex flex-col gap-y-4 rounded-lg bg-slate-200 p-4 dark:bg-slate-800'>
        <div className='mb-2 flex w-full flex-wrap items-center gap-x-6'>
          <h2 className='whitespace-nowrap text-xl font-semibold text-pink-900 dark:text-pink-100'>
            Workout
          </h2>
          {isEditingCycles ? (
            <>
              <Input
                name='cycles'
                inputValue={inputCycles}
                setInputValue={setInputCycles}
                addClassNames='w-[4.2rem]'
              />
              <button
                onClick={() =>
                  setIsEditingCycles(
                    (prevIsEditingCycles) => !prevIsEditingCycles
                  )
                }
              >
                Confirm Edit
              </button>
            </>
          ) : (
            <>
              <p className='font-semibold'>{`${inputCycles} Cycle${
                inputCycles == 1 ? '' : 's'
              }`}</p>
              <button
                onClick={() =>
                  setIsEditingCycles(
                    (prevIsEditingCycles) => !prevIsEditingCycles
                  )
                }
              >
                Edit
              </button>
            </>
          )}
        </div>
        {initialTimers.map((initialTimer: any) => (
          <div
            key={initialTimer.id}
            className={`${
              initialTimer.id === currentTimerId
                ? 'border border-amber-500'
                : ''
            } flex flex-col gap-y-4 rounded-lg bg-slate-100 p-3 dark:bg-slate-700`}
          >
            <div className='flex flex-wrap-reverse items-center gap-4'>
              <div className='text-2xl'>
                <span>
                  {format(
                    initialTimer.id === currentTimerId
                      ? currentMinutesLeft
                      : initialTimer.minutes
                  )}{' '}
                  :{' '}
                </span>
                <span>
                  {format(
                    initialTimer.id === currentTimerId
                      ? currentSecondsLeft
                      : initialTimer.seconds
                  )}
                </span>
              </div>
              <div className='text-lg font-semibold text-blue-900 dark:text-blue-100'>
                {initialTimer.title}
              </div>
              <button
                className='ml-auto w-fit rounded-full font-semibold'
                onClick={() => handleDeleteTimer(initialTimer.id)}
              >
                <X />
              </button>
            </div>
          </div>
        ))}
        <div className='flex'>
          <button
            className='w-fit rounded-full bg-blue-600 py-2 px-4 font-semibold text-white'
            onClick={() => handleCreateTimer()}
          >
            {`Create ${isCreatingTimer ? 'this ' : ''}Timer`}
          </button>
          {isCreatingTimer ? (
            <button
              className='ml-4 w-fit rounded-full bg-amber-600 py-2 px-4 font-semibold text-white'
              onClick={() => setIsCreatingTimer(false)}
            >
              Cancel
            </button>
          ) : null}
        </div>
        {isCreatingTimer ? (
          <>
            <h3 className='mb-2 text-lg font-semibold'>New Timer</h3>
            <div className='mb-4 flex flex-col gap-y-4'>
              <Input
                name={'title'}
                inputValue={inputTitle}
                setInputValue={setInputTitle}
              />
              <Input
                name={'minutes'}
                inputValue={inputMinutes}
                setInputValue={setInputMinutes}
              />
              <Input
                name={'seconds'}
                inputValue={inputSeconds}
                setInputValue={setInputSeconds}
              />
            </div>
          </>
        ) : null}
      </div>
    </div>
  )
}

export function Timer() {
  return (
    <>
      <div>Timer</div>
    </>
  )
}

interface InputProps {
  name: string
  inputValue: string | number
  setInputValue: any
  addClassNames?: string
}

export function Input({
  name,
  inputValue,
  setInputValue,
  addClassNames,
}: InputProps) {
  return (
    <div className='relative flex flex-col'>
      <input
        name={name}
        className={`${addClassNames} peer rounded-lg bg-slate-100 px-2 pt-5 pb-3 shadow-md dark:bg-slate-700`}
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        type={name === 'title' ? 'text' : 'number'}
        placeholder={`${name.charAt(0).toUpperCase()}${name.slice(1)}`}
      />
      <label
        htmlFor={name}
        className='absolute top-1 left-2 text-xs text-slate-500 transition-all peer-placeholder-shown:top-5 peer-placeholder-shown:text-base dark:text-slate-300'
      >
        {`${name.charAt(0).toUpperCase()}${name.slice(1)}`}
      </label>
    </div>
  )
}

export function X() {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      fill='none'
      viewBox='0 0 24 24'
      strokeWidth={1.5}
      stroke='currentColor'
      className='h-6 w-6'
    >
      <path
        strokeLinecap='round'
        strokeLinejoin='round'
        d='M6 18L18 6M6 6l12 12'
      />
    </svg>
  )
}

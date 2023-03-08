import { useState, useRef, useEffect } from 'react'

export default function Workout() {
  const [isEditingCycles, setIsEditingCycles] = useState(false)
  const [cycles, setCycles] = useState(19)
  const [isCreatingTimer, setIsCreatingTimer] = useState(false)
  const [inputCycles, setInputCycles] = useState(3)
  const [inputTitle, setInputTitle] = useState('Low')
  const [inputMinutes, setInputMinutes] = useState(0)
  const [inputSeconds, setInputSeconds] = useState(5)
  const [count, setCount] = useState(0)
  const [timers, setTimers] = useState<any>([])
  const [isCountingDown, setIsCountingDown] = useState(false)
  const [isWorkoutComplete, setIsWorkoutComplete] = useState(false)

  let countDown = useRef<any>(0)

  function handleCountDown() {
    setIsCountingDown((prevIsCountingDown) => !prevIsCountingDown)
    countDown.current = setInterval(() => {
      setTimers((prevTimers: any) =>
        [...prevTimers].map((prevTimer: any) => {
          return {
            ...prevTimer,
            seconds: prevTimer.seconds - 1,
          }
        })
      )
      if (isWorkoutComplete) return
    }, 1000)
  }

  // function handleCountDown() {
  //   setIsCountingDown((prevIsCountingDown) => !prevIsCountingDown)
  //   countDown.current = setInterval(() => {
  //     setTimers((prevTimers: any) =>
  //       [...prevTimers].map((prevTimer: any) => {
  //         // Check whether or not to move onto the next timer.
  //         if (prevTimer.minutes == 0 && prevTimer.seconds == 0) {
  //           setCount((prevCount) => prevCount + 1) // Increment

  //           // Determine whether or not to move onto the next cycle.
  //           if (count > timers.length) {
  //             setCycles((prevCycles) => prevCycles - 1) // Move onto the next cycle.

  //             // Determine whether or not the workout is complete.
  //             if (cycles == 0) {
  //               setIsWorkoutComplete(true)
  //             } else {
  //               setCount(0) // Reset count to begin the next cycle.
  //             }
  //           }
  //         }

  //         // Implement the remaining count-down logic.
  //         // Check if the count matches the current timer id. Count down this timer until this timer equals zero.
  //         if (count == prevTimer.id) {
  //           if (prevTimer.seconds > 0) {
  //             return {
  //               ...prevTimer,
  //               seconds: prevTimer.seconds - 1,
  //             }
  //           } else if (prevTimer.minutes > 0) {
  //             return {
  //               ...prevTimer,
  //               minutes: prevTimer.minutes - 1,
  //               seconds: 59,
  //             }
  //           } else {
  //             return { ...prevTimer }
  //           }
  //         }
  //       })
  //     )
  //     if (isWorkoutComplete) return
  //   }, 1000)
  // }

  function handleCount() {}

  function handleCreateTimer() {
    setIsCreatingTimer((prevIsCreatingTimer) => !prevIsCreatingTimer)
    if (isCreatingTimer) {
      setTimers((prevTimers: any) => [
        ...prevTimers,
        {
          id: prevTimers.length,
          title: inputTitle,
          minutes: inputMinutes,
          seconds: inputSeconds,
        },
      ])
    }
  }

  function handleDeleteTimer(currentTimerId: string) {
    setTimers((prevTimers: any) => [
      ...prevTimers.filter((prevTimer: any) => prevTimer.id !== currentTimerId),
    ])
    setTimers((prevTimers: any) =>
      [...prevTimers].map((prevTimer: any, prevTimerIndex: number) => {
        return { ...prevTimer, id: prevTimerIndex }
      })
    )
  }

  function format(timeUnit: number) {
    return `${timeUnit >= 10 ? timeUnit : `0${timeUnit}`}`
  }

  return (
    <div className='flex flex-col gap-y-4'>
      {timers.length > 0 ? (
        <button
          className={`${
            isCountingDown ? 'bg-yellow-600' : 'bg-green-600'
          } mb-2 w-fit rounded-full py-2 px-4 text-lg font-semibold text-white`}
          onClick={() => handleCountDown()}
        >
          {`${isCountingDown ? 'Pause' : 'Start'} Workout`}
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
                onClick={() => {
                  setIsEditingCycles(
                    (prevIsEditingCycles) => !prevIsEditingCycles
                  )
                  setCycles(inputCycles)
                }}
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
        {timers.map((timer: any) => (
          <div
            key={timer.id}
            className='flex flex-col gap-y-4 rounded-lg bg-slate-100 p-3 dark:bg-slate-700'
          >
            <div className='flex flex-wrap-reverse items-center gap-4'>
              <div className='text-2xl'>
                <span>{format(timer.minutes)} : </span>
                <span>{format(timer.seconds)}</span>
              </div>
              <div className='text-lg font-semibold text-blue-900 dark:text-blue-100'>
                {timer.title}
              </div>
              <button
                className='ml-auto w-fit rounded-full font-semibold'
                onClick={() => handleDeleteTimer(timer.id)}
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

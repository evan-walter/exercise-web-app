import { useState, useRef, useEffect } from 'react'
import { createId } from '@paralleldrive/cuid2'

export default function Workout() {
  const [isCreatingInterval, setIsCreatingInterval] = useState(false)
  const [initialIntervalTitle, setInitialIntervalTitle] = useState('')
  const [initialIntervalHours, setInitialIntervalHours] = useState(0)
  const [initialIntervalMinutes, setInitialIntervalMinutes] = useState(0)
  const [initialIntervalSeconds, setInitialIntervalSeconds] = useState(0)
  const [initialRepeat, setInitialRepeat] = useState(0)
  const [intervals, setIntervals] = useState<any>([])
  const [isThereANonZeroInterval, setIsThereANonZeroInterval] = useState(false)

  function handleCreateInterval() {
    setIsCreatingInterval((prevS) => !prevS)
    if (isCreatingInterval) {
      setIntervals((prevIntervals: []) => [
        ...prevIntervals,
        {
          id: createId(),
          title: initialIntervalTitle,
          h: initialIntervalHours,
          m: initialIntervalMinutes,
          s: initialIntervalSeconds,
        },
      ])
    }
  }

  function handleDeleteInterval(currentIntervalId: string) {
    setIntervals([
      ...intervals.filter((interval: any) => interval.id !== currentIntervalId),
    ])
  }

  function formatTimeUnit(timeUnit: number) {
    return `${timeUnit >= 10 ? timeUnit.toString() : `0${timeUnit.toString()}`}`
  }

  useEffect(() => {
    setIsThereANonZeroInterval(
      intervals.filter(
        (interval: any) =>
          interval.h.toString() !== '0' ||
          interval.m.toString() !== '0' ||
          interval.s.toString() !== '0'
      ).length > 0
    )
  }, [isThereANonZeroInterval, intervals])

  return (
    <div className='flex flex-col gap-y-4'>
      {isThereANonZeroInterval ? (
        <button className='mb-2 w-fit rounded-full bg-green-600 py-2 px-4 text-lg font-semibold text-white'>
          Start Workout
        </button>
      ) : null}
      <div className='rounded-lg bg-slate-200 p-4 dark:bg-slate-800'>
        <div className='mb-2 flex w-full flex-wrap items-center gap-x-6'>
          <div className='whitespace-nowrap text-xl font-semibold text-pink-900 dark:text-pink-100'>
            Workout
          </div>
          <div className='w-fit'>Repeat</div>
        </div>
        {intervals.map((interval: any) => (
          <div
            key={interval.id}
            className='my-4 flex flex-col gap-y-4 rounded-lg bg-slate-100 p-3 dark:bg-slate-700'
          >
            <div className='flex flex-wrap-reverse items-center gap-4'>
              <div className='text-2xl'>
                <span>{formatTimeUnit(interval.h)} : </span>
                <span>{formatTimeUnit(interval.m)} : </span>
                <span>{formatTimeUnit(interval.s)}</span>
              </div>
              <div className='text-lg font-semibold text-blue-900 dark:text-blue-100'>
                {interval.title}
              </div>
              <button
                className='ml-auto w-fit rounded-full font-semibold'
                onClick={() => handleDeleteInterval(interval.id)}
              >
                <X />
              </button>
            </div>
          </div>
        ))}
        {isCreatingInterval ? (
          <>
            <div className='mb-2 text-lg font-semibold'>New Interval</div>
            <div className='mb-4 flex flex-col gap-y-4'>
              <Input
                name={'title'}
                theState={initialIntervalTitle}
                setTheState={setInitialIntervalTitle}
              />
              <Input
                name={'hours'}
                theState={initialIntervalHours}
                setTheState={setInitialIntervalHours}
              />
              <Input
                name={'minutes'}
                theState={initialIntervalMinutes}
                setTheState={setInitialIntervalMinutes}
              />
              <Input
                name={'seconds'}
                theState={initialIntervalSeconds}
                setTheState={setInitialIntervalSeconds}
              />
            </div>
          </>
        ) : null}
        <button
          className='w-fit rounded-full bg-blue-600 py-2 px-4 font-semibold text-white'
          onClick={() => handleCreateInterval()}
        >
          {`Create ${isCreatingInterval ? 'this ' : ''}Interval`}
        </button>
        {isCreatingInterval ? (
          <button
            className='ml-4 w-fit rounded-full bg-amber-600 py-2 px-4 font-semibold text-white'
            onClick={() => setIsCreatingInterval(false)}
          >
            Cancel
          </button>
        ) : null}
      </div>
    </div>
  )
}

interface InputProps {
  name: string
  theState: string | number
  setTheState: any
}

export function Input({ name, theState, setTheState }: InputProps) {
  return (
    <div className='relative flex flex-col'>
      <input
        name={name}
        className='peer rounded-lg bg-slate-100 px-2 pt-5 pb-3 shadow-md dark:bg-slate-700'
        value={theState}
        onChange={(e) => setTheState(e.target.value)}
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

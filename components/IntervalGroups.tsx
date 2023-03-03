import { useState, useRef } from 'react'
import { createId } from '@paralleldrive/cuid2'

export default function IntervalGroups() {
  return (
    <>
      <Intervals />
    </>
  )
}

export function Intervals() {
  const [isCreatingInterval, setIsCreatingInterval] = useState(false)
  const [initialTitle, setInitialTitle] = useState('')
  const [initialHours, setInitialHours] = useState(0)
  const [initialMinutes, setInitialMinutes] = useState(0)
  const [initialSeconds, setInitialSeconds] = useState(0)
  const [intervals, setIntervals] = useState<any>([])

  function handleCreateInterval() {
    setIsCreatingInterval((prevS) => !prevS)
    if (isCreatingInterval) {
      setIntervals((prevIntervals: []) => [
        ...prevIntervals,
        {
          id: createId(),
          title: initialTitle,
          h: initialHours,
          m: initialMinutes,
          s: initialSeconds,
        },
      ])
    }
  }

  return (
    <div className='rounded-lg bg-slate-200 p-2 dark:bg-slate-800'>
      {intervals.map((interval: any) => (
        <div
          key={interval.id}
          className='my-4 flex flex-col gap-y-4 rounded-lg bg-slate-200 p-3 dark:bg-slate-700'
        >
          <Interval
            title={interval.title}
            h={interval.h}
            m={interval.m}
            s={interval.s}
          />
        </div>
      ))}
      {isCreatingInterval ? (
        <>
          <div className='text-xl font-semibold'>New Interval</div>
          <div className='mt-2 mb-4 flex flex-col gap-y-4'>
            <Input
              name={'title'}
              theState={initialTitle}
              setTheState={setInitialTitle}
            />
            <Input
              name={'hours'}
              theState={initialHours}
              setTheState={setInitialHours}
            />
            <Input
              name={'minutes'}
              theState={initialMinutes}
              setTheState={setInitialMinutes}
            />
            <Input
              name={'seconds'}
              theState={initialSeconds}
              setTheState={setInitialSeconds}
            />
          </div>
        </>
      ) : null}
      <button
        className='w-fit rounded-full bg-blue-300 py-2 px-4 dark:bg-blue-600'
        onClick={() => handleCreateInterval()}
      >
        Create Interval
      </button>
      {isCreatingInterval ? (
        <button
          className='ml-4 w-fit rounded-full bg-amber-300 py-2 px-4 dark:bg-amber-600'
          onClick={() => setIsCreatingInterval(false)}
        >
          Cancel
        </button>
      ) : null}
    </div>
  )
}

interface InputProps {
  name: string
  theState: string | number
  setTheState: any
}

interface IntervalProps {
  title: string
  h: number
  m: number
  s: number
}

export function Interval({ title, h, m, s }: IntervalProps) {
  const [updatedTitle, setUpdatedTitle] = useState(title)

  function formatTimeUnit(timeUnit: number) {
    return `${timeUnit >= 10 ? timeUnit.toString() : `0${timeUnit.toString()}`}`
  }

  return (
    <div className='flex items-center justify-between border-b border-slate-300 pb-3 dark:border-slate-600'>
      <div className='text-lg font-semibold text-blue-900 dark:text-blue-100'>
        {title}
      </div>
      <div className='w-60 text-2xl'>
        <span className=''>{formatTimeUnit(h)} : </span>
        <span className=''>{formatTimeUnit(m)} : </span>
        <span className=''>{formatTimeUnit(s)}</span>
      </div>
    </div>
  )
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

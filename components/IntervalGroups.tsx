import { useState, useRef } from 'react'
import { createId } from '@paralleldrive/cuid2'

export default function IntervalGroups() {
  const [isCreatingGroup, setIsCreatingGroup] = useState(false)
  const [initialGroupTitle, setInitialGroupTitle] = useState('')
  const [groups, setGroups] = useState<any>([])

  function handleCreateGroup() {
    setIsCreatingGroup((prevS) => !prevS)
    if (isCreatingGroup) {
      setGroups((prevGroups: []) => [
        ...prevGroups,
        {
          id: createId(),
          title: initialGroupTitle,
        },
      ])
    }
  }

  return (
    <>
      <div className='flex flex-col gap-y-4'>
        {groups.map((group: any) => (
          <div key={group.id} className=''>
            <IntervalGroup initialGroupTitle={group.title} />
          </div>
        ))}
        {isCreatingGroup ? (
          <div className='my-4 rounded-lg bg-slate-200 p-2 dark:bg-slate-800'>
            <div className='text-xl font-semibold text-pink-900 dark:text-pink-100'>
              New Group
            </div>
            <div className='mt-2 mb-4 flex flex-col gap-y-4'>
              <Input
                name={'title'}
                theState={initialGroupTitle}
                setTheState={setInitialGroupTitle}
              />
            </div>
          </div>
        ) : null}
      </div>
      <button
        className='w-fit rounded-full bg-pink-300 py-2 px-4 dark:bg-pink-600'
        onClick={() => handleCreateGroup()}
      >
        Create Group
      </button>
      {isCreatingGroup ? (
        <button
          className='ml-4 w-fit rounded-full bg-amber-300 py-2 px-4 dark:bg-amber-600'
          onClick={() => setIsCreatingGroup(false)}
        >
          Cancel
        </button>
      ) : null}{' '}
    </>
  )
}

interface IntervalGroupProps {
  initialGroupTitle: string
}

export function IntervalGroup({ initialGroupTitle }: IntervalGroupProps) {
  const [updatedGroupTitle, setUpdatedGroupTitle] = useState(initialGroupTitle)
  const [isCreatingInterval, setIsCreatingInterval] = useState(false)
  const [initialIntervalTitle, setInitialIntervalTitle] = useState('')
  const [initialHours, setInitialHours] = useState(0)
  const [initialMinutes, setInitialMinutes] = useState(0)
  const [initialSeconds, setInitialSeconds] = useState(0)
  const [initialRepeat, setInitialRepeat] = useState(0)
  const [intervals, setIntervals] = useState<any>([])

  function handleCreateInterval() {
    setIsCreatingInterval((prevS) => !prevS)
    if (isCreatingInterval) {
      setIntervals((prevIntervals: []) => [
        ...prevIntervals,
        {
          id: createId(),
          title: initialIntervalTitle,
          h: initialHours,
          m: initialMinutes,
          s: initialSeconds,
        },
      ])
    }
  }

  return (
    <div className='my-4 rounded-lg bg-slate-200 p-2 dark:bg-slate-800'>
      <div className='mb-4 flex w-full items-center gap-x-4'>
        <div className='my-2 text-xl font-semibold text-pink-900 dark:text-pink-100'>
          {updatedGroupTitle}
        </div>
        <div>Repeat (Input)</div>
        <button className='w-fit rounded-full bg-green-300 py-2 px-4 dark:bg-green-600'>
          Start
        </button>
        <button className='ml-auto w-fit rounded-full'>
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
        </button>
      </div>
      {intervals.map((interval: any) => (
        <div
          key={interval.id}
          className='my-4 flex flex-col gap-y-4 rounded-lg bg-slate-100 p-3 dark:bg-slate-700'
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
          <div className='text-lg font-semibold'>New Interval</div>
          <div className='mt-2 mb-4 flex flex-col gap-y-4'>
            <Input
              name={'title'}
              theState={initialIntervalTitle}
              setTheState={setInitialIntervalTitle}
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
  const [updatedIntervalTitle, setUpdatedIntervalTitle] = useState(title)

  function formatTimeUnit(timeUnit: number) {
    return `${timeUnit >= 10 ? timeUnit.toString() : `0${timeUnit.toString()}`}`
  }

  return (
    <div className='flex flex-wrap-reverse items-center gap-4'>
      <div className='text-2xl'>
        <span className=''>{formatTimeUnit(h)} : </span>
        <span className=''>{formatTimeUnit(m)} : </span>
        <span className=''>{formatTimeUnit(s)}</span>
      </div>
      <div className='text-lg font-semibold text-blue-900 dark:text-blue-100'>
        {updatedIntervalTitle}
      </div>
      <button className='ml-auto w-fit rounded-full'>
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
      </button>
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

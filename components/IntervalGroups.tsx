import { useState } from 'react'
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
          <div key={group.id}>
            <IntervalGroup
              group={group}
              groups={groups}
              setGroups={setGroups}
            />
          </div>
        ))}
        {isCreatingGroup ? (
          <div className='rounded-lg bg-slate-200 p-4 dark:bg-slate-800'>
            <div className='mb-2 text-xl font-semibold text-pink-900 dark:text-pink-100'>
              New Group
            </div>
            <Input
              name={'title'}
              theState={initialGroupTitle}
              setTheState={setInitialGroupTitle}
            />
          </div>
        ) : null}
      </div>
      <button
        className='mt-4 w-fit rounded-full bg-pink-600 py-2 px-4 font-semibold text-white'
        onClick={() => handleCreateGroup()}
      >
        Create Group
      </button>
      {isCreatingGroup ? (
        <button
          className='ml-4 mt-4 w-fit rounded-full bg-amber-600 py-2 px-4 font-semibold text-white'
          onClick={() => setIsCreatingGroup(false)}
        >
          Cancel
        </button>
      ) : null}{' '}
    </>
  )
}

interface IntervalGroupProps {
  group: any
  groups: any
  setGroups: any
}

export function IntervalGroup({
  group,
  groups,
  setGroups,
}: IntervalGroupProps) {
  const [updatedGroupTitle, setUpdatedGroupTitle] = useState(group.title)
  const [isCreatingInterval, setIsCreatingInterval] = useState(false)
  const [initialIntervalTitle, setInitialIntervalTitle] = useState('')
  const [initialHours, setInitialHours] = useState(0)
  const [initialMinutes, setInitialMinutes] = useState(0)
  const [initialSeconds, setInitialSeconds] = useState(0)
  const [initialRepeat, setInitialRepeat] = useState(0)
  const [intervals, setIntervals] = useState<any>([])

  function handleDeleteGroup(currentGroupId: string) {
    setGroups([...groups.filter((group: any) => group.id !== currentGroupId)])
  }

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
    <div className='rounded-lg bg-slate-200 p-4 dark:bg-slate-800'>
      <div className='mb-2 flex w-full flex-wrap items-center gap-x-4'>
        <div className='whitespace-nowrap text-xl font-semibold text-pink-900 dark:text-pink-100'>
          {updatedGroupTitle}
        </div>
        <div className='w-fit'>Repeat</div>
        <button className='w-fit rounded-full bg-green-600 py-2 px-4 font-semibold text-white'>
          Start
        </button>
        <button
          className='ml-auto w-fit rounded-full font-semibold'
          onClick={() => handleDeleteGroup(group.id)}
        >
          <X />
        </button>
      </div>
      {intervals.map((interval: any) => (
        <div
          key={interval.id}
          className='my-4 flex flex-col gap-y-4 rounded-lg bg-slate-100 p-3 dark:bg-slate-700'
        >
          <Interval
            interval={interval}
            intervals={intervals}
            setIntervals={setIntervals}
          />
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
        className='w-fit rounded-full bg-blue-600 py-2 px-4 font-semibold text-white'
        onClick={() => handleCreateInterval()}
      >
        Create Interval
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
  )
}

interface IntervalProps {
  interval: any
  intervals: any
  setIntervals: any
}

export function Interval({ interval, intervals, setIntervals }: IntervalProps) {
  const [updatedIntervalTitle, setUpdatedIntervalTitle] = useState(
    interval.title
  )

  function handleDeleteInterval(currentIntervalId: string) {
    setIntervals([
      ...intervals.filter((interval: any) => interval.id !== currentIntervalId),
    ])
  }

  function formatTimeUnit(timeUnit: number) {
    return `${timeUnit >= 10 ? timeUnit.toString() : `0${timeUnit.toString()}`}`
  }

  return (
    <div className='flex flex-wrap-reverse items-center gap-4'>
      <div className='text-2xl'>
        <span>{formatTimeUnit(interval.h)} : </span>
        <span>{formatTimeUnit(interval.m)} : </span>
        <span>{formatTimeUnit(interval.s)}</span>
      </div>
      <div className='text-lg font-semibold text-blue-900 dark:text-blue-100'>
        {updatedIntervalTitle}
      </div>
      <button
        className='ml-auto w-fit rounded-full font-semibold'
        onClick={() => handleDeleteInterval(interval.id)}
      >
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

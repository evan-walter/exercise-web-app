import { useState, useRef } from 'react'
import { createId } from '@paralleldrive/cuid2'

export default function IntervalGroups() {
  const [intervalGroups, setIntervalGroups] = useState<any>([])
  const [intervalGroupTitle, setIntervalGroupTitle] = useState(
    `Interval Group ${intervalGroups.length + 1}`
  )

  function handleDeleteIntervalGroup(currentIntervalGroupId: string) {
    setIntervalGroups([
      ...intervalGroups.filter(
        (intervalGroup: any) => intervalGroup.id !== currentIntervalGroupId
      ),
    ])
  }

  return (
    <div className='flex flex-col gap-y-2'>
      {intervalGroups.map((intervalGroup: any) => (
        <div
          key={intervalGroup.id}
          className='flex flex-col gap-y-4 rounded-lg bg-zinc-100 p-2 dark:bg-zinc-800'
        >
          <div className='flex items-center justify-between border-b border-zinc-300 pb-3 dark:border-zinc-600'>
            <div className='text-lg font-semibold text-blue-900 dark:text-blue-100'>
              {intervalGroup.title}
            </div>
            <button
              className='rounded-full bg-red-300 py-2 px-4 dark:bg-red-600'
              onClick={() => handleDeleteIntervalGroup(intervalGroup.id)}
            >
              Delete
            </button>
          </div>
          <Intervals />
        </div>
      ))}
      <div className='flex w-full flex-wrap items-center justify-between gap-4 rounded-lg bg-zinc-100 p-3 dark:bg-zinc-800'>
        <div className='flex flex-col'>
          <input
            className='rounded-lg bg-slate-200 p-2 dark:bg-slate-600'
            title='title'
            type='text'
            value={intervalGroupTitle}
            onChange={(e) => setIntervalGroupTitle(e.target.value)}
          />
        </div>
        <button
          className='rounded-full bg-amber-300 px-4 py-2 dark:bg-amber-600'
          onClick={() => {
            setIntervalGroups((prevIntervalGroups: []) => [
              ...prevIntervalGroups,
              { id: createId(), title: intervalGroupTitle },
            ])
            setIntervalGroupTitle(`Interval Group ${intervalGroups.length + 2}`)
          }}
        >
          Create New Interval Group
        </button>
      </div>
    </div>
  )
}

export function Intervals() {
  const [intervals, setIntervals] = useState<any>([])
  const [intervalTitle, setIntervalTitle] = useState(
    `Interval ${intervals.length + 1}`
  )

  function handleDeleteInterval(currentIntervalId: string) {
    setIntervals([
      ...intervals.filter((interval: any) => interval.id !== currentIntervalId),
    ])
  }

  return (
    <div className='flex flex-col gap-y-2'>
      {intervals.map((interval: any) => (
        <div
          key={interval.id}
          className='flex flex-col gap-y-4 rounded-lg bg-slate-200 p-3 dark:bg-slate-700'
        >
          <div className='flex items-center justify-between border-b border-slate-300 pb-3 dark:border-slate-600'>
            <div className='text-lg font-semibold text-blue-900 dark:text-blue-100'>
              {interval.title}
            </div>
            <button
              className='rounded-full bg-red-300 py-2 px-4 dark:bg-red-600'
              onClick={() => handleDeleteInterval(interval.id)}
            >
              Delete
            </button>
          </div>
          <IntervalTimer />
        </div>
      ))}
      <div className='flex w-full flex-wrap items-center justify-between gap-4 rounded-lg bg-slate-200 p-3 dark:bg-slate-700'>
        <div className='flex flex-col'>
          <input
            className='rounded-lg bg-slate-200 p-2 dark:bg-slate-600'
            title='title'
            type='text'
            value={intervalTitle}
            onChange={(e) => setIntervalTitle(e.target.value)}
          />
        </div>
        <button
          className='rounded-full bg-amber-300 px-4 py-2 dark:bg-amber-600'
          onClick={() => {
            setIntervals((prevIntervals: []) => [
              ...prevIntervals,
              { id: createId(), title: intervalTitle },
            ])
            setIntervalTitle(`Interval ${intervals.length + 2}`)
          }}
        >
          Create New Interval
        </button>
      </div>
    </div>
  )
}

export function IntervalTimer() {
  const id = useRef<any>(0)
  const [h, setH] = useState(0)
  const [m, setM] = useState(0)
  const [s, setS] = useState(0)
  const [ms, setMs] = useState(0)
  const [isPaused, setIsPaused] = useState(true)

  function handleRun() {
    setIsPaused(false)
    id.current = setInterval(() => {
      setMs((prevMs) => prevMs + 1)
    }, 10)
  }

  if (ms === 100) {
    setS((prevS) => prevS + 1)
    setMs(0)
  }
  if (s === 60) {
    setM((prevM) => prevM + 1)
    setS(0)
  }
  if (m === 60) {
    setH((prevH) => prevH + 1)
    setM(0)
  }

  function handlePause() {
    setIsPaused(true)
    clearInterval(id.current)
  }

  function handleReset() {
    clearInterval(id.current)
    setIsPaused(true)
    setH(0)
    setM(0)
    setS(0)
    setMs(0)
  }

  function formatTimeUnit(timeUnit: number) {
    return `${timeUnit >= 10 ? timeUnit.toString() : `0${timeUnit.toString()}`}`
  }

  return (
    <div className='mx-2 flex flex-wrap items-center gap-4'>
      <div className='w-60 text-2xl'>
        <span className=''>{formatTimeUnit(h)} : </span>
        <span className=''>{formatTimeUnit(m)} : </span>
        <span className=''>{formatTimeUnit(s)} : </span>
        <span className=''>{formatTimeUnit(ms)}</span>
      </div>
      <div className='flex gap-x-2'>
        {isPaused ? (
          <button
            className='rounded-full bg-green-300 px-4 py-2 dark:bg-green-600'
            onClick={() => handleRun()}
          >
            Start
          </button>
        ) : (
          <button
            className='rounded-full bg-yellow-300 px-4 py-2 dark:bg-yellow-600'
            onClick={() => handlePause()}
          >
            Pause
          </button>
        )}
        <button
          className='rounded-full bg-blue-300 px-4 py-2 dark:bg-blue-600'
          onClick={() => handleReset()}
        >
          Reset
        </button>
      </div>
    </div>
  )
}

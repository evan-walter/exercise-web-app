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
  const [title, setTitle] = useState('')
  const [h, setH] = useState(0)
  const [m, setM] = useState(0)
  const [s, setS] = useState(0)
  const [intervals, setIntervals] = useState<any>([])

  function handleCreateInterval() {
    setIsCreatingInterval((prevS) => !prevS)
    if (isCreatingInterval) {
      setIntervals((prevIntervals: []) => [
        ...prevIntervals,
        { id: createId(), title: title, h: h, m: m, s: s },
      ])
    }
  }

  return (
    <div className='rounded-lg bg-slate-200 p-2 dark:bg-slate-800'>
      {intervals.map((interval: any) => (
        <div
          key={interval.id}
          className='flex flex-col gap-y-4 rounded-lg bg-slate-200 p-3 dark:bg-slate-700'
        >
          <div className='flex items-center justify-between border-b border-slate-300 pb-3 dark:border-slate-600'>
            <div className='text-lg font-semibold text-blue-900 dark:text-blue-100'>
              {interval.title}
            </div>
            
          </div>
        </div>
      ))}
      {isCreatingInterval ? (
        <>
          <div className='text-xl font-semibold'>New Interval</div>
          <div className='flex flex-col gap-x-2'>
            <Input name={'title'} theState={title} setTheState={setTitle} />
            <Input name={'hours'} theState={h} setTheState={setH} />
            <Input name={'minutes'} theState={m} setTheState={setM} />
            <Input name={'seconds'} theState={s} setTheState={setS} />
          </div>
        </>
      ) : null}
      <button
        className='my-2 w-fit rounded-full bg-blue-300 py-2 px-4 dark:bg-blue-600'
        onClick={() => handleCreateInterval()}
      >
        Create Interval
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
    <div className='relative my-2 flex flex-col'>
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

import { useState, useRef } from 'react'
import { createId } from '@paralleldrive/cuid2'

export default function IntervalGroups() {
  return <Interval />
}

export function Interval() {
  return (
    <div className=''>
      <Timer />
    </div>
  )
}

export function Timer() {
  const [h, setH] = useState(0)
  const [m, setM] = useState(0)
  const [s, setS] = useState(0)
  const [ms, setMs] = useState(0)

  return (
    <>
      <form className='flex flex-col gap-x-2'>
        {['hours', 'minutes', 'seconds'].map((item) => (
          <FormInput name={item} />
        ))}
      </form>
    </>
  )
}

interface FormInputProps {
  name: string
}

export function FormInput({ name }: FormInputProps) {
  return (
    <div className='relative my-2 flex flex-col'>
      <input
        name={name}
        className='peer rounded-lg bg-slate-100 px-2 pt-5 pb-3 shadow-md dark:bg-slate-700'
        type='text'
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

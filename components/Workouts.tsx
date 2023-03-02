import { useState, useRef } from 'react'
import { createId } from '@paralleldrive/cuid2'

export default function Workouts() {
  const [workouts, setWorkouts] = useState<any>([])
  const [workoutTitle, setWorkoutTitle] = useState(
    `Workout ${workouts.length + 1}`
  )

  function handleDeleteWorkout(currentWorkoutId: string) {
    setWorkouts([
      ...workouts.filter((workout: any) => workout.id !== currentWorkoutId),
    ])
  }

  return (
    <div className='flex flex-col gap-y-8'>
      {workouts.map((workout: any) => (
        <div
          key={workout.id}
          className='flex flex-col gap-y-4 rounded-lg bg-slate-200 p-3 dark:bg-slate-700'
        >
          <div className='flex items-center justify-between border-b border-slate-300 pb-3 dark:border-slate-600'>
            <div className='text-xl font-semibold text-blue-900 dark:text-blue-100'>
              {workout.title}
            </div>
            <button
              className='rounded-full bg-red-300 py-2 px-4 dark:bg-red-600'
              onClick={() => handleDeleteWorkout(workout.id)}
            >
              Delete
            </button>
          </div>
          <WorkoutTimer />
        </div>
      ))}
      <div className='flex w-full flex-wrap items-center justify-between gap-4'>
        <div>
          <input
            className='rounded-lg bg-slate-200 p-2 dark:bg-slate-600'
            title='title'
            type='text'
            value={workoutTitle}
            onChange={(e) => setWorkoutTitle(e.target.value)}
          />
        </div>
        <button
          className='rounded-full bg-amber-300 px-4 py-2 dark:bg-amber-600'
          onClick={() => {
            setWorkouts((prevWorkouts: []) => [
              ...prevWorkouts,
              { id: createId(), title: workoutTitle },
            ])
            setWorkoutTitle(`Workout ${workouts.length + 2}`)
          }}
        >
          Create New Workout
        </button>
      </div>
    </div>
  )
}

export function WorkoutTimer() {
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

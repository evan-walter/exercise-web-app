import { useState } from 'react'

export default function Workouts() {
  return <WorkoutGroup title='Default Workout Group' />
}

interface WorkoutGroupProps {
  title: string
}

export function WorkoutGroup({ title }: WorkoutGroupProps) {
  const [workouts, setWorkouts] = useState([
    <Workout title='Default Workout Title' />,
  ])

  return (
    <div className='flex flex-col gap-y-4'>
      <h2>{title}</h2>
      <button
        onClick={() =>
          setWorkouts([...workouts, <Workout title='Default Workout Title' />])
        }
        className='w-fit rounded-full border border-amber-500 py-2 px-4'
      >
        Create New Workout
      </button>
      {workouts}
    </div>
  )
}

interface WorkoutProps {
  title: string
}

export function Workout({ title }: WorkoutProps) {
  return <div>{title}</div>
}

import { useRef, useState } from 'react'
import { createId } from '@paralleldrive/cuid2'

export default function Workouts() {
  const [workoutTitle, setWorkoutTitle] = useState('Default Workout Title')
  const [workouts, setWorkouts] = useState<any>([])

  function handleCreateWorkout() {
    setWorkouts([...workouts, { id: createId(), title: workoutTitle }])
  }

  function handleDeleteWorkout(currentWorkoutId: string) {
    setWorkouts([
      ...workouts.filter((workout: any) => workout.id !== currentWorkoutId),
    ])
  }

  return (
    <div className='flex flex-col gap-y-4'>
      {workouts.map((workout: any) => (
        <div key={workout.id} className='flex justify-between'>
          <div>{workout.title}</div>
          <button onClick={() => handleDeleteWorkout(workout.id)}>
            Delete
          </button>
        </div>
      ))}
      <div className='flex w-full justify-between'>
        <input
          className='px-2'
          type='text'
          value={workoutTitle}
          onChange={(e) => setWorkoutTitle(e.target.value)}
        />
        <button
          className='rounded-full border border-amber-500 px-4 py-2'
          onClick={() => handleCreateWorkout()}
        >
          Create New Workout
        </button>
      </div>
    </div>
  )
}

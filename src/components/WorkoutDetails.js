import { useWorkoutsContext } from '../hooks/useWorkoutsContext'
import { useAuthContext } from '../hooks/useAuthContext'


// date-fns
import formatDistanceToNow from 'date-fns/formatDistanceToNow'

const WorkoutDetails = ({ workout }) => {

  const { dispatch } = useWorkoutsContext()
  const { user } = useAuthContext()

  const handleClick = async () => {

    if (!user) {
      return
    }

    const response = await fetch('/api/workouts/' + workout._id, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${user.token}`
      } 
    })
    const json = await response.json()

    if (response.ok) {
      console.log(json)
      dispatch({type: 'DELETE_WORKOUT', payload: workout._id})
    }


  }
  return (
    <div className="workout-details">
      <h4>{workout.title}</h4>
      <p><strong>Load (kg): </strong>{workout.load}</p>
      <p><strong>Number of reps: </strong>{workout.reps}</p>
      <p> Posted {formatDistanceToNow(new Date(workout.createdAt), {addSuffix: true})}<i> by: {workout.username}</i></p>
      <span className='material-symbols-outlined' onClick={handleClick}><b> task_alt </b></span>
    </div>
  )
  }
  
  export default WorkoutDetails
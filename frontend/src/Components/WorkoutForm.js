import React, { useState } from "react";
import { useAuthContext } from "../hooks/useAuthContext";
import { useWorkoutsContext } from "../hooks/useWorkoutsContext";



const WorkoutForm = () => {
    const { dispatch } = useWorkoutsContext()
    const [title, setTitle] = useState('')
    const [load, setLoad] = useState('')
    const [reps, setReps] = useState('')
    const [error, setError] = useState(null)
    const [emptyFields, setEmptyfields] = useState([])
    const {user} = useAuthContext()
    const titleHandler = (e) => {
        setTitle(e.target.value)
        errorHandler("title")
        
    }
    const loadHandler = (e) => {
        setLoad(e.target.value)
        errorHandler("load")

    }
    const repsHandler = (e) => {
        setReps(e.target.value)
        errorHandler("reps")
    }

    const formSubmitHandler = async (e) => {
        e.preventDefault()
        if(!user){
            setError('You must be logged in')
            return
        }
        
        const workout = { title, load, reps }

        const response = await fetch('http://localhost:4000/api/workouts', {
            method: "POST",
            body: JSON.stringify(workout),
            headers: {
                'Content-Type': 'application/json',
                'Authorization' : `Bearer ${user.token}`
            }
        })

        const json = await response.json()

        if (!response.ok) {
            setError(json.error)
            setEmptyfields(json.emptyFields)

        }
        if (response.ok) {
            setTitle('')
            setLoad('')
            setReps('')
            setError(null)
           
            dispatch({ type: "CREATE_WORKOUT", payload: json })
            console.log('new workout added', json)
        }

    }

    const errorHandler = (item) => {

        const newEmptyFields = emptyFields.filter((field) => field !== item)
        setEmptyfields(newEmptyFields)
        setError(null)
        
    }




return (
    <form className="create" onSubmit={formSubmitHandler}>
        <h3>Add a New Workout</h3>

        <label>Exercise Title:</label>
        <input
            className={emptyFields.includes("title") ? "error" : ''}
            type="text"
            value={title}
            onChange={titleHandler}
        />

        <label>Load (in Kg)</label>
        <input
            className={emptyFields.includes("load") ? "error" : ''}
            type="number"
            value={load}
            onChange={loadHandler}
        />

        <label>Reps :</label>
        <input
            className={emptyFields.includes("reps") ? "error" : ''}
            type="number"
            value={reps}
            onChange={repsHandler}
            />


        <button>Add Workout</button>
        {error && <div className="error">{error}</div>}
    </form>
)
}

export default WorkoutForm;
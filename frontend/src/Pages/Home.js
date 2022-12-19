import React, { useEffect } from "react";
import WorkoutDetails from "../Components/WorkoutDetails";
import WorkoutForm from "../Components/WorkoutForm";
import { useWorkoutsContext } from "../hooks/useWorkoutsContext";

const Home = () => {
    const {workouts, dispatch} = useWorkoutsContext()

    useEffect(()=> {
        
        const fetchWorkouts = async () =>{
        
            const response = await fetch('http://localhost:4000/api/workouts')
            
            const json = await response.json()
            
            
            if(response.ok){
                dispatch({ type : "SET_WORKOUTS", payload: json})
            }
        }

        fetchWorkouts()
    },[dispatch])

    return(
        <div className="home">
           <div className="workout">
            { workouts && workouts.map((workout) => (
                <WorkoutDetails key={workout._id} workout = {workout}/>
                
            ))}
            
           </div>
           <WorkoutForm/>
        </div>
    )
};

export default Home;
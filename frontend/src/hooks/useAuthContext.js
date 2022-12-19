import { useContext } from "react";
import { AuthContext } from "../Context/AuthContext";

export const useAusthContext = () => {
  const context = useContext(AuthContext)

  if(!context){
    throw  Error('useWorkoutsContext must be used inside an WorkoutContextProvider')
  }
  return context
}
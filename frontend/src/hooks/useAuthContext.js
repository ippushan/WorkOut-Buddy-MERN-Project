import { useContext } from "react";
import { AuthContext } from "../Context/AuthContext";

export const useAuthContext = () => {
  const context = useContext(AuthContext)

  if(!context){
    throw  Error('useAuth must be used inside an WorkoutContextProvider')
  }
  return context
}
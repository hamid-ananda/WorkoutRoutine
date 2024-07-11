import { useAuthContext } from "./useAuthContext";
import { useWorkoutsContext } from "./useWorkoutsContext";

export const useLogout = () => {
    const { dispatch } = useAuthContext();
    const { dispatch: workoutsDispatch } = useWorkoutsContext();

    const logout = () => {
        //remove user from local storage
        localStorage.removeItem('user');

        // dispatch action to remove user from state
        dispatch({type: 'LOGOUT'});
        workoutsDispatch({type: 'SET_WORKOUTS', payload: []});
    }

    return {logout};
}

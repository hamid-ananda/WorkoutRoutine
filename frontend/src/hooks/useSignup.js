import { useState } from "react"
import { useAuthContext } from "./useAuthContext"

export const useSignup = () => {
   const [error, setError] = useState(null);
    const [isLoading, setLoading] = useState(null);
    const { dispatch } = useAuthContext();

    const signup = async (username, email, password) => {
        setLoading(true);
        setError(null);   
            
        const response = await fetch('/api/user/signup', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json'},
            body: JSON.stringify({ username, email, password})
        })

        const json = await response.json()
        if(!response.ok) {
            setLoading(false)
            setError(json.error)
        }
        if(response.ok){ 
            //save user to local storage
            localStorage.setItem("user", JSON.stringify(json))
            //UPDATE AUTH CONTEXT
            dispatch({
                type: 'LOGIN',
                payload: json
            })
            setLoading(false)
        }
    }

    return {
        signup,
        isLoading,
        error
    }   
}
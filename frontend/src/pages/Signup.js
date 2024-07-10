//signup form
import { useState } from "react";
import { useSignup } from "../hooks/useSignup"

const Signup = () => {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const { signup, isLoading, error } = useSignup();

    const handleSubmit = async (e) => {
        e.preventDefault();

        await signup(username, email, password);

    }


    // a return function with a form element with h3 signup heading, email lable with onchange event, password label with onchange event, confirm password label with onchange event, error message with state, loading spinner with state, and a submit button with onclick event
    return (       
        <form className="signup" onSubmit={handleSubmit}>
            <h2>Sign Up</h2>
            <br />
            <label>Username</label>
            <input 
            type="text" 
            value={username} 
            onChange={(e) => setUsername(e.target.value)} />    

            <label>Email</label>
            <input 
            type="email" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} />
            
            <label>Password</label>
            <input 
            type="password" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} />

            <button disabled={isLoading} type="submit">Sign Up</button>
            {error && <div className="error">{error}</div>}
        </form>
    )

}

export default Signup;
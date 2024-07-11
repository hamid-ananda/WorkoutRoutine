//Login form
import { useState } from "react";
import { useLogin } from "../hooks/useLogin";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const { login, error, isLoading } = useLogin();

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        await login(email, password)
    }


    // a return function with a form element with h3 Login heading, email lable with onchange event, password label with onchange event, confirm password label with onchange event, error message with state, loading spinner with state, and a submit button with onclick event
    return (       
        <form className="login" onSubmit={handleSubmit}>
            <h2>Log In</h2>
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

            <button disabled={isLoading}>Log In</button>
            {error && <div className="error">{error}</div>}
        </form>
)

}

export default Login;
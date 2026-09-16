import { useState } from "react";
import { supabase } from "../client";
import { Link, useNavigate } from "react-router-dom";

function Login({ onLogin }) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");

    const navigate = useNavigate();

    async function handleLogin(event) {
        event.preventDefault();

        setMessage("");

        const { data, error } = await supabase.auth.signInWithPassword({
            email: email,
            password: password,
        });

        if (error) {
            setMessage(error.message);
            return;
        }

        onLogin(data.user);
        navigate("/");
    }

    return (
        <div className="auth-page">
            <div className="auth-card">
                <h1>Login</h1>
                <br></br>                <br></br>
                <form onSubmit={handleLogin}>
                    <label>Email</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(event) => setEmail(event.target.value)}
                        required
                    />
                <br></br>
                    <label>Password</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(event) => setPassword(event.target.value)}
                        required
                    />
                                    <br></br>                <br></br>

                    <button type="submit">
                        Login
                    </button>
                </form>

                {message && <p>{message}</p>}
                <br></br>                <br></br>
                <p>
                    Don't have an account?{" "}
                    <Link to="/register">Register</Link>
                </p>
            </div>
        </div>
    );
}

export default Login;
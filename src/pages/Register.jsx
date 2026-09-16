import { useState } from "react";
import { supabase } from "../client";
import { Link, useNavigate } from "react-router-dom";

function Register() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");

    const navigate = useNavigate();

    async function handleRegister(event) {
        event.preventDefault();

        setMessage("");

        const { error } = await supabase.auth.signUp({
            email: email,
            password: password,
        });

        if (error) {
            setMessage(error.message);
            return;
        }

        setMessage("Account created! You can now log in.");
        setEmail("");
        setPassword("");
    }

    return (
        <div className="auth-page">
            <div className="auth-card">
                <h1>Create Account</h1>
                <br></br><br></br>
                <form onSubmit={handleRegister}>
                    <label>Email</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(event) => setEmail(event.target.value)}
                        required
                    />
                    <br></br><br></br>
                    <label>Password</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(event) => setPassword(event.target.value)}
                        required
                    />
                    <br></br><br></br>
                    <button type="submit">
                        Register
                    </button>
                </form>

                {message && <p>{message}</p>}

                <p>
                    Already have an account?{" "}
                    <Link to="/login">Login</Link>
                </p>
            </div>
        </div>
    );
}

export default Register;
import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import { supabase } from "./client";

import Home from "./pages/Home";
import CreateTask from "./pages/CreateTask";
import Login from "./pages/Login";
import Register from "./pages/Register";

import "./App.css";

function App() {
    const [currentUser, setCurrentUser] = useState(null);

    useEffect(() => {
        getUser();

        const { data: listener } = supabase.auth.onAuthStateChange(
            (_event, session) => {
                setCurrentUser(session?.user ?? null);
            }
        );

        return () => {
            listener.subscription.unsubscribe();
        };
    }, []);

    async function getUser() {
        const {
            data: { user },
        } = await supabase.auth.getUser();

        setCurrentUser(user);
    }

    async function handleLogout() {
        await supabase.auth.signOut();
        setCurrentUser(null);
    }

    return (
        <BrowserRouter>
            <nav>


                <Link to="/">
                    Home
                </Link>

                {currentUser && (
                    <Link to="/create">
                        Create Task
                    </Link>
                )}

                {currentUser ? (
                    <button onClick={handleLogout}>
                        Logout
                    </button>
                ) : (
                    <>
                        <Link to="/login">
                            Login
                        </Link>

                        <Link to="/register">
                            Register
                        </Link>
                    </>
                )}
            </nav>

            <Routes>
                <Route
                    path="/"
                    element={<Home currentUser={currentUser} />}
                />

                <Route
                    path="/create"
                    element={<CreateTask currentUser={currentUser} />}
                />

                <Route
                    path="/login"
                    element={<Login onLogin={setCurrentUser} />}
                />

                <Route
                    path="/register"
                    element={<Register />}
                />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
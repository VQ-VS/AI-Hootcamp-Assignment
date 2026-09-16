import { useState } from "react";
import { supabase } from "../client";
import { useNavigate } from "react-router-dom";

function CreateTask({ currentUser }) {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [message, setMessage] = useState("");

    const navigate = useNavigate();

    async function handleCreate(event) {
        event.preventDefault();

        if (!currentUser) {
            setMessage("You must be logged in to create a task.");
            return;
        }

        const { error } = await supabase
            .from("tasks")
            .insert({
                title: title,
                description: description,
                user_id: currentUser.id,
                completed: false
            });

        if (error) {
            console.error("Error creating task:", error);
            setMessage(error.message);
            return;
        }

        navigate("/");
    }

    return (
        <div className="auth-page">
            <div className="auth-card">
                <h1>Create Task</h1>

                <form onSubmit={handleCreate}>
                    <label>Title</label>
                    <input
                        type="text"
                        value={title}
                        onChange={(event) => setTitle(event.target.value)}
                        required
                    />

                    <label>Description</label>
                    <textarea
                        value={description}
                        onChange={(event) =>
                            setDescription(event.target.value)
                        }
                        rows="5"
                        required
                    />

                    <button type="submit">
                        Create Task
                    </button>
                </form>

                {message && <p>{message}</p>}
            </div>
        </div>
    );
}

export default CreateTask;
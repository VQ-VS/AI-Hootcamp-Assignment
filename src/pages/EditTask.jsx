import { useEffect, useState } from "react";
import { supabase } from "../client";
import { useNavigate, useParams } from "react-router-dom";

function EditTask({ currentUser }) {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [loading, setLoading] = useState(true);
    const [message, setMessage] = useState("");

    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        getTask();
    }, []);

    async function getTask() {
        const { data, error } = await supabase
            .from("tasks")
            .select("*")
            .eq("id", id)
            .single();

        if (error) {
            console.error("Error getting task:", error);
            setMessage("Could not find this task.");
            setLoading(false);
            return;
        }

        if (data.user_id !== currentUser?.id) {
            setMessage("You can only edit your own tasks.");
            setLoading(false);
            return;
        }

        setTitle(data.title);
        setDescription(data.description);
        setLoading(false);
    }

    async function handleEdit(event) {
        event.preventDefault();

        if (!currentUser) {
            setMessage("You must be logged in to edit a task.");
            return;
        }

        const { error } = await supabase
            .from("tasks")
            .update({
                title: title,
                description: description
            })
            .eq("id", id);

        if (error) {
            console.error("Error editing task:", error);
            setMessage(error.message);
            return;
        }

        navigate("/");
    }

    if (loading) {
        return <h1>Loading task...</h1>;
    }

    return (
        <div className="auth-page">
            <div className="auth-card">
                <h1>Edit Task</h1>

                <form onSubmit={handleEdit}>
                    <label>Title</label>

                    <input
                        type="text"
                        value={title}
                        onChange={(event) =>
                            setTitle(event.target.value)
                        }
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
                        Save Changes
                    </button>
                </form>

                {message && <p>{message}</p>}
            </div>
        </div>
    );
}

export default EditTask;
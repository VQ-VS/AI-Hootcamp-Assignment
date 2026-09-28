import "./card.css";
import { Link } from "react-router-dom";


function TaskCard({
    task,
    currentUser,
    onComplete,
    onDelete
}) {

    const isOwner = currentUser?.id === task.user_id;

    return (
        <div className={`task-card ${task.completed ? "completed-task" : ""}`}>
            <h2>{task.title}</h2>
            <p>
                Posted by: <strong>{task.username}</strong>
            </p>
            <p>{task.description}</p>

            <p>
                Status:{" "}
                {task.completed ? "✓ Completed" : "☐ Not Completed"}
            </p>

            {task.created_at && (
                <p>
                    Created:{" "}
                    {new Date(task.created_at).toLocaleDateString()}
                </p>
            )}

            {isOwner && (
                <div className="task-actions">

                    {task.completed ? (
                        <button onClick={() => onComplete(task.id, false)}>
                            Uncomplete
                        </button>
                    ) : (
                        <button onClick={() => onComplete(task.id, true)}>
                            Complete
                        </button>
                    )}

                    <Link to={`/edit/${task.id}`}>
                        <button>Edit</button>
                    </Link>

                    <button onClick={() => onDelete(task.id)}>
                        Delete
                    </button>

                </div>
            )}
        </div>
    );
}

export default TaskCard;
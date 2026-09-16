import "./card.css";


function TaskCard({ task, currentUser, onComplete, onEdit, onDelete }) {
    const isOwner = currentUser?.id === task.user_id;

    return (
        <div className="task-card">

            <h2>{task.title}</h2>

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
                    {!task.completed && (
                        <button onClick={() => onComplete(task.id)}>
                            Complete
                        </button>
                    )}

                    <button onClick={() => onEdit(task)}>
                        Edit
                    </button>

                    <button onClick={() => onDelete(task.id)}>
                        Delete
                    </button>
                </div>
            )}

        </div>
    );
}

export default TaskCard;

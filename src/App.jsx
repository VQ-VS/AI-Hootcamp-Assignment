import { useEffect, useState } from "react";
import { supabase } from "./client";
import TaskCard from "./components/TaskCard";
import "./App.css";

function App() {
    const [tasks, setTasks] = useState([]);
    const [loading, setLoading] = useState(true);

    async function getTasks() {
        const { data, error } = await supabase
            .from("tasks")
            .select("*")
            .order("created_at", { ascending: false });

        if (error) {
            console.error("Error getting tasks:", error);
        } else {
            setTasks(data);
        }

        setLoading(false);
    }

    useEffect(() => {
        getTasks();
    }, []);

    async function completeTask(taskId) {
        const { error } = await supabase
            .from("tasks")
            .update({ completed: true })
            .eq("id", taskId);

        if (error) {
            console.error("Error completing task:", error);
            return;
        }

        getTasks();
    }

    async function deleteTask(taskId) {
        const { error } = await supabase
            .from("tasks")
            .delete()
            .eq("id", taskId);

        if (error) {
            console.error("Error deleting task:", error);
            return;
        }

        getTasks();
    }

    function editTask(task) {
        console.log("Edit task:", task);
    }

    if (loading) {
        return <h1>Loading tasks...</h1>;
    }

    return (
        <div className="app">

            <header>
                <h1>🎯 Group Task Board</h1>

                <p>
                    Work together and keep each other motivated!
                </p>
            </header>

            <main>

                <div className="task-summary">
                    <p>Total Tasks: {tasks.length}</p>

                    <p>
                        Completed:{" "}
                        {tasks.filter((task) => task.completed).length}
                    </p>

                    <p>
                        Remaining:{" "}
                        {tasks.filter((task) => !task.completed).length}
                    </p>
                </div>

                <div className="task-grid">

                    {tasks.map((task) => (
                        <TaskCard
                            key={task.id}
                            task={task}
                            onComplete={completeTask}
                            onEdit={editTask}
                            onDelete={deleteTask}
                        />
                    ))}

                </div>

            </main>

        </div>
    );
}

export default App;

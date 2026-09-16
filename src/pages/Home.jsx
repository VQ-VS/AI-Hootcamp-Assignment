import { useEffect, useState } from "react";
import { supabase } from "../client";
import TaskCard from "../components/TaskCard";

function Home({ currentUser }) {
    const [tasks, setTasks] = useState([]);
    const [loading, setLoading] = useState(true);

    async function getTasks() {
        const { data, error } = await supabase
            .from("tasks")
            .select("*")
            .order("created_at", { ascending: false });

        console.log("DATA:", data);
        console.log("ERROR:", error);

        if (error) {
            console.error("Error getting tasks:", error);
        } else {
            setTasks(data);
        }

        setLoading(false);
    }

    async function completeTask(taskId, completed) {
        const { error } = await supabase
            .from("tasks")
            .update({ completed: completed })
            .eq("id", taskId);

        if (error) {
            console.error("Error updating task:", error);
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
    useEffect(() => {
        getTasks();
    }, []);

    if (loading) {
        return <h1>Loading tasks...</h1>;
    }

    return (
        <div className="app">
            <header>
                <h1>🎯 Group Task Board</h1>
                <p>Work together and keep each other motivated!</p>
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
                            currentUser={currentUser}
                            onComplete={completeTask}
                            onDelete={deleteTask}
                        />
                    ))}
                </div>
            </main>
        </div>
    );
}

export default Home;
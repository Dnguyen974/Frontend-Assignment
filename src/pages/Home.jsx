import React, { useEffect, useState } from 'react';
import Card from '../components/Card';
import TaskModal from '../components/AddTaskModal';

const Home = () => {
    const [tasks, setTasks] = useState([]);
    const [tags, setTags] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        const fetchTasks = async () => {
            const response = await fetch('http://localhost:3010/tasks');
            const data = await response.json();
            setTasks(data);
        };

        const fetchTags = async () => {
            const response = await fetch('http://localhost:3010/tags');
            const data = await response.json();
            setTags(data);
        };

        fetchTags();
        fetchTasks();
    }, []);

    const getTagNames = (tagIds) => {
        return tagIds
            .map((id) => tags.find((tag) => tag.id === parseInt(id))) // Find the tag by ID
            .filter(Boolean) // Filter out any undefined results
            .map((tag) => tag.name); // Return the tag names
    };

    const handleAddTask = async (newTask) => {
        // Send POST request to add new task
        await fetch('http://localhost:3010/tasks', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(newTask),
        });

        // Fetch updated tasks list and close modal
        const response = await fetch('http://localhost:3010/tasks');
        const data = await response.json();
        setTasks(data);
        setIsModalOpen(false); // Close the modal
    };

    const handleDeleteTask = async (taskId) => {
        // Send DELETE request to remove the task
        await fetch(`http://localhost:3010/tasks/${taskId}`, {
            method: 'DELETE',
        });

        // Update state to reflect removal
        setTasks((prevTasks) => prevTasks.filter((task) => task.id !== taskId));
    };

    return (
        <div className="home">
            <h1>Tasks</h1>
            <button onClick={() => setIsModalOpen(true)}>Add Task</button>
            <div className="card-container">
                {tasks.map((task) => (
                    <Card
                        key={task.id}
                        taskName={task.name}
                        tags={getTagNames(task.tags.split(','))}
                        onDelete={() => handleDeleteTask(task.id)}
                    />
                ))}
            </div>

            {/* Render TaskModal component and pass handleAddTask */}
            {isModalOpen && (
                <TaskModal
                    onClose={() => setIsModalOpen(false)}
                    onAddTask={handleAddTask}
                    availableTags={tags}
                />
            )}
        </div>
    );
};

export default Home;

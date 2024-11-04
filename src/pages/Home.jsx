import React, { useEffect, useState } from 'react';
import Card from '../components/Card';
import TaskModal from '../components/AddTaskModal';
import AddTagModal from '../components/AddTagModal';

const Home = () => {
    const [tasks, setTasks] = useState([]);
    const [tags, setTags] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingTask, setEditingTask] = useState(null);
    const [isTagModalOpen, setIsTagModalOpen] = useState(false); // State for the tag modal

    useEffect(() => {
        fetchTasks();
        fetchTags();
    }, []);

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

    const getTagNames = (tagIds) => {
        return tagIds
            .map((id) => tags.find((tag) => tag.id === parseInt(id)))
            .filter(Boolean)
            .map((tag) => tag.name);
    };

    const handleAddTask = async (newTask) => {
        await fetch('http://localhost:3010/tasks', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(newTask),
        });
        fetchTasks(); // Refresh task list
        setIsModalOpen(false);
    };

    const handleEditTask = async (updatedTask) => {
        if (!updatedTask.id) {
            console.error("Task ID is missing for update");
            return;
        }
        const response = await fetch(`http://localhost:3010/tasks/${updatedTask.id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(updatedTask),
        });

        if (!response.ok) {
            console.error("Failed to update task");
            return;
        }

        fetchTasks(); // Refresh task list
        setEditingTask(null); // Reset editing task
        setIsModalOpen(false); // Close modal
    };

    const handleDeleteTask = async (taskId) => {
        await fetch(`http://localhost:3010/tasks/${taskId}`, {
            method: 'DELETE',
        });
        fetchTasks(); // Refresh task list after deletion
    };

    const handleEditButtonClick = (task) => {
        setEditingTask(task);
        setIsModalOpen(true);
    };

    const handleAddTag = async (newTagName) => {
        const response = await fetch('http://localhost:3010/tags', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name: newTagName }),
        });

        if (response.ok) {
            fetchTags(); // Refresh tag list
        } else {
            console.error("Failed to add tag");
        }
        setIsTagModalOpen(false); // Close tag modal after adding
    };

    return (
        <div className="home">
            <h1>Tasks</h1>
            <button onClick={() => setIsModalOpen(true)}>Add Task</button>
            <button onClick={() => setIsTagModalOpen(true)}>Add Tag</button> {/* Button to open tag modal */}
            <div className="card-container">
                {tasks.map((task) => (
                    <Card
                        key={task.id}
                        taskName={task.name}
                        tags={getTagNames(task.tags.split(','))}
                        onDelete={() => handleDeleteTask(task.id)}
                        onEdit={() => handleEditButtonClick(task)}
                    />
                ))}
            </div>

            {isModalOpen && (
                <TaskModal
                    task={editingTask}
                    onClose={() => {
                        setIsModalOpen(false);
                        setEditingTask(null);
                    }}
                    onAddTask={editingTask ? handleEditTask : handleAddTask}
                    availableTags={tags}
                />
            )}

            {isTagModalOpen && ( // Render the AddTagModal
                <AddTagModal
                    onClose={() => setIsTagModalOpen(false)}
                    onAddTag={handleAddTag}
                />
            )}
        </div>
    );
};

export default Home;

import React, { useEffect, useState } from 'react';
import Card from '../components/Card';

const Home = () => {
    const [tasks, setTasks] = useState([]);
    const [tags, setTags] = useState([]);

    useEffect(() => {
        const fetchTasks = async () => {
            const response = await fetch('http://localhost:3010/tasks');
            const data = await response.json();
        setTasks(data);
        };

        const fetchTags = async () => {
            const response = await fetch('http://localhost:3010/tags');
            const data = await response.json()
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

    return (
        <div className="home">
            <h1>Tasks</h1>
            <div className="card-container">
                {tasks.map((task) => (
                    <Card key={task.id} taskName={task.name} tags={getTagNames(task.tags.split(','))} />
                ))}
            </div>
        </div>
    );
};

export default Home;

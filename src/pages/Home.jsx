import React, { useEffect, useState } from 'react';
import { DndContext } from '@dnd-kit/core';
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { arrayMove } from '@dnd-kit/sortable';
import Card from '../components/Card';
import TaskModal from '../components/AddTaskModal';
import AddTagModal from '../components/AddTagModal';
import FilterModal from '../components/FilterModal';
import RemoveTagModal from '../components/RemoveTagModal'; // Import new modal
import { SortableItem } from '../components/SortableItem';

const Home = () => {
    const [tasks, setTasks] = useState([]);
    const [tags, setTags] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingTask, setEditingTask] = useState(null);
    const [isTagModalOpen, setIsTagModalOpen] = useState(false);
    const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);
    const [isRemoveTagModalOpen, setIsRemoveTagModalOpen] = useState(false); // New state for removing tags
    const [filteredTasks, setFilteredTasks] = useState([]);

    useEffect(() => {
        fetchTasks();
        fetchTags();
    }, []);

    const fetchTasks = async () => {
        const response = await fetch('http://localhost:3010/tasks');
        const data = await response.json();
        setTasks(data);
        setFilteredTasks(data);
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
        fetchTasks();
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

        fetchTasks();
        setEditingTask(null);
        setIsModalOpen(false);
    };

    const handleDeleteTask = async (taskId) => {
        await fetch(`http://localhost:3010/tasks/${taskId}`, {
            method: 'DELETE',
        });
        fetchTasks();
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
            fetchTags();
        } else {
            console.error("Failed to add tag");
        }
        setIsTagModalOpen(false);
    };

    const handleRemoveTag = async (tagId) => {
        await fetch(`http://localhost:3010/tags/${tagId}`, {
            method: 'DELETE',
        });
        fetchTags(); // Refresh tags after deletion
    };

    const handleFilterTasks = (selectedTagIds) => {
        const filtered = tasks.filter((task) =>
            selectedTagIds.every((tagId) => task.tags.split(',').includes(tagId))
        );
        setFilteredTasks(filtered);
    };

    const handleDragEnd = (event) => {
        const { active, over } = event;

        if (active.id !== over.id) {
            const oldIndex = filteredTasks.findIndex(task => task.id === active.id);
            const newIndex = filteredTasks.findIndex(task => task.id === over.id);
            const updatedTasks = arrayMove(filteredTasks, oldIndex, newIndex);
            setFilteredTasks(updatedTasks);
        }
    };

    return (
        <DndContext onDragEnd={handleDragEnd}>
            <SortableContext items={filteredTasks.map(task => task.id)} strategy={verticalListSortingStrategy}>
                <div className="home">
                    <button onClick={() => setIsModalOpen(true)}>Add Task</button>
                    <button onClick={() => setIsTagModalOpen(true)}>Add Tag</button>
                    <button onClick={() => setIsRemoveTagModalOpen(true)}>Remove Tag</button>
                    <button onClick={() => setIsFilterModalOpen(true)}>Filter Tasks</button>
                    <div className="card-container">
                        {filteredTasks.map((task) => (
                            <SortableItem key={task.id} id={task.id}>
                                <Card
                                    taskName={task.name}
                                    tags={getTagNames(task.tags.split(','))}
                                    onDelete={() => handleDeleteTask(task.id)}
                                    onEdit={() => handleEditButtonClick(task)}
                                />
                            </SortableItem>
                        ))}
                    </div>
                </div>
            </SortableContext>

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

            {isTagModalOpen && (
                <AddTagModal
                    onClose={() => setIsTagModalOpen(false)}
                    onAddTag={handleAddTag}
                />
            )}

            {isRemoveTagModalOpen && (
                <RemoveTagModal
                    availableTags={tags}
                    onClose={() => setIsRemoveTagModalOpen(false)}
                    onRemoveTag={handleRemoveTag}
                />
            )}

            {isFilterModalOpen && (
                <FilterModal
                    availableTags={tags}
                    onClose={() => setIsFilterModalOpen(false)}
                    onFilter={handleFilterTasks}
                />
            )}
        </DndContext>
    );
};

export default Home;

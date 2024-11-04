import React, { useState, useEffect } from 'react';
import '../styles/AddTaskModal.css';

const AddTaskModal = ({ task, availableTags, onClose, onAddTask }) => {
    const [taskName, setTaskName] = useState('');
    const [selectedTags, setSelectedTags] = useState([]);

    useEffect(() => {
        if (task) {
            setTaskName(task.name);
            setSelectedTags(task.tags.split(',')); // Pre-select tags if editing
        } else {
            setTaskName(''); // Reset if adding a new task
            setSelectedTags([]);
        }
    }, [task]);

    const handleTagChange = (tagId) => {
        setSelectedTags((prevSelectedTags) =>
            prevSelectedTags.includes(tagId)
                ? prevSelectedTags.filter((id) => id !== tagId)
                : [...prevSelectedTags, tagId]
        );
    };

    const handleAddTask = () => {
        if (taskName.trim() === '') {
            alert("Task name can't be empty!");
            return;
        }
        onAddTask({ id: task?.id, name: taskName, tags: selectedTags.join(',') }); // Include task ID
        onClose();
    };

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <h2 className="modal-title">{task ? 'Edit Task' : 'Add New Task'}</h2>
                <label className="modal-label">
                    Task Name:
                    <input
                        className="modal-input"
                        type="text"
                        value={taskName}
                        onChange={(e) => setTaskName(e.target.value)}
                        placeholder="Enter task name"
                    />
                </label>
                <div>
                    <h3 className="tag-title">Select Tags:</h3>
                    <div className="tag-container">
						{availableTags.map((tag) => (
                        	<label key={tag.id} className="tag-label">
                            	<input
                                	type="checkbox"
                                	checked={selectedTags.includes(tag.id.toString())}
                                	onChange={() => handleTagChange(tag.id.toString())}
                                	className="tag-checkbox"
                            	/>
                            {tag.name}
                        </label>
                    	))}
					</div>
                </div>
                <div className="modal-buttons">
                    <button className="modal-button cancel" onClick={onClose}>
                        Cancel
                    </button>
					<button className="modal-button add" onClick={handleAddTask}>
                        {task ? 'Update Task' : 'Add Task'}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AddTaskModal;

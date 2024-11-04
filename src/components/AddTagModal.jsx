import React, { useState } from 'react';
import '../styles/AddTagModal.css';

const AddTagModal = ({ onClose, onAddTag }) => {
    const [tagName, setTagName] = useState('');

    const handleAddTag = () => {
        if (tagName.trim() === '') {
            alert("Tag name can't be empty!");
            return;
        }
        onAddTag(tagName.trim());
        setTagName(''); // Clear input after adding
        onClose();
    };

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <h2 className="modal-title">Add New Tag</h2>
                <label className="modal-label">
                    Tag Name:
                    <input
                        className="modal-input"
                        type="text"
                        value={tagName}
                        onChange={(e) => setTagName(e.target.value)}
                        placeholder="Enter tag name"
                    />
                </label>
                <div className="modal-buttons">
                    <button className="modal-button cancel" onClick={onClose}>
                        Cancel
                    </button>
                    <button className="modal-button add" onClick={handleAddTag}>
                        Add Tag
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AddTagModal;

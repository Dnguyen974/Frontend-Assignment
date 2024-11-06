import React, { useState } from 'react';
import '../styles/RemoveTagModal.css';

const RemoveTagModal = ({ availableTags, onClose, onRemoveTag }) => {
    const [selectedTagId, setSelectedTagId] = useState(null);

    const handleRemove = () => {
        if (selectedTagId) {
            onRemoveTag(selectedTagId);
            onClose(); // Close modal after removal
        }
    };

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <div className="modal-header remove">
                    <h2 className="modal-title">Remove Tag</h2>
                </div>
                <div className="modal-body">
                    <p className="remove-info">Select a tag to remove:</p>
                    <div className="tag-container">
                        <ul>
                            {availableTags.map(tag => (
                                <li key={tag.id}>
                                    <label className="tag-label">
                                        <input
                                            type="radio"
                                            name="tag"
                                            value={tag.id}
                                            onChange={() => setSelectedTagId(tag.id)}
                                        />
                                        {tag.name}
                                    </label>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
                <div className="modal-footer">
                    <button className="modal-button cancel" onClick={onClose}>Cancel</button>
                    <button className="modal-button apply" onClick={handleRemove} disabled={!selectedTagId}>Remove Tag</button>
                </div>
            </div>
        </div>
    );
};

export default RemoveTagModal;

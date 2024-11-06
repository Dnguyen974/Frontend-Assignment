import React, { useState, useEffect } from 'react';
import '../styles/FilterModal.css';

const FilterModal = ({ availableTags, onClose, onFilter }) => {
    const [selectedTags, setSelectedTags] = useState([]);

    const handleTagChange = (tagId) => {
        setSelectedTags((prevSelectedTags) =>
            prevSelectedTags.includes(tagId)
                ? prevSelectedTags.filter((id) => id !== tagId)
                : [...prevSelectedTags, tagId]
        );
    };

    const handleFilter = () => {
        onFilter(selectedTags);
        onClose();
    };

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <h2 className="modal-title">Filter Tasks by Tags</h2>
                <div className="tag-selection">
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
                    <button className="modal-button apply" onClick={handleFilter}>
                        Apply Filter
                    </button>
                </div>
            </div>
        </div>
    );
};

export default FilterModal;

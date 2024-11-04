import React from 'react';
import '../styles/Card.css';

const Card = ({ taskName, tags, onDelete, onEdit }) => {
    return (
        <div className="card">
            <h3 className="card-title">{taskName}</h3>
            <p className="card-tags">{tags.join(', ')}</p>
            <div className="card-buttons">
                <button className="edit-task-button" onClick={onEdit}>Edit</button>
                <button className="remove-task-button" onClick={onDelete}>Remove Task</button>
            </div>
        </div>
    );
};

export default Card;

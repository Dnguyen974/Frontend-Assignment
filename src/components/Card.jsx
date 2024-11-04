import React from 'react';
import '../styles/Card.css';

const Card = ({ taskName, tags, onDelete}) => {
    return (
        <div className="card">
            <h3 className="card-title">{taskName}</h3>
            <p className="card-tags">{tags.join(', ')}</p>
            <button className="remove-task-button" onClick={onDelete}>Remove Task</button>
        </div>
    );
};

export default Card;

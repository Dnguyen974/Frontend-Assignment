import React from 'react';
import '../styles/Card.css';

const Card = ({ taskName, tags }) => {
    return (
        <div className="card">
            <h3 className="card-title">{taskName}</h3>
            <p className="card-tags">{tags.join(', ')}</p>
        </div>
    );
};

export default Card;

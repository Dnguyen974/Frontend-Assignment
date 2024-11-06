import React from 'react';
import '../styles/Info.css';

const Info = () => {
    return (
        <div className="info-container">
            <h1 className="info-title">App Information</h1>

            <section className="info-section">
                <h2 className="info-heading">Author</h2>
                <p className="info-content">Author Name: <strong>Nguyen Dang</strong></p>
            </section>

            <section className="info-section">
                <h2 className="info-heading">AI Tools Used</h2>
                <p className="info-content">
                    During the development of this app, GPT-3.5/ChatGPT were used for minor coding problems encountered and some assistance in styling the app.
                </p>
            </section>

            <section className="info-section">
                <h2 className="info-heading">Time Spent</h2>
                <p className="info-content">Total Hours Spent: <strong>26 hours</strong></p>
            </section>

            <section className="info-section">
                <h2 className="info-heading">Challenges</h2>
                <p className="info-content">
                    Most difficult/tedious challenge faced during development:
                    <ul>
                        <li>Implementing time tracking functionality.</li>
                        <li>Dealing with poor quality API.</li>
                    </ul>
                </p>
            </section>
        </div>
    );
};


export default Info;

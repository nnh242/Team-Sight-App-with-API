import React from 'react';
import './task.css';

export default function Task(props) {
    return (
        <div className="task">
            {props.text}
        </div>
    );
};

Task.defaultProps = {
    text: ''
};
import React from 'react';
import './task.css';
import {connect} from 'react-redux';

export default function Task(props) {
    return (
        <div className="task">
            {props.taskName}
        </div>
    );
};

import React from 'react';
import './task.css';
import {connect} from 'react-redux';

export function Task(props) {
    return (
        <div className="task">
            {props.taskName}
        </div>
    );
};
export default connect()(Task);
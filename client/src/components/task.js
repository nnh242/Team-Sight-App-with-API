import React from 'react';
import './task.css';
import {connect} from 'react-redux';

export default function Task(props) {
    return (
        <div className="task">
            {props.taskName}
           {/*  {props.estimateTime}
            {props.actualTime}
            {props.id} */}
        </div>
    );
};

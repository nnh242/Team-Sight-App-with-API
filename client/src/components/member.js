import React from 'react';
import {connect} from 'react-redux';

import Task from './task';
import Time from './time';
import TaskForm from './task-form';

import {addTask} from '../actions/protected-data';

import './member.css';

export class Member extends React.Component {
    addTask(text) {
        this.props.dispatch(addTask(text, this.props.index));
    }

    render() {
        const tasks = this.props.tasks.map((task, index) =>
            <div key={index} className="task-container"><Task className="task-name" {...task} /><Time className="est" key={task.estimateTime} time={task.estimateTime}/><Time className="actual" key={task.actualTime} time={task.actualTime}/></div>
        );
        return (
            <div className="member">
                <h3>{this.props.name}</h3>
                <div className="task-container"><h4 className="task-name">Task Name</h4><h4 className="est">Estimate</h4><h4 className="actual">Actual</h4></div>
                {tasks}
                <TaskForm type="task" onAdd={text => this.addTask(text)} />
            </div>
        );
    }
}

Member.defaultProps = {
    name: ''
};

export default connect()(Member);
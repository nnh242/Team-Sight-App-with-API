import React from 'react';
import {connect} from 'react-redux';

import Task from './task';
import Time from './time';
import TaskForm from './task-form';

import {addTask} from '../actions/protected-data';

import './member.css';

export class Member extends React.Component {
    addTaskHandler(task) {
        console.log(task,this.props.accId,this.props._id);
        this.props.dispatch(addTask(this.props.accId,this.props._id,task));
    }

    render() {
        const tasks = this.props.tasks.map((task, index) =>
            <div key={index} className="task-container"><Task className="task-name" {...task} /><Time className="est" time={task._estimateTime}/><Time className="actual"  time={task.actualTime}/></div>
        );
        return (
            <div className="member">
                <h3>{this.props.name}</h3>
                <div className="task-container"><h4 className="task-name">Task Name</h4><h4 className="est">Estimate</h4><h4 className="actual">Actual</h4></div>
                {tasks}
                <TaskForm type="task" onAdd={task => this.addTaskHandler(task)} />
            </div>
        );
    }
}

const mapStateToProps = state => ({
    members: state.protectedData.members,
    accId: state.auth.currentUser._id
});

export default connect(mapStateToProps)(Member);
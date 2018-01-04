import React from 'react';
import {connect} from 'react-redux';

import Task from './task';
import Time from './time';
import TaskForm from './task-form';

import {addTask,deleteMember} from '../actions/protected-data';

import './member.css';

export class Member extends React.Component {
    addTaskHandler(taskName,estimateTime,actualTime) {
        this.props.dispatch(addTask(this.props.accId,this.props._id,taskName, estimateTime, actualTime));
    }
    deleteMemberHandler(accId,memId){
      this.props.dispatch(deleteMember(accId,memId))
    }
    render() {
        const tasks = this.props.tasks.map((task, index) =>
            <div key={index} className="task-container"><Task className="task-name" {...task} /><Time className="est" time={task.estimateTime}/><Time className="actual"  time={task.actualTime}/></div>
        );
        console.log(this.props);
        return (
            <div className="member">
                <h3>{this.props.name}</h3><button type="button" onClick={ (accId,memId) => this.deleteMemberHandler(accId,this.props._id)}>Delete</button>
                <div className="task-container"><h4 className="task-name">Task Name</h4><h4 className="est">Estimate</h4><h4 className="actual">Actual</h4></div>
                {tasks}
                <TaskForm type="task" onAdd={(taskName,estimateTime,actualTime) => this.addTaskHandler(taskName,estimateTime,actualTime)} />
            </div>
        );
    }
}

const mapStateToProps = state => ({
    members: state.protectedData.members,
    accId: state.auth.currentUser._id
});

export default connect(mapStateToProps)(Member);

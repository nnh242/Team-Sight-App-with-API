import React from 'react';
import {connect} from 'react-redux';

import Task from './task';
import AddForm from './add-form';

import {addTask} from '../actions/protected-data';

import './member.css';

export class Member extends React.Component {
    addTask(text) {
        this.props.dispatch(addTask(text, this.props.index));
    }

    render() {
        const tasks = this.props.tasks.map((task, index) =>
            <Task key={index} {...task} />
        );
        return (
            <div className="member">
                <h3>{this.props.name}</h3>
                {tasks}
                <AddForm type="task" onAdd={text => this.addTask(text)} />
            </div>
        );
    }
}

Member.defaultProps = {
    name: ''
};

export default connect()(Member);
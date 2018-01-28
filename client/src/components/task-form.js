import React from 'react';

import './task-form.css';

export default class TaskForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            editing: false
        }
        this.onSubmit = this.onSubmit.bind(this);
        this.setEditing = this.setEditing.bind(this);
    }

    onSubmit(event) {
        event.preventDefault();

        const taskName = this.taskNameInput.value.trim();

        const estimateTime = this.estimateTimeInput.value.trim();

        const actualTime = this.actualTimeInput.value.trim();

        if (taskName && estimateTime && actualTime && this.props.onAdd) {
            this.props.onAdd(this.taskNameInput.value, this.estimateTimeInput.value,this.actualTimeInput.value);
        }

        this.taskNameInput.value = '';
        this.estimateTimeInput.value = '';
        this.actualTimeInput.value = '';
    }

    setEditing(editing) {
        this.setState({
            editing
        });
    }
    render() {
        if (!this.state.editing) {
            return (
                <div className="add-button"
                onClick={() => this.setEditing(true)}>
                    <a>Add a {this.props.type}...</a>
                </div>
            );
        }
        return (
            <form className="task-form" onClick={this.onSubmit} >
                <lable htmlFor="task-name">Task </lable>
                <input name="task-name" type="text" ref={taskName => this.taskNameInput = taskName} placeholder="testing"/>
                <lable htmlFor="estimateTime">Estimate (#hrs)</lable>
                <input name="estimateTime"type="number" ref={estimateTime => this.estimateTimeInput = estimateTime} placeholder="2"/>
                <lable htmlFor="actualTime">Actual Time(#hrs)</lable>
                <input name="actualTime" type="number" ref={actualTime => this.actualTimeInput = actualTime} placeholder="12"/>
                <div className="task-buttons">
                  <button type="submit">Add</button>
                  <button type="button" onClick={() => this.setEditing(false)}>Cancel</button>
                </div>
            </form>
        );
    }
}

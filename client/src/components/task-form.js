import React from 'react';

import './add-form.css';

export default class TaskForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            editing: false
        }

        this.onSubmit = this.onSubmit.bind(this);
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
            <form className="task task-form" onSubmit={this.onSubmit}>
                <input type="text" ref={input => this.taskNameInput = input} placeholder="task's name"/>
                <input type="number" ref={input => this.estimateTimeInput = input} placeholder="estimate time"/>
                <input type="number" ref={input => this.actualTimeInput = input} placeholder="actual time"/>
                <button>+</button>
                <button type="button" onClick={() => this.setEditing(false)}>X</button>
            </form>
        );
    }
}
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

// const mapStateToProps = state => ({
//     tasks: state.protectedData.members.tasks.taskName,
//     accId: state.auth.currentUser._id
// });

// export default connect(mapStateToProps)(Task);
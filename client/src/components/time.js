import React from 'react';
import './time.css';
import {connect} from 'react-redux';
export function Time({time}) {
    return (
        <div className="time">
            {time} hr(s)
        </div>
    );
};
export default connect()(Time);
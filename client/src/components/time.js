import React from 'react';
import './time.css';
export default function Time({time}) {
    return (
        <div className="time">
            {time}
        </div>
    );
};

Time.defaultProps = {
    time: ''
};
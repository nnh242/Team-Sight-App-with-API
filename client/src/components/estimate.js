import React from 'react';
import './estimate.css';
export default function Time({time}) {
    return (
        <div className="estimate">
            {time}
        </div>
    );
};

Time.defaultProps = {
    time: ''
};
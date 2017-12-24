import React from 'react';
import {Line} from 'react-chartjs-2';
import {connect} from 'react-redux';
class Chart extends React.Component{
    render(){
        console.log(this.props);
        return (
            <div className="chart">
            <Line />
            </div>
        )
    }
}

export default connect()(Chart);

import React from 'react';
import Logo from './logo.png';
import {Line} from 'react-chartjs-2';
import {connect} from 'react-redux';
import './chart.css'
function contentClass(isShow) {
    if (isShow) {
      return "content";
    }
    return "content invisible";
  }
  
export class Chart extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
          isShow: false,
          chartData: {
              labels: [this.props.taskName],
              datasets: [
                  {
                      label: estimateTime,
                  }
              ]
          }
    };
      this.handleClick = this.handleClick.bind(this);
    }
    handleClick() {
      this.setState(function(prevState) {
        return {isShow: !prevState.isShow};
      });
    }
    render() {
    
      return (
        <div>
          <button type="button" className='control' onClick={this.handleClick}><img src={Logo} alt="TeamSight - See Your Team" className="logo"/></button>
          <div className={contentClass(this.state.isShow)}>
          <Line data= {chartData}/>
          </div>
        </div>
      );
    }
  }

const mapStateToProps = state => ({
    members: state.protectedData.members,
    accId: state.auth.currentUser._id
});

export default connect(mapStateToProps)(Chart);



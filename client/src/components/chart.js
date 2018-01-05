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
const estimateArray= [];
function calculateEstimateArray(){
  for(let i=0; i<this.props.members.length; i++){
    for(let j=0; j<this.props.members[i].tasks.length; j++){
      estimateArray.push(this.props.tasks[j].estimateTime);
    }
  }
  return estimateArray;
}

export class Chart extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
          isShow: false,
          chartData: {
              labels: ["task 1", "task 2", "task 3"],
              datasets: [
                  {
                      label: "estimate time",
                      data: `${estimateArray}`,
                      borderColor: "white"
                  },
                  {
                    label: "actual time",
                    data: [2,5,6],
                    borderColor: "#FF3D00"
                  }
              ]
          },
          options: {
            legend: {
              display: true,
              labels: {
                fontColor: "white"
              }
            }
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
          <img src={Logo} alt="TeamSight - See Your Team" className="logo"/>
          <button type="button" className='control' onClick={this.handleClick}>See Your Team</button>
          <div className={contentClass(this.state.isShow)}>
          <Line data= {this.state.chartData} options={this.state.options}/>
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

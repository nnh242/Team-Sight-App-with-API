import React from 'react';
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
    calculateArray(labelArray,estimateArray,actualArray){
      for(let i=0; i<this.props.members.length; i++){
        for(let j=0; j<this.props.members[i].tasks.length; j++){
          labelArray.push(this.props.members[i].tasks[j].taskName);
          estimateArray.push(this.props.members[i].tasks[j].estimateTime);
          actualArray.push(this.props.members[i].tasks[j].actualTime);
        }
      }
    }
    constructor(props) {
      super(props);
      this.labelArray=[];
      this.estimateArray=[];
      this.actualArray=[];
      this.calculateArray(this.labelArray,this.estimateArray,this.actualArray);
      this.state = {
          isShow: false,
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
      this.labelArray=[];
      this.estimateArray=[];
      this.actualArray=[];
      this.calculateArray(this.labelArray,this.estimateArray,this.actualArray);
      let chartData= {
          labels: this.labelArray,
          datasets: [
              {
                  label: "estimate time",
                  data: this.estimateArray,
                  borderColor: "white"
              },
              {
                label: "actual time",
                data: this.actualArray,
                borderColor: "#00838f"
              }
          ]
      }
      return (
        <div>
          <button type="button" className='control' onClick={this.handleClick}>Toggle Chart</button>
          <div className={contentClass(this.state.isShow)}>
          <Line data= {chartData} options={this.state.options}/>
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

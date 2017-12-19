import React from 'react';
import {connect} from 'react-redux';
import requiresLogin from './requires-login';
import {fetchProtectedData} from '../actions/protected-data';
import './dashboard.css';
import Team from './team';
export class Dashboard extends React.Component {
    componentDidMount() {
        this.props.dispatch(fetchProtectedData(this.props.accId));
    }

    render() {
        return (
            <div className="dashboard">
                <div className="dashboard-name">{this.props.teamName}</div>
                <div className="dashboard-protected-data">
                    Protected data: {this.props.protectedData}
                </div>
                <Team />
            </div>
        );
    }
}

const mapStateToProps = state => {
    const {currentUser} = state.auth;
    return {
        teamName: state.auth.currentUser.teamname,
        protectedData: state.protectedData.data,
        accId: state.auth.currentUser._id
    };
};

export default requiresLogin()(connect(mapStateToProps)(Dashboard));

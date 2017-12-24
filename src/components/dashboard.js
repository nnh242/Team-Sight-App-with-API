import React from 'react';
import {connect} from 'react-redux';
import requiresLogin from './requires-login';
import {fetchProtectedData} from '../actions/protected-data';
import './dashboard.css';
import Logo from './logo.png';
import Team from './team';
export class Dashboard extends React.Component {
    componentDidMount() {
        this.props.dispatch(fetchProtectedData(this.props.accId));
    }

    render() {
        return (
            <div className="dashboard">
                <div className="dashboard-name">{this.props.teamname}</div>
                <img src={Logo} alt="TeamSight - See Your Team" className="logo"/>
                <Team />
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        teamname: state.auth.currentUser.teamname,
        accId: state.auth.currentUser._id
    };
};

export default requiresLogin()(connect(mapStateToProps)(Dashboard));

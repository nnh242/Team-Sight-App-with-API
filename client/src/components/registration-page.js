import React from 'react';
import {connect} from 'react-redux';
import {Link, Redirect} from 'react-router-dom';
import './registration-page.css'
import RegistrationForm from './registration-form';
import Logo from './logo.png';
export class RegistrationPage extends React.Component {
    // If we are logged in (which happens automatically when registration
    // is successful) redirect to the user's dashboard
  handleOnClick(){
    return <Redirect to="/" />;
  }
  render(){
    if (this.props.loggedIn) {
        return <Redirect to="/dashboard" />;
    }
    return (
        <div className="registrationForm">
            <button type="button" name="button" className="logo-button" onClick={() => this.handleOnClick()}><img src={Logo} alt="Team Sight" className="logo"/></button>
            <h2>Register for Team Sight</h2>
            <RegistrationForm />
        </div>
    );
  }
}

const mapStateToProps = state => ({
    loggedIn: state.auth.currentUser !== null
});

export default connect(mapStateToProps)(RegistrationPage);

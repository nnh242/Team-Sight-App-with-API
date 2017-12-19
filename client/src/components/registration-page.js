import React from 'react';
import {connect} from 'react-redux';
import {Link, Redirect} from 'react-router-dom';
import './registration.css'
import RegistrationForm from './registration-form';

export function RegistrationPage(props) {
    // If we are logged in (which happens automatically when registration
    // is successful) redirect to the user's dashboard
    if (props.loggedIn) {
        return <Redirect to="/dashboard" />;
    }
    return (
        <div className="registratonForm">
            <h2>Register for Team Sight</h2>
            <RegistrationForm />
            <Link to="/">Login</Link>
            <br/>
            <p className="demo">Skip registration by logging in <a href="/login">here</a> with demo account below:</p>
            <p className="demo">Username: demo</p>
            <p className="demo">Password: demopassword</p>
        </div>
    );
}

const mapStateToProps = state => ({
    loggedIn: state.auth.currentUser !== null
});

export default connect(mapStateToProps)(RegistrationPage);

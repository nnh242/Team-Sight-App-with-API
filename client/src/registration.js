import React from 'react';
import './registration.css';
import {Field, reduxForm} from 'redux-form';

const RegistrationForm = props => {
    const {errorMessage,handleSubmit,pristine,reset,submitting} = props;
        return(
            <div className="registration">
                <form className="registrationForm" onSubmit={handleSubmit(props.registerSubmit)}>
                    <Field
                    label="teamname"
                    placeholder="teamname"
                    name="teamname"
                    component="input"/>
                    <Field
                    label="username"
                    placeholder="username"
                    name="username"
                    component="input"/>
                    <Field
                    label="password"
                    placeholder="password"
                    name="password"
                    component="input"
                    type="password"/>
                    <button type="submit" disabled={pristine || submitting} >Register</button>
                </form>
                <br/>
            <p className="demo">Skip registration by logging in <a href="/login">here</a> with demo account below:</p>
            <p className="demo">Username: demo</p>
            <p className="demo">Password: demopassword</p>
            </div>
        )
    }
export default reduxForm({
    form: 'Registration Form'
})(RegistrationForm);
    
import React from 'react';
import {Field, reduxForm, focus} from 'redux-form';
import {registerUser} from '../actions/users';
import {login} from '../actions/auth';
import Input from './input';
import {required, nonEmpty, matches, length, isTrimmed} from '../validators';

export class RegistrationForm extends React.Component {
    onSubmit(values) {
        const {username, password, teamname} = values;
        const user = {username, password, teamname};
        return this.props
            .dispatch(registerUser(user))
            .then(() => this.props.dispatch(login(username, password)));
    }

    render() {
        return (
            <form onSubmit={this.props.handleSubmit(values =>
                    this.onSubmit(values)
                )}>
                <div className="input-control">
                <label className="registration-label" htmlFor="teamname">Team's name</label>
                <Field component={Input} type="text" name="teamname" />
                </div>
                <div className="input-control">
                <label className="registration-label" htmlFor="username">Username</label>
                <Field
                    component={Input}
                    type="text"
                    name="username"
                    validate={[required, nonEmpty, isTrimmed]}
                />
                </div>
                <div className="input-control">
                <label className="registration-label" htmlFor="password">Password</label>
                <Field
                    component={Input}
                    type="password"
                    name="password"
                    validate={[required, length({min: 6, max: 72}), isTrimmed]}
                />
                </div>
                <div className="input-control">
                <label className="registration-label" htmlFor="passwordConfirm">Confirm password</label>
                <Field
                    component={Input}
                    type="password"
                    name="passwordConfirm"
                    validate={[required, nonEmpty, matches('password')]}
                />
                </div>
                <button
                    type="submit"
                    disabled={this.props.pristine || this.props.submitting}>
                    Register
                </button>
            </form>
        );
    }
}

export default reduxForm({
    form: 'registration',
    onSubmitFail: (errors, dispatch) =>
        dispatch(focus('registration', Object.keys(errors)[0]))
})(RegistrationForm);

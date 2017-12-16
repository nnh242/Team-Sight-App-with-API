import React from 'react';
import './login.css';
import Logo from './logo.png';
import {Field, reduxForm} from 'redux-form';

const Login=props => {
    const {errorMessage,handleSubmit,pristine,reset,submitting} = props;
    return(
        <div className="login">
        <form
         className="login-form" onSubmit={handleSubmit}>
             <div className="imgcontainer">
                 <img src={Logo} alt="Logo" className="logo"/>
                 <h2>Team Sight</h2>
             </div>
             <div className="container">
             <label htmlFor="username">Username</label>
             <Field
                 component="input"
                 type="text"
                 name="username"
                 id="username"
             />
             <label htmlFor="password">Password</label>
             <Field
                 component="input"
                 type="password"
                 name="password"
                 id="password"
             />
             <button type="submit">
                 Log in
             </button>
             </div>
         </form>
         <br/>
     <p className="demo"> Demo Account</p>
     <p className="demo">Username: demo</p>
     <p className="demo">Password: demopassword</p>
     </div>
 )
}
export default reduxForm({
    form: 'login'
})(Login);
import React from 'react';
import {connect} from 'react-redux';
import {Link, Redirect} from 'react-router-dom';
import './landing-page.css';
import LoginForm from './login-form';
import Banner from './banner.png';
import TeamScreen from './team.png';
export function LandingPage(props) {
    if (props.loggedIn) {
        return <Redirect to="/dashboard" />;
    }
    return (
        <div className="home-page">
            <section className="header-with-login">
            <div>
            <img src={Banner} alt="Team Sight" className="banner"/>
            <header>
                <h3>Actual Time {"<"} Estimates {"<"}={">"} Optimization.</h3>
            </header>
            <p>Team Sight helps you become aware of what your team members are working on by comparing the estimated and actual duration of their tasks.</p>
            </div>
            <div>
            <LoginForm className="login-form" />
            <button type="button" name="button" className="register-button"><Link to="/register" className="link">Register</Link></button>
            </div>
            </section>
            <section>
                <div className="app-description">
                  <div>
                  <img src={TeamScreen} alt="team" className="team-img"/>
                  </div>
                  <div className="text-app-description">
                  <header>
                      <h3>Keep track of progress</h3>
                  </header>
                  <p>This simple chart is powerful to see the progressive patterns and plan for optimization.</p>
                  <header>
                      <h3>Assign tasks and members</h3>
                  </header>
                  <p> A constant struggle for a project manager is to gather the current tasks and predict their time to complete.</p>
                  <p>TeamSight provides a simple interface that helps to keep track of these metrics.</p>
                  </div>
                </div>
            </section>
            <footer>©2017 Made by Tina Hoang - Logo and Banner Made By LogoJoy</footer>
        </div>
    );
}

const mapStateToProps = state => ({
    loggedIn: state.auth.currentUser !== null
});

export default connect(mapStateToProps)(LandingPage);

import React, { Component } from 'react';
import './App.css';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import HomePage from './homepage';
import LogIn from './login';
//import Team from './team';

class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          <main>
              <Route exact path="/" component={HomePage} />
              <Route exact path="/login" component={LogIn} /> 
              {/*<Route exact path="/team" component={Team} />*/}
          </main>
        </div>
      </Router>
    );
  }
}

export default App;

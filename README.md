# Team Sight - See Your Team

This project is bootstrapped from Create-React-App.

<p align="center">
  <img width="460" height="300" src="https://raw.githubusercontent.com/nnh242/Team-Sight-App-with-API/deploy-branch/public/banner.png">
</p>

Team Sight helps you become aware of what your team members are working on by comparing the estimated and actual duration of their tasks. Actual Time < Estimates <=> Optimization. Once you enter all the tasks, data will be updated to a simple but powerful chart that allow you to see the progressive patterns and plan for optimization. It's dead simple and easy to use. Watch this:

<p align="center">
  <img src ="https://raw.githubusercontent.com/nnh242/Team-Sight-App-with-API/deploy-branch/public/teamsight-play.gif">
</p>

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.

### Prerequisites

Things you need to install the software and how to install them:
node.js -- download it [here](https://nodejs.org/en/)

You will also need to install this create-react-app on global.

```
npx create-react-app my-app
cd my-app
npm start
```

### Installing

You will need to install all dependencies once you clone/download the app.

```
npm install
```
### Running the App
Just click the live link: (team-sight.herokuapp.com)  . Why bother going through this boring documentation to set this up locally? No? Okay, see below:
Since this project has both the server and the client in the same repo, you may need something like:

```
npm start
```
The start script will run both the server.js and client.js concurrently.
Sounds cool? I learned how to run these concurrently here: (https://www.fullstackreact.com/articles/using-create-react-app-with-a-server/)

## Running the tests

//TO DO: fix Travis-CI issue once server and client are merged into the same repo

### Break down into end to end tests

tests for server : mocha, chai
tests for react rendering and unit tests: enzyme

```
npm test
```

## Deployment

[Heroku](https://www.fullstackreact.com/articles/deploying-a-react-app-with-a-server/) :) it's on a free dyno now, please be patient, it'll take a few minutes to wake up.

## Built With
* Love
* [React](https://github.com/facebook/create-react-app/blob/master/README.md#getting-started) - The front-end library used
* [Redux](https://redux.js.org/) - State Management and [Redux Form](https://redux-form.com/7.3.0/) was fun (not)
* [JWT authentication](https://jwt.io/) - Token Authentication
* [Node](https://nodejs.org/en/) - Server
* [Express](https://expressjs.com/) - web framework , API
* [MongoDB](https://www.mongodb.com/) - Database

## Authors

* **Tina Hoang** - *Initial work* - [Tina The Ace](https://github.com/nnh242)

## License

This project is licensed under the MIT License

## Acknowledgments

* Logo and Banner by Logo Joy

import React, { Component } from "react";
import "./App.css";
import SignIn from "./component/Templates/SignIn/SignIn";
import SignUp from "./component/Templates/SignUp/SignUp";
import Quiz from "./component/Templates/Quiz/Quiz";
import Questions from "./component/Templates/Questions/Questions";
import { Switch, Route } from "react-router-dom";
import PrivateRoute from "./privateroute";
import { connect } from "react-redux";
import GuestRegister from "./component/Templates/GuestRegister/GuestRegister";
import { ConnectedRouter } from "connected-react-router";
import UserQuiz from "./component/Templates/UserQuiz/UserQuiz";
import FeedBack from "./component/Templates/FeedBack/FeedBack";

const appStyle = {
  background: "#ebeeef",
  height: "100vh"
};

class App extends Component {
  render() {
    const { user, history } = this.props;
    return (
      <ConnectedRouter history={history}>
        <div style={appStyle} className="App">
          <Switch>
            <Route path="/login" component={SignIn} />
            <Route path="/signup" component={SignUp} />
            <Route path="/guestregister" component={GuestRegister} />
            <Route path="/userquiz" component={UserQuiz} />
            <Route path="/feedback" component={FeedBack} />
            <PrivateRoute authed={user} exact path="/" Component={Questions} />
            <PrivateRoute
              authed={user}
              path="/questions"
              Component={Questions}
            />
            <PrivateRoute authed={user} path="/quizs" Component={Quiz} />
          </Switch>
        </div>
      </ConnectedRouter>
    );
  }
}

const mapStateToProps = state => ({
  user: state.UserReducer.user
});

export default connect(
  mapStateToProps,
  null
)(App);

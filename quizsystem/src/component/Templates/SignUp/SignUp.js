import React from "react";
import { connect } from "react-redux";
import { loginAction, signinAction } from "../../../actions";
import style from "./SignUp.style";
import withStyle from "../../../withStyle";
import Input from "../../Atoms/Input/Input";
import Validate from "../../../validation";

class SignUp extends React.Component {
  state = {
    password: {
      required: true,
      value: "",
      isTouched: false,
      isDirty: false,
      isValid: false,
      errorMessage: "",
      emptyErrorMessage: "Password is reqiure",
      inValiderrorMessage: "Please enter a valid Password"
    },
    email: {
      required: true,
      value: "",
      isTouched: false,
      isDirty: false,
      isValid: false,
      errorMessage: "",
      emptyErrorMessage: "Email is reqiure",
      inValiderrorMessage: "Please enter a valid Email"
    },
    name: {
      required: true,
      value: "",
      isTouched: false,
      isDirty: false,
      isValid: false,
      errorMessage: "",
      emptyErrorMessage: "Name is reqiure",
      inValiderrorMessage: "Please enter a valid Name"
    },
    username: {
      required: true,
      value: "",
      isTouched: false,
      isDirty: false,
      isValid: false,
      errorMessage: "",
      emptyErrorMessage: "Username is reqiure",
      inValiderrorMessage: "Please enter a valid Username"
    }
  };

  getSignUpData = (value, field, eventType) => {
    this.setState((prevState, state) => ({
      [field]: {
        ...prevState[field],
        value: value,
        isTouched: !prevState.isTouched ? eventType === "blur" : true,
        isDirty: eventType === "change" ? true : prevState[field].isDirty,
        isValid: Validate[field](value)
      }
    }));
  };

  resetform = () => {
    this.setState({
      email: { value: "" },
      password: { value: "" },
      name: { value: "" },
      username: { value: "" }
    });
  };

  render() {
    const { userlogin, usersignin, className } = this.props;
    return (
      <div
        className={`${className} wrapper col-md-3 col-md-offset-5 jumbotron`}
      >
        <img src="https://colorlib.com/etc/lf/Login_v15/images/bg-01.jpg" />
        <div className="form">
          <div className="heading">Register your Account</div>
          <div className="form-group">
            <Input
              type="text"
              value={this.state.name.value}
              onChange={e => this.getSignUpData(e.target.value, "name", e.type)}
              onBlur={e => this.getSignUpData(e.target.value, "name", e.type)}
              placeholder="Name"
              isDirty={this.state.name.isDirty}
              isTouched={this.state.name.isTouched}
              isValid={this.state.name.isValid}
              inValiderrorMessage={this.state.name.inValiderrorMessage}
              emptyErrorMessage={this.state.name.emptyErrorMessage}
            />
          </div>
          <div className="form-group">
            <Input
              type="text"
              value={this.state.username.value}
              onChange={e =>
                this.getSignUpData(e.target.value, "username", e.type)
              }
              onBlur={e =>
                this.getSignUpData(e.target.value, "username", e.type)
              }
              placeholder="User Name"
              isDirty={this.state.username.isDirty}
              isTouched={this.state.username.isTouched}
              isValid={this.state.username.isValid}
              inValiderrorMessage={this.state.username.inValiderrorMessage}
              emptyErrorMessage={this.state.username.emptyErrorMessage}
            />
          </div>
          <div className="form-group">
            <Input
              type="email"
              value={this.state.email.value}
              onChange={e =>
                this.getSignUpData(e.target.value, "email", e.type)
              }
              onBlur={e => this.getSignUpData(e.target.value, "email", e.type)}
              placeholder="Email"
              isDirty={this.state.email.isDirty}
              isTouched={this.state.email.isTouched}
              isValid={this.state.email.isValid}
              inValiderrorMessage={this.state.email.inValiderrorMessage}
              emptyErrorMessage={this.state.email.emptyErrorMessage}
            />
          </div>
          <div className="form-group">
            <Input
              type="password"
              value={this.state.password.value}
              onChange={e =>
                this.getSignUpData(e.target.value, "password", e.type)
              }
              onBlur={e =>
                this.getSignUpData(e.target.value, "password", e.type)
              }
              placeholder="Password"
              isDirty={this.state.password.isDirty}
              isTouched={this.state.password.isTouched}
              isValid={this.state.password.isValid}
              inValiderrorMessage={this.state.password.inValiderrorMessage}
              emptyErrorMessage={this.state.password.emptyErrorMessage}
            />
          </div>
          <div className="form-group">
            <div className="row">
              <div className="col-sm-12 col-sm-offset-3">
                <button
                  className="btn btn-primary"
                  onClick={() =>
                    usersignin(
                      this.state.email.value,
                      this.state.password.value,
                      this.state.name.value,
                      this.state.username.value
                    )
                  }
                >
                  Sign Up
                </button>
                <button
                  className="btn btn-primary cancel"
                  onClick={() => this.resetform()}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({});

const mapDispatchToProps = dispatch => ({
  usersignin: (email, pass, name, username) =>
    dispatch(signinAction(email, pass, name, username))
});

const SignUpComponent = withStyle(SignUp, style);
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SignUpComponent);

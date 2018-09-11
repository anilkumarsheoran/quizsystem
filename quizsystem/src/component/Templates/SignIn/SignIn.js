import React from "react";
import { connect } from "react-redux";
import { loginAction, clearuserloginError } from "../../../actions";
import style from "./SignIn.style";
import withStyle from "../../../withStyle";
import { Redirect, Link } from "react-router-dom";
import Input from "../../Atoms/Input/Input";
import Validate from "../../../validation";

class SignIn extends React.Component {
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
    }
  };

  componentDidMount = () => {
    this.props.clearuserloginError();
  };

  componentWillReceiveProps = nextprops => {
    if (nextprops.user) {
      <Redirect
        to={{
          pathname: "/SignUp"
          // state: { from: props.location }
        }}
      />;
    }
  };

  getLoginData = (value, field, eventType) => {
    this.setState((prevState, state) => ({
      [field]: {
        ...prevState[field],
        value: value,
        isTouched: !prevState.isTouched ? eventType === "blur" : true,
        isDirty: eventType === "change" ? true : prevState[field].isDirty,
        isValid:
          field === "email" ? Validate.email(value) : Validate.password(value)
      }
    }));
  };

  submit = () => {
    const date = new Date();
    const loginTimeStamp = date.getTime();
    this.props.userlogin(
      this.state.email.value,
      this.state.password.value,
      loginTimeStamp
    );
  };

  render() {
    const { userlogin, className, loginError } = this.props;
    return (
      <div
        className={`${className} wrapper col-md-3 col-md-offset-5 jumbotron`}
      >
        <img src="https://colorlib.com/etc/lf/Login_v15/images/bg-01.jpg" />
        <div className="form">
          <div className="heading">Login to your Account</div>
          <div className="form-group">
            <Input
              type="email"
              onChange={e => this.getLoginData(e.target.value, "email", e.type)}
              onBlur={e => this.getLoginData(e.target.value, "email", e.type)}
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
              onChange={e =>
                this.getLoginData(e.target.value, "password", e.type)
              }
              onBlur={e =>
                this.getLoginData(e.target.value, "password", e.type)
              }
              placeholder="Password"
              required
              isDirty={this.state.password.isDirty}
              isTouched={this.state.password.isTouched}
              isValid={this.state.password.isValid}
              inValiderrorMessage={this.state.password.inValiderrorMessage}
              emptyErrorMessage={this.state.password.emptyErrorMessage}
            />
          </div>
          {loginError && <div className="login-error">{loginError}</div>}
          <div className="form-group">
            <div className="row">
              <div className="button-wrapper col-sm-12 col-sm-offset-3">
                <button
                  className="btn btn-primary"
                  onClick={() => this.submit()}
                >
                  Login
                </button>
                <span className="register">
                  <Link to="/signup" className="btn btn-primary">
                    Register
                  </Link>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  user: state.UserReducer.user,
  loginError: state.UserReducer.error
});

const mapDispatchToProps = dispatch => ({
  userlogin: (email, pass) => dispatch(loginAction(email, pass)),
  clearuserloginError: () => dispatch(clearuserloginError())
});
const SignInComponent = withStyle(SignIn, style);
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SignInComponent);

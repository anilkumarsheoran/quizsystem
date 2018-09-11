import React from "react";
import { connect } from "react-redux";
import { registerGuest } from "./GuestRegister.action";
import style from "./GuestRegister.style";
import withStyle from "../../../withStyle";
import Input from "../../Atoms/Input/Input";
import Validate from "../../../validation";

class GuestRegister extends React.Component {
  state = {
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
    contactno: {
      required: true,
      value: "",
      isTouched: false,
      isDirty: false,
      isValid: false,
      errorMessage: "",
      emptyErrorMessage: "Contact No is reqiure",
      inValiderrorMessage: "Please enter a valid Contact No"
    },
    quizid: ""
  };

  componentDidMount = () => {
    const quiz_id = this.props.location.search.split("=")[1];
    this.setState({
      quizid: quiz_id
    });
  };

  getGuestRegisterationData = (value, field, eventType) => {
    this.setState((prevState, state) => ({
      [field]: {
        ...prevState[field],
        value: value,
        isTouched: !prevState.isTouched ? eventType === "blur" : true,
        isDirty: eventType === "change" ? true : prevState[field].isDirty,
        isValid:
          field === "email"
            ? Validate.email(value)
            : field === "name"
              ? Validate.name(value)
              : Validate.contactno(value)
      }
    }));
  };

  render() {
    const { registerGuest, className } = this.props;
    return (
      <div
        className={`${className} wrapper col-md-3 col-md-offset-5 jumbotron`}
      >
        <img
          alt="register"
          src="https://colorlib.com/etc/lf/Login_v15/images/bg-01.jpg"
        />
        <div className="heading">Register for Quiz</div>
        <div className="form">
          <div className="form-group">
            <Input
              type="text"
              onChange={e =>
                this.getGuestRegisterationData(e.target.value, "name", e.type)
              }
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
              type="email"
              onChange={e =>
                this.getGuestRegisterationData(e.target.value, "email", e.type)
              }
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
              type="text"
              onChange={e =>
                this.getGuestRegisterationData(
                  e.target.value,
                  "contactno",
                  e.type
                )
              }
              placeholder="Contact Us"
              isDirty={this.state.contactno.isDirty}
              isTouched={this.state.contactno.isTouched}
              isValid={this.state.contactno.isValid}
              inValiderrorMessage={this.state.contactno.inValiderrorMessage}
              emptyErrorMessage={this.state.contactno.emptyErrorMessage}
            />
          </div>
          <div className="form-group">
            <div className="row">
              <div className="col-sm-12 col-sm-offset-3">
                <button
                  className="btn btn-primary"
                  onClick={() =>
                    registerGuest(
                      this.state.name.value,
                      this.state.email.value,
                      this.state.contactno.value,
                      this.state.quizid
                    )
                  }
                >
                  Start
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
  registerGuest: (name, email, contactno, quizid) =>
    dispatch(registerGuest(name, email, contactno, quizid))
});

const GuestRegisterComponent = withStyle(GuestRegister, style);
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(GuestRegisterComponent);

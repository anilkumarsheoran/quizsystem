import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import withStyle from "../../../withStyle";
import style from "./Header.style";
import { connect } from "react-redux";
import { SignoutAction } from "./Header.action";

const Header = props => {
  const { className, signOut, user, guest } = props;
  return (
    <div className={`row ${className}`}>
      <img alt="logo" src={require("../../../logo.png")} className="logo" />
      {guest ? (
        <div>{guest.name}</div>
      ) : (
        <Fragment>
          <span className="col-md-2">
            <Link to="/questions">Questions</Link>
          </span>
          <span className="col-md-8 quiz">
            <Link to="/quizs">Quizs</Link>
          </span>
          {user && <span onClick={() => signOut()}>Sign Out</span>}
        </Fragment>
      )}
    </div>
  );
};

const mapStateToProps = state => ({
  user: state.UserReducer.user,
  guest: state.UserQuizReducer.quiz
});

const mapDispatchToProps = dispatch => ({
  signOut: () => dispatch(SignoutAction())
});

const HeaderComponent = withStyle(Header, style);
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HeaderComponent);

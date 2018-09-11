import React from "react";
import { connect } from "react-redux";
import { updateFeedback } from "./FeedBack.action";
import Header from "../../Molecules/Header/Header";
import style from "./FeedBack.style";
import withStyle from "../../../withStyle";

class FeedBack extends React.Component {
  state = {
    feedback: ""
  };

  handleFeedback = e => {
    this.setState({
      feedback: e.target.value
    });
  };
  resetFeedback = () => {
    this.setState({
      feedback: ""
    });
    alert("Thanks for your valuable feedback");
  };
  render() {
    const { updateFeedback, location, className } = this.props;
    return (
      <div className={className}>
        <Header />
        <div className="data">
          Thanks a lot for your participation. Your all overall score is{" "}
          {(location.state.correctCount / location.state.totalQuestion) * 100} %
        </div>
        <input
          type="text"
          className="form-control"
          value={this.state.feedback}
          onChange={e => this.handleFeedback(e)}
          placeholder="Any Comments/FeedBack"
        />
        <button
          className="btn btn-primary "
          disabled={this.state.feedback === "" ? true : false}
          onClick={() => {
            this.resetFeedback();
            updateFeedback(
              location.state.userId,
              this.state.feedback,
              location.state.correctCount,
              location.state.totalQuestion
            );
          }}
        >
          Submit
        </button>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  updateFeedback: (userId, feedback, correctCount, totalQuestion) =>
    dispatch(updateFeedback(userId, feedback, correctCount, totalQuestion))
});

const FeedBackComponent = withStyle(FeedBack, style);

export default connect(
  null,
  mapDispatchToProps
)(FeedBackComponent);

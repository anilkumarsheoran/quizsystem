import React from "react";
import { connect } from "react-redux";
import { getQuiz, getUser } from "./UserQuiz.action";
import UserQuestion from "../../Organisms/UserQuestion/UserQuestion";
import Header from "../../Molecules/Header/Header";

const nextBtn = {
  float: "left",
  marginLeft: "270px",
  marginTop: "-38px",
  width: "150px"
};

class UserQuiz extends React.Component {
  state = {
    questionNo: 0,
    timeStamp: 0,
    correctCount: 0,
    totalQuestion: 0
  };

  componentDidMount = () => {
    const userid = this.props.location.search.split("=")[1];
    this.props.getUser(userid);
  };

  updateQuestionNo = operation => {
    if (operation === "increment") {
      this.setState({
        questionNo: this.state.questionNo + 1
      });
    } else {
      this.setState({
        questionNo: this.state.questionNo - 1
      });
    }
  };

  calculateScore = (quiz, user) => {
    this.setState({
      totalQuestion: quiz.questions.length
    });
    user.questions.map(item => {
      item.answer &&
        this.setState(
          {
            correctCount: ++this.state.correctCount
          },
          () => {
            this.props.history.push({
              pathname: "/feedback",

              state: {
                totalQuestion: quiz.questions.length,
                correctCount: this.state.correctCount,
                userId: this.props.user._id
              }
            });
          }
        );
    });
  };

  render() {
    const { quiz } = this.props;
    return (
      <div>
        <Header />
        {quiz && (
          <UserQuestion
            calculateScore={this.calculateScore}
            updateQuestionNo={this.updateQuestionNo}
            questionNo={this.state.questionNo + 1}
            question={quiz.questions[this.state.questionNo]}
          />
        )}
        {quiz &&
          quiz.questions &&
          `${quiz.questions.length - 1}` > this.state.questionNo && (
            <button
              className="btn btn-primary"
              style={nextBtn}
              onClick={() => this.updateQuestionNo("increment")}
            >
              Next
            </button>
          )}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  quiz: state.UserQuizReducer.quiz,
  user: state.UserQuizReducer.user
});

const mapDispatchToProps = dispatch => ({
  getQuiz: quizid => dispatch(getQuiz(quizid)),
  getUser: userid => dispatch(getUser(userid))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UserQuiz);

import React from "react";
import Radio from "../../Atoms/RadioButton";
import { connect } from "react-redux";
import { addAnswer } from "./UserQuestion.action";
import style from "./UserQuestion.style";
import withStyle from "../../../withStyle";

class UserQuestion extends React.Component {
  state = {
    timeStamp: 0,
    selectedOption: ""
  };

  componentDidMount = () => {
    this.setState({ timeStamp: this.props.question.timelimit });
    setTimeout(() => this.counterClock(), 1000);
  };

  componentWillReceiveProps = nextProps => {
    if (
      nextProps.question &&
      nextProps.question._id !== this.props.question._id
    ) {
      this.setState({ timeStamp: nextProps.question.timelimit });
      setTimeout(() => this.counterClock(), 1000);
    }
    if (nextProps.questionNo !== this.props.questionNo) {
      this.setState({
        selectedOption: ""
      });
    }
  };

  handleChange = e => {
    this.setState({
      selectedOption: e.target.value
    });
  };

  handleSubmit = () => {
    const ques = (this.props.user && this.props.user.questions) || [];
    ques.push({
      questionId: this.props.question._id,
      useranswer: this.state.selectedOption
    });
    this.props.addAnswer(this.props.user._id, {
      questionId: this.props.question._id,
      useranswer: this.state.selectedOption
    });
    this.props.updateQuestionNo("increment");
    if (this.props.quiz.questions.length === this.props.questionNo) {
      this.props.calculateScore(this.props.quiz, this.props.user);
    }
  };

  counterClock = () => {
    this.state.timeStamp && this.interval;
    this.interval = setInterval(() => {
      if (this.state.timeStamp < 1) {
        clearInterval(this.interval);
        // this.setState({
        //     questionNo:this.state.questionNo + 1
        // })
        this.props.updateQuestionNo("increment");
      } else {
        this.setState({
          timeStamp: this.state.timeStamp - 1
        });
      }
    }, 1000);
  };

  render() {
    const { question, questionNo, calculateScore, className } = this.props;
    return (
      <div className={`${className}`}>
        <div className="timeStamp">
          <img src={require("../../../clock.jpg")} />
          <br />
          {this.state.timeStamp} Sec
        </div>
        <div className="question">
          Question
          {questionNo}: {question && question.question}
        </div>
        {question &&
          question.options &&
          question.options.map((item, index) => (
            <div key={index} className="options">
              <Radio
                name="options"
                checked={this.state.selectedOption === item.value}
                value={item.value}
                onChange={e => this.handleChange(e)}
              />
              <label>{item.value}</label>
            </div>
          ))}
        <button
          className="btn btn-primary submitBtn"
          onClick={() => this.handleSubmit()}
        >
          Submit
        </button>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  quiz: state.UserQuizReducer.quiz,
  user: state.UserQuizReducer.user
});

const mapDispatchToProps = dispatch => ({
  addAnswer: (userid, ques) => dispatch(addAnswer(userid, ques))
  //getUser: (userid)=>dispatch(getUser(userid)),
});

const UserQuestionComponent = withStyle(UserQuestion, style);
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UserQuestionComponent);

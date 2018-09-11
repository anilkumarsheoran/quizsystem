import React from "react";
import { connect } from "react-redux";
import {
  getQuestions,
  addQuestion,
  deleteQuestion,
  updateQuestion
} from "./Questions.action";
import Modal from "react-modal";
import Header from "../../Molecules/Header/Header";
import withStyle from "../../../withStyle";
import style from "./Question.style";

const buttonStyle = {
  marginRight: "20px"
};

const headerStyle = {
  fontSize: "18px",
  marginBottom: "20px",
  fontWeight: "700"
};

const errorStyle = {
  color: "red",
  marginBottom: "10px"
};

const checkboxStyle = {
  margin: "15px 15px 0 0"
};

Modal.setAppElement("#root");

class Questions extends React.Component {
  state = {
    QuestionArr: [],
    modalIsOpen: false,
    question: "",
    answer: [],
    timelimit: "10",
    option1: "",
    option2: "",
    option3: "",
    option4: "",
    id: "",
    search: "",
    error: ""
  };

  componentDidMount = () => {
    this.setState({
      QuestionArr: this.props.Questions
    });
    this.props.getQuestions();
  };

  componentWillReceiveProps = nextProps => {
    this.setState({
      QuestionArr: nextProps.Questions
    });
  };

  openModal() {
    this.setState({ modalIsOpen: true });
  }

  afterOpenModal() {
    // references are now sync'd and can be accessed.
    //  this.subtitle.style.color = '#f00';
  }

  closeModal() {
    this.setState({ modalIsOpen: false });
  }

  getQuestionData = (value, field) => {
    this.setState({
      [field]: value
    });
  };

  fillQuestion = item => {
    this.getQuestionData(item.question, "question");
    this.getQuestionData(item._id, "id");
    this.getQuestionData(item.timelimit, "timelimit");
    this.getQuestionData(item.options[0].value, "option1");
    this.getQuestionData(item.options[1].value, "option2");
    this.getQuestionData(item.options[2].value, "option3");
    this.getQuestionData(item.options[3].value, "option4");
    this.getQuestionData(item.answer, "answer");
  };

  emptyQuestion = () => {
    this.getQuestionData("", "question");
    this.getQuestionData("", "id");
    this.getQuestionData("", "timelimit");
    this.getQuestionData("", "option1");
    this.getQuestionData("", "option2");
    this.getQuestionData("", "option3");
    this.getQuestionData("", "option4");
    this.getQuestionData("", "answer");
    this.getQuestionData("", "error");
  };

  questionAction = () => {
    if (this.state.question === "") {
      this.setState({
        error: "Please enter a question"
      });
    } else if (this.state.timelimit === "") {
      this.setState({
        error: "Please select time Stamp"
      });
    } else if (
      this.state.option1 === "" ||
      this.state.option2 === "" ||
      this.state.option3 === "" ||
      this.state.option4 === ""
    ) {
      this.setState({
        error: "Please provide all the options"
      });
    } else if (this.state.answer === "") {
      this.setState({
        error: "Please select one correct answer"
      });
    } else {
      this.state.id
        ? this.props.updateQuestion(
            this.state.id,
            this.state.question,
            this.state.timelimit,
            this.state.option1,
            this.state.option2,
            this.state.option3,
            this.state.option4,
            this.state.answer
          )
        : this.props.addQuestion(
            this.state.question,
            this.state.timelimit,
            this.state.option1,
            this.state.option2,
            this.state.option3,
            this.state.option4,
            this.state.answer
          );
      this.emptyQuestion();
      this.closeModal();
    }
  };

  getAnswer = value => {
    this.setState({
      answer: [...this.state.answer, value]
    });
  };

  searchQuestion = event => {
    var newQuestion = this.props.Questions.filter(ques =>
      ques.question.toLowerCase().includes(event.target.value.toLowerCase())
    );
    this.setState({
      QuestionArr: newQuestion,
      search: event.target.value
    });
  };

  render() {
    const { className, deleteQuestion } = this.props;
    const { QuestionArr, error } = this.state;
    return (
      <div className={className}>
        <Header />
        <input
          placeholder="Search Question"
          type="text"
          onChange={e => this.searchQuestion(e)}
          className="search"
        />
        <br />
        <button
          onClick={() => {
            this.openModal();
            this.emptyQuestion();
          }}
          className="add-question btn-primary"
        >
          Add Question
        </button>
        <div className="jumbotron">
          <table className="table table-striped">
            <thead>
              <tr>
                <th>Question</th>
                <th>Edit</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody>
              {QuestionArr &&
                QuestionArr.map((item, index) => (
                  <tr key={index}>
                    <td>{item.question}</td>
                    <td>
                      <button
                        onClick={() => {
                          this.openModal();
                          this.fillQuestion(item);
                        }}
                      >
                        Edit
                      </button>
                    </td>
                    <td>
                      <button onClick={() => deleteQuestion(item._id)}>
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
        <Modal isOpen={this.state.modalIsOpen}>
          <button className="close" onClick={() => this.closeModal()}>
            close
          </button>
          <div style={headerStyle}>Add New Question</div>
          {error && (
            <div style={errorStyle} className="error">
              {error}
            </div>
          )}
          <div className="questionform">
            <div className="form-group row col-md-5">
              <input
                type="text"
                value={this.state.question}
                onChange={e => this.getQuestionData(e.target.value, "question")}
                placeholder="Enter Question"
                className="form-control"
              />
            </div>
            <div className="form-group row col-md-5">
              <div>Time Stamp(in Sec.)</div>
              <select
                onChange={e =>
                  this.getQuestionData(e.target.value, "timelimit")
                }
                className="form-control"
              >
                <option>----Select time stamp-----</option>
                <option value="10" selected={this.state.timelimit === "10"}>
                  10
                </option>
                <option value="20" selected={this.state.timelimit === "20"}>
                  20
                </option>
                <option value="30" selected={this.state.timelimit === "30"}>
                  30
                </option>
                <option value="60" selected={this.state.timelimit === "60"}>
                  60
                </option>
                <option value="90" selected={this.state.timelimit === "90"}>
                  90
                </option>
              </select>
            </div>
            <div>Answers</div>
            <div className="form-group row  col-md">
              <input
                type="radio"
                name="optionsRadio"
                style={checkboxStyle}
                onClick={() => this.getAnswer(this.state.option1)}
                defaultChecked={
                  this.state.answer[0] &&
                  this.state.option1 === this.state.answer[0]
                }
              />
              <input
                type="text"
                value={this.state.option1}
                onChange={e => this.getQuestionData(e.target.value, "option1")}
                placeholder="Answer 1"
                className="form-control col-md-3"
              />
            </div>

            <div className="form-group row col-md">
              <input
                type="radio"
                name="optionsRadio"
                style={checkboxStyle}
                onClick={() => this.getAnswer(this.state.option2)}
                defaultChecked={
                  this.state.answer[0] &&
                  this.state.option2 === this.state.answer[0]
                }
              />
              <input
                type="text"
                value={this.state.option2}
                onChange={e => this.getQuestionData(e.target.value, "option2")}
                placeholder="Answer 2"
                className="form-control col-md-3"
              />
            </div>

            <div className="form-group row col-md">
              <input
                type="radio"
                name="optionsRadio"
                style={checkboxStyle}
                onClick={() => this.getAnswer(this.state.option3)}
                defaultChecked={
                  this.state.answer[0] &&
                  this.state.option3 === this.state.answer[0]
                }
              />
              <input
                type="text"
                value={this.state.option3}
                onChange={e => this.getQuestionData(e.target.value, "option3")}
                placeholder="Answer 3"
                className="form-control col-md-3"
              />
            </div>
            <div className="form-group row col-md">
              <input
                type="radio"
                name="optionsRadio"
                style={checkboxStyle}
                onClick={() => this.getAnswer(this.state.option4)}
                defaultChecked={
                  this.state.answer[0] &&
                  this.state.option4 === this.state.answer[0]
                }
              />
              <input
                type="text"
                value={this.state.option4}
                onChange={e => this.getQuestionData(e.target.value, "option4")}
                placeholder="Answer 4"
                className="form-control col-md-3"
              />
            </div>
            <div className="form-group row col-md">
              <button
                type="button"
                style={buttonStyle}
                className="btn btn-primary col-md-1"
                onClick={() => {
                  this.questionAction();
                }}
              >
                Submit
              </button>
              <div className="" />
              <button
                type="button"
                style={buttonStyle}
                className="btn btn-primary col-md-1"
                onClick={() => {
                  this.emptyQuestion();
                  this.closeModal();
                }}
              >
                Cancel
              </button>
            </div>
          </div>
        </Modal>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  Questions: state.QuestionReducer.questions
});

const mapDispatchToProps = dispatch => ({
  getQuestions: () => dispatch(getQuestions()),
  deleteQuestion: id => dispatch(deleteQuestion(id)),
  addQuestion: (question, timelimit, opt1, opt2, opt3, opt4, answer) =>
    dispatch(addQuestion(question, timelimit, opt1, opt2, opt3, opt4, answer)),
  updateQuestion: (id, question, timelimit, opt1, opt2, opt3, opt4, answer) =>
    dispatch(
      updateQuestion(id, question, timelimit, opt1, opt2, opt3, opt4, answer)
    )
});

const QuestionComponent = withStyle(Questions, style);
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(QuestionComponent);

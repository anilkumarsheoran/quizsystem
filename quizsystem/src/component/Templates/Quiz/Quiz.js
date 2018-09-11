import React from "react";
import { getQuizs, addQuiz, updateQuiz, deleteQuiz } from "./Quiz.action";
import { connect } from "react-redux";
import Modal from "react-modal";
import { getQuestions, questionSelection } from "../Questions/Questions.action";
import Checkbox from "../../Atoms/Checkbox";
import Header from "../../Molecules/Header/Header";
import withStyle from "../../../withStyle";
import style from "./Quiz.style";

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

class Quiz extends React.Component {
  state = {
    modalIsOpen: false,
    name: "",
    purpose: "",
    questions: [],
    id: "",
    search: "",
    QuizArr: "",
    checkedItems: new Map(),
    error: ""
  };
  componentDidMount = () => {
    this.props.getQuizs();
    this.props.getQuestions();
  };

  componentWillReceiveProps = nextProps => {
    this.setState({
      QuizArr: nextProps.quizs
    });
  };

  openModal() {
    this.setState({ modalIsOpen: true });
  }

  closeModal() {
    this.setState({ modalIsOpen: false });
  }

  getQuizData = (value, field) => {
    this.setState({
      [field]: value
    });
  };

  quizAction = () => {
    if (this.state.name === "") {
      this.setState({
        error: "Please enter a quiz name"
      });
    } else if (this.state.purpose === "") {
      this.setState({
        error: "Please enter the quiz purpose"
      });
    } else if (this.state.questions === "") {
      this.setState({
        error: "Please select at least one question"
      });
    } else {
      this.state.id
        ? this.props.updateQuiz(
            this.state.name,
            this.state.purpose,
            this.state.questions,
            this.state.id
          )
        : this.props.addQuiz(
            this.state.name,
            this.state.purpose,
            this.state.questions
          );
      this.closeModal();
    }
  };

  toggle(event, id) {
    this.props.question.map(item => {
      if (item.id == id) {
      }
    });
  }

  searchQuiz = event => {
    var newQuiz = this.props.quizs.filter(ques =>
      ques.name.toLowerCase().includes(event.target.value.toLowerCase())
    );
    this.setState({
      QuizArr: newQuiz,
      search: event.target.value
    });
  };

  handleChange(e, id) {
    this.setState({
      questions: [...this.state.questions, id]
    });
  }

  fillQuiz = item => {
    this.getQuizData(item.name, "name");
    this.getQuizData(item.purpose, "purpose");
    this.getQuizData(item._id, "id");
  };

  emptyQuiz = () => {
    this.getQuizData("", "name");
    this.getQuizData("", "purpose");
    this.getQuizData("", "id");
    this.getQuizData("", "error");
  };

  render() {
    const { className, questions, questionSelection, deleteQuiz } = this.props;
    const { QuizArr, error } = this.state;
    return (
      <div className={className}>
        <Header />
        <input
          type="text"
          placeholder="Search Quiz"
          onChange={e => this.searchQuiz(e)}
          className="search"
        />
        <br />
        <button
          className="add-quiz btn-primary"
          onClick={() => {
            this.openModal();
          }}
        >
          Add Quiz
        </button>
        <div className="jumbotron">
          <table className="table table-striped">
            <thead>
              <tr>
                <th>Quiz</th>
                <th>Purpose</th>
                <th>Edit</th>
                <th>Delete</th>
                <th>Link</th>
              </tr>
            </thead>
            <tbody>
              {QuizArr &&
                QuizArr.map((item, index) => (
                  <tr key={index}>
                    <td>{item.name}</td>
                    <td>{item.purpose}</td>
                    <td>
                      <button
                        onClick={() => {
                          this.openModal();
                          this.fillQuiz(item);
                        }}
                      >
                        Edit
                      </button>
                    </td>
                    <td>
                      <button onClick={() => deleteQuiz(item._id)}>
                        Delete
                      </button>
                    </td>
                    <td>
                      <a
                        target="blank"
                        href={`http://localhost:3000/guestregister/?quizid=${
                          item._id
                        }`}
                      >
                        Link
                      </a>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
        <Modal isOpen={this.state.modalIsOpen} contentLabel="Example Modal">
          <button className="close" onClick={() => this.closeModal()}>
            close
          </button>
          <div style={headerStyle}>Create Quiz</div>
          {error && (
            <div style={errorStyle} className="error">
              {error}
            </div>
          )}
          <div className="form-group row col-md-5">
            <input
              type="text"
              value={this.state.name}
              onChange={e => this.getQuizData(e.target.value, "name")}
              placeholder="Quiz Name"
              className="form-control"
            />
          </div>
          <div className="form-group row col-md-5">
            <input
              type="text"
              value={this.state.purpose}
              onChange={e => this.getQuizData(e.target.value, "purpose")}
              placeholder="Quiz Description/Purpose"
              className="form-control"
            />
          </div>
          {questions &&
            questions.map((item, index) => (
              <div key={index}>
                <Checkbox
                  name={item.question}
                  checked={item.selected}
                  onClick={() => questionSelection(item._id)}
                  onChange={e => this.handleChange(e, item._id)}
                  style={checkboxStyle}
                />
                <label>{item.question}</label>
              </div>
            ))}
          <br />
          <button
            style={buttonStyle}
            className="btn btn-primary col-md-1"
            onClick={() => {
              this.quizAction();
            }}
          >
            Submit
          </button>
          <button
            style={buttonStyle}
            className="btn btn-primary col-md-1"
            onClick={() => {
              this.emptyQuiz();
              this.closeModal();
            }}
          >
            Cancel
          </button>
        </Modal>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  quizs: state.QuizReducer.quizs,
  questions: state.QuestionReducer.questions
});

const mapDispatchToProps = dispatch => ({
  getQuizs: () => dispatch(getQuizs()),
  getQuestions: () => dispatch(getQuestions()),
  deleteQuiz: id => dispatch(deleteQuiz(id)),
  addQuiz: (name, purpose, questions) =>
    dispatch(addQuiz(name, purpose, questions)),
  updateQuiz: (name, purpose, questions, id) =>
    dispatch(updateQuiz(name, purpose, questions, id)),
  questionSelection: id => dispatch(questionSelection(id))
});

const QuizComponent = withStyle(Quiz, style);
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(QuizComponent);

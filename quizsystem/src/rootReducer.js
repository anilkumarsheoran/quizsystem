import { combineReducers } from "redux";
import { QuizReducer } from "./component/Templates/Quiz/Quiz.reducer";
import { UserQuizReducer } from "./component/Templates/UserQuiz/UserQuiz.reducer";
import { UserReducer } from "./component/Templates/SignIn/Signin.reducer";

const getQuestionReducer = (state, action) => {
  return { ...state, questions: action };
};

const selectQuestion = (state, action) => {
  return {
    ...state,
    questions: state.questions.map(
      item =>
        item._id === action.id ? { ...item, selected: !item.selected } : item
    )
  };
};

const QuestionReducer = (state = {}, action) => {
  switch (action.type) {
    case "GET_QUESTIONS_SUCCESS":
      return getQuestionReducer(state, action.data);
    case "QUESTION_SELECTION":
      return selectQuestion(state, action);
    default:
      return state;
  }
};

const rootReducer = combineReducers({
  QuizReducer,
  UserReducer,
  QuestionReducer,
  UserQuizReducer
});

export default rootReducer;

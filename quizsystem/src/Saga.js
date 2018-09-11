import { call, put, takeLatest, takeEvery } from "redux-saga/effects";
import axios from "axios";
import {
  getQuestionsSuccess,
  getQuestions
} from "./component/Templates/Questions/Questions.action";
import { userloginSuccess, signupSuccess, userloginError } from "./actions";
import {
  getQuizsSuccess,
  getQuizs
} from "./component/Templates/Quiz/Quiz.action";
import { push } from "connected-react-router";
import {
  getQuizSuccess,
  getQuiz,
  getUserSuccess
} from "./component/Templates/UserQuiz/UserQuiz.action";

export function getCall(url) {
  return axios.get(url);
}

export function putCall(url, param) {
  return axios.put(url, param);
}

export function postCall(url, param) {
  return axios.post(url, param);
}

export function deleteCall(url) {
  return axios.delete(url);
}

function* userlogin(action) {
  try {
    const data = yield call(postCall, "http://localhost:3002/users/login", {
      email: action.email,
      password: action.password,
      logintimeStamp: action.timeStamp
    });
    yield put(userloginSuccess(data));
    yield put(push("/questions"));
  } catch (err) {
    yield put(userloginError());
  }
}

function* signup(action) {
  const data = yield call(postCall, "http://localhost:3002/users/signup", {
    email: action.email,
    password: action.pass,
    name: action.name,
    username: action.username
  });
  yield put(signupSuccess(data));
  yield put(push(`/questions`));
}

function* getQuestion() {
  const data = yield call(getCall, "http://localhost:3002/questions");
  yield put(getQuestionsSuccess(data.data));
}

function* addQuestion(action) {
  const data = yield call(postCall, "http://localhost:3002/questions/add", {
    question: action.question,
    answer: action.answer,
    timelimit: action.timelimit,
    options: action.options,
    answer: action.answer
  });
  yield put(getQuestions());
}

function* deleteQuestion(action) {
  const data = yield call(
    deleteCall,
    `http://localhost:3002/questions/delete/${action.id}`
  );
  yield put(getQuestions());
}

function* updateQuestion(action) {
  const data = yield call(
    putCall,
    `http://localhost:3002/questions/${action.id}`,
    {
      question: action.question,
      answer: action.answer,
      timelimit: action.timelimit,
      options: action.options,
      answer: action.answer
    }
  );
  yield put(getQuestions());
}

function* updateQuizsaga(action) {
  var data = yield call(putCall, `http://localhost:3002/Quiz/${action.id}`, {
    name: action.name,
    purpose: action.purpose,
    questions: action.questions
  });
  yield put(getQuizs());
}

function* getQuizsSaga() {
  var data = yield call(getCall, "http://localhost:3002/Quiz");
  yield put(getQuizsSuccess(data.data));
}

function* deleteQuizSaga(action) {
  const data = yield call(
    deleteCall,
    `http://localhost:3002/Quiz/delete/${action.id}`
  );
  yield put(getQuizs());
}

function* addQuizs(action) {
  var data = yield call(postCall, "http://localhost:3002/Quiz/add", {
    name: action.name,
    purpose: action.purpose,
    questions: action.questions
  });
  yield put(getQuizs());
}

function* addGuest(action) {
  const data = yield call(postCall, "http://localhost:3002/Guest", {
    name: action.name,
    email: action.email,
    contactno: action.contactno,
    quiz: action.quizid
  });
  debugger;
  yield put(push(`/userquiz/?user=${data.data._id}`));
}

function* getQuizReducer(action) {
  var data = yield call(getCall, `http://localhost:3002/Quiz/${action.quizid}`);
  yield put(getQuizSuccess(data.data));
}

function* getUser(action) {
  var data = yield call(
    getCall,
    `http://localhost:3002/Guest/${action.userid}`
  );
  yield put(getUserSuccess(data));
  //debugger;
  yield put(getQuiz(data.data.quiz));
}

function* addAnswersaga(action) {
  const data = yield call(
    putCall,
    `http://localhost:3002/Guest/update/${action.userid}`,
    {
      questions: action.ques
    }
  );
  yield put(getUserSuccess(data));
}

function* updatefeedback(action) {
  const data = yield call(
    putCall,
    `http://localhost:3002/Guest/feedback/${action.userId}`,
    {
      feedback: action.feedback,
      correctCount: action.correctCount,
      totalQuestion: action.totalQuestion
    }
  );
}

export default function* rootSaga() {
  yield takeLatest("SIGN_UP", signup);
  yield takeLatest("USER_LOGIN", userlogin);
  yield takeLatest("GET_QUESTIONS", getQuestion);
  yield takeLatest("ADD_QUESTION", addQuestion);
  yield takeLatest("DELETE_QUESTION", deleteQuestion);
  yield takeLatest("UPDATE_QUESTION", updateQuestion);
  yield takeLatest("UPDATE_QUIZ", updateQuizsaga);
  yield takeEvery("GET_QUIZS", getQuizsSaga);
  yield takeEvery("ADD_QUIZ", addQuizs);
  yield takeEvery("REGISTER_GUEST", addGuest);
  yield takeEvery("GET_QUIZ", getQuizReducer);
  yield takeEvery("GET_USER", getUser);
  yield takeEvery("ADD_ANSWER", addAnswersaga);
  yield takeEvery("UPDATE_FEEDBACK", updatefeedback);
  yield takeEvery("DELETE_QUIZ", deleteQuizSaga);
}

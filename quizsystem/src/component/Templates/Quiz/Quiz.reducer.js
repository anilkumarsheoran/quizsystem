const getQuizsReducer = (state, action) => {
  return { ...state, quizs: action.data };
};

export const QuizReducer = (state = [], action) => {
  switch (action.type) {
    case "GET_QUIZS_SUCCESS":
      return getQuizsReducer(state, action);
    default:
      return state;
  }
};

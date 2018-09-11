const getQuizReducer = (state, action) => {
  return { ...state, quiz: action.data };
};

const getUserReducer = (state, action) => {
  return { ...state, user: action.data.data };
};

export const UserQuizReducer = (state = {}, action) => {
  switch (action.type) {
    case "GET_QUIZ_SUCCESS":
      return getQuizReducer(state, action);
    case "GET_USER_SUCCESS":
      return getUserReducer(state, action);
    default:
      return state;
  }
};

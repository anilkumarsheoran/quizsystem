const loginSuccessReducer = (state, action) => {
  return { ...state, user: action.user.data };
};

const signupSuccess = (state, action) => {
  return { ...state, user: action.data };
};

const signoutreducer = (state, action) => {
  return { ...state, user: "" };
};

const signInErrorReducer = (state, action) => {
  return { ...state, error: "Please enter valid email & password " };
};

const clearsignInErrorReducer = (state, action) => {
  return { ...state, error: "" };
};

export const UserReducer = (state = {}, action) => {
  switch (action.type) {
    case "USER_LOGIN_SUCCESS":
      return loginSuccessReducer(state, action);
    case "SIGN_UP_SUCCESS":
      return signupSuccess(state, action);
    case "SIGN_OUT":
      return signoutreducer(state, action);
    case "LOGIN_ERROR":
      return signInErrorReducer(state, action);
    case "CLEAR_LOGIN_ERROR":
      return clearsignInErrorReducer(state, action);
    default:
      return state;
  }
};

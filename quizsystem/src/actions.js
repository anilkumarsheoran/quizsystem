export const loginAction = (email, password, timeStamp) => ({
  type: "USER_LOGIN",
  email,
  password,
  timeStamp
});

export const userloginSuccess = user => ({
  type: "USER_LOGIN_SUCCESS",
  user
});

export const signinAction = (email, pass, name, username) => ({
  type: "SIGN_UP",
  email,
  pass,
  name,
  username
});

export const signupSuccess = data => ({
  type: "SIGN_UP_SUCCESS",
  data
});

export const userloginError = () => ({
  type: "LOGIN_ERROR"
});

export const clearuserloginError = () => ({
  type: "CLEAR_LOGIN_ERROR"
});

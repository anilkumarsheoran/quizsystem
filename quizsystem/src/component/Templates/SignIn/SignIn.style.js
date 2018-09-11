import { css } from "styled-components";

const style = css`
  margin: 0 auto;

  .register {
    margin-left: 20px;
  }

  .heading {
    font-size: 18px;
    margin-bottom: 20px;
  }

  button {
    min-width: 100px;
  }

  .button-wrapper {
    margin-top: 20px;
  }

  .btn {
    border-radius: 25px;
    padding: 10px 30px;
    width: 120px;
  }

  &.wrapper {
    position: relative;
    top: 100px;
    background: white;
    padding: 0;
    width: 670px;
    max-width: 670px;
  }

  .form {
    padding: 50px 150px;
  }

  .login-error {
    color: red;
  }
`;

export default style;

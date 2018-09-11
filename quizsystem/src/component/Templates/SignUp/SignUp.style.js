import { css } from "styled-components";

const style = css`
  margin: 0 auto;

  .cancel {
    margin-left: 20px;
  }

  .heading {
    font-size: 18px;
    margin-bottom: 20px;
  }

  &.wrapper {
    position: relative;
    top: 100px;
    background: white;
    width: 670px;
    max-width: 670px;
    padding: 0;
  }

  .btn {
    border-radius: 25px;
    padding: 10px 30px;
    width: 120px;
  }

  .form {
    padding: 40px 150px;
  }
`;

export default style;

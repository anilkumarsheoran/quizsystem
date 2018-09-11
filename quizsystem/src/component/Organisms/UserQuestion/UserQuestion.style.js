import { css } from "styled-components";

export default css`
  float: left;
  width: 100%;

  .options {
    text-align: left;
    margin-left: 160px;

    label {
      margin-left: 10px;
    }
  }

  .timeStamp {
    float: right;
    margin-right: 200px;

    img {
      width: 70px;
    }
  }

  .question {
    text-align: left;
    margin: 0 0 20px 80px;
  }

  .submitBtn {
    float: left;
    margin: 30px 0 0 90px;
    width: 150px;
  }
`;

import styled from "styled-components";

const LoadingCircle = styled.span`
  margin-top: 100px;
  width: 30px;
  height: 30px;
  border: 2px solid #000;
  border-top-color: rgba(0, 0, 0, 0.2);
  border-right-color: rgba(0, 0, 0, 0.2);
  border-bottom-color: rgba(0, 0, 0, 0.2);
  border-radius: 100%;
  animation: circle infinite 0.75s linear;
`;

export default LoadingCircle;
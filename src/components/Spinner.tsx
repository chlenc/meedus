import { keyframes } from "@emotion/react";
import styled from "@emotion/styled";

const spin = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;
const Spinner = styled.div<{ size?: number }>`
  border: 4px solid #fff;
  border-radius: 50%;
  border-top: 4px solid #a5ffc9;
  width: ${({ size }) => size ?? 36}px;
  height: ${({ size }) => size ?? 36}px;
  -webkit-animation: ${spin} 1s linear infinite; /* Safari */
  animation: ${spin} 1s linear infinite;
`;

export default Spinner;

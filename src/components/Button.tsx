import styled from "@emotion/styled";

type TButtonType = "primary" | "secondary";
type TButtonSize = "medium" | "large";
type TButtonRound = "default" | "round";

const Button = styled.button<{
  kind?: TButtonType;
  size?: TButtonSize;
  round?: TButtonRound;
  fixed?: boolean;
}>`
  white-space: nowrap;
  display: flex;
  justify-content: center;
  align-items: center;
  box-sizing: border-box;
  background: ${({ kind }) => (kind === "secondary" ? "#fffff" : "#a5ffc9")};
  font-size: 14px;
  line-height: 20px;
  color: #000000;
  outline: none;
  transition: 0.4s;
  width: ${({ fixed }) => (fixed ? "100%" : "fit-content")};

  height: ${({ size }) => (size === "medium" ? 32 : 40)}px;

  border: 2px solid #000000;
  box-shadow: 4px 4px 0px #000000;
  border-radius: 4px;
  font-weight: 700;
  padding: 10px 16px;
  cursor: pointer;

  :hover {
    background: ${({ kind }) => (kind === "secondary" ? "#535362" : "#767EFF")};
    cursor: pointer;
  }

  :disabled {
    cursor: not-allowed;
    //opacity: 0.4;
    color: #aaaaaa;
    background: #eeeeee;
    border: 2px solid #aaaaaa;
    box-shadow: 4px 4px 0px #aaaaaa;
  }
`;

export default Button;

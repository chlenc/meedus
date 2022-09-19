import styled from "@emotion/styled";

type TButtonType = "primary" | "secondary";
type TButtonSize = "medium" | "large";
type TButtonRound = "default" | "round";

const Button = styled.button<{
  kind?: TButtonType;
  size?: TButtonSize;
  round?: TButtonRound;
  fitContent?: boolean;
}>`
  white-space: nowrap;
  display: flex;
  justify-content: center;
  align-items: center;
  box-sizing: border-box;
  outline: none;
  cursor: pointer;
  padding: ${({ size }) => (size === "medium" ? "0 16px" : "0 24px")};
  background: ${({ kind }) => (kind === "secondary" ? "#fffff" : "#a5ffc9")};
  font-size: ${({ size }) => (size === "medium" ? 13 : 17)}px;
  line-height: ${({ size }) => (size === "medium" ? 20 : 24)}px;
  font-weight: 700;
  color: #000000;
  transition: 0.4s;
  width: ${({ fitContent }) => (fitContent ? "fit-content" : "100%")};
  height: ${({ size }) => (size === "medium" ? 40 : 56)}px;
  border: 2px solid #000000;
  box-shadow: 4px 4px 0 #000000;
  border-radius: 4px;

  :hover {
    box-shadow: 2px 2px 0 #000000;
    background: ${({ kind }) => (kind === "secondary" ? "#EEEEEE" : "#71E0B8")};
    cursor: pointer;
  }

  :disabled {
    cursor: not-allowed;
    color: #aaaaaa;
    background: ${({ kind }) => (kind === "secondary" ? "#fff" : "#eeeeee")};
    border: 2px solid #aaaaaa;
    box-shadow: 4px 4px 0 #aaaaaa;
  }
`;

export default Button;

import styled from "@emotion/styled";

type TTextBtnType = "primary" | "secondary";
type TTextBtnSize = "medium" | "large";
type TTextBtnRound = "default" | "round";

const TextBtn = styled.button<{
  kind?: TTextBtnType;
  size?: TTextBtnSize;
  round?: TTextBtnRound;
  fitContent?: boolean;
}>`
  background: none;
  border: none;
  white-space: nowrap;
  display: flex;
  justify-content: center;
  align-items: center;
  outline: none;
  cursor: pointer;
  font-size: ${({ size }) => (size === "medium" ? 13 : 17)}px;
  line-height: ${({ size }) => (size === "medium" ? 20 : 24)}px;
  font-weight: 700;
  color: #000000;
  transition: 0.4s;
  width: ${({ fitContent }) => (fitContent ? "fit-content" : "100%")};

  :hover {
    cursor: pointer;
  }

  :disabled {
    cursor: not-allowed;
    color: #aaaaaa;
  }
`;

export default TextBtn;

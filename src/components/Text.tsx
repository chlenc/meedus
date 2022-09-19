import styled from "@emotion/styled";

type TTextType =
  | "primary"
  | "secondary"
  | "light"
  | "purple"
  | "error"
  | "success";
type TTextSize = "small" | "medium" | "large" | "big" | "title";
type TTextAlign = "center" | "left" | "right" | "justify";

const Text = styled.div<{
  type?: TTextType;
  weight?: 400 | 500 | 600 | 700;
  size?: TTextSize;
  fitContent?: boolean;
  nowrap?: boolean;
  textAlign?: TTextAlign;
  onClick?: () => void;
}>`
  width: ${({ fitContent }) => (fitContent ? "fit-content" : "100%")};
  font-weight: ${({ weight }) => weight ?? 500};
  white-space: ${({ nowrap }) => (nowrap ? "nowrap" : "unset")};
  text-align: ${({ textAlign }) => textAlign ?? "unset"};
  ${({ onClick }) => onClick != null && "cursor: pointer;"};

  ${({ size }) =>
    (() => {
      switch (size) {
        case "large":
          return "font-size: 40px;line-height: 48px;";
        case "title":
          return "font-size: 26px;line-height: 34px;";
        case "big":
          return "font-size: 20px; line-height: 28px;";
        case "medium":
          return "font-size: 17px; line-height: 24px;";
        case "small":
          return "font-size: 12px; line-height: 16px;";
        default:
          return "font-size: 14px; line-height: 20px;";
      }
    })()}
  ${({ type }) =>
    (() => {
      switch (type) {
        case "secondary":
          return "color: #A2A2C0;";
        case "primary":
          return "color: #ffffff;";
        case "purple":
          return "color: #767EFF;";
        case "error":
          return "color: #E34744;";
        case "success":
          return "color: #7CE34F;";
        default:
          return "color: #000;";
      }
    })()}
`;

export default Text;

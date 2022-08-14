import styled from "@emotion/styled";
import React, { HTMLAttributes } from "react";
import { ReactComponent as ArrowIcon } from "@src/assets/icons/arrowRightBorderless.svg";

interface IProps extends HTMLAttributes<HTMLDivElement> {}

const Root = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 36px 0 16px;
  background: #1f1e25;
  border-radius: 20px;
  font-weight: 500;
  font-size: 14px;
  line-height: 20px;
  color: #ffffff;
  height: 40px;
  min-width: 240px;
  position: relative;
  cursor: pointer;
  box-sizing: border-box;
  & > .arrow {
    path {
      fill: #a2a2c0;
    }
    transform: rotate(-90deg);
    position: absolute;
    right: 16px;
  }
`;

const Select: React.FC<IProps> = ({ children, ...rest }) => (
  <Root {...rest}>
    {children} <ArrowIcon className="arrow" />
  </Root>
);

export default Select;

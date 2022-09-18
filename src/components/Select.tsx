import styled from "@emotion/styled";
import React, { HTMLAttributes, useState } from "react";
import Tooltip from "./Tooltip";
import arrowIcon from "@src/assets/icons/arrowRightBorderless.svg";
import SizedBox from "@components/SizedBox";
import { Column } from "./Flex";

interface IOption {
  key: string;
  title: string;
}

interface IProps extends Omit<HTMLAttributes<HTMLDivElement>, "onSelect"> {
  options: IOption[];
  selected?: IOption;
  onSelect: (key: IOption) => void;
}

const Root = styled.div<{ focused?: boolean }>`
  width: 100%;
  display: flex;
  height: 56px;

  background: #ffffff;
  border: 2px solid #000000;
  border-radius: 8px;

  outline: none;
  font-weight: 400;
  font-size: 16px;
  line-height: 24px;
  align-items: center;
  white-space: nowrap;

  .menu-arrow {
    transition: 0.4s;
    transform: ${({ focused }) =>
      focused ? "rotate(-90deg)" : "rotate(90deg)"};
  }
`;
const Option = styled.div<{ active?: boolean }>`
  width: 100%;
  display: flex;
  cursor: pointer;
  position: relative;
  align-items: center;
  font-weight: 400;
  font-size: 14px;
  line-height: 20px;
  padding: 10px 12px 10px 22px;
  margin: 0 -16px;
  white-space: nowrap;

  :hover {
  }

  ::after {
    transition: 0.4s;
    position: absolute;
    right: 12px;
    ${({ active }) => active && `content: url(${"check"})`};
  }
`;

const Select: React.FC<IProps> = ({ options, selected, onSelect, ...rest }) => {
  const [focused, setFocused] = useState(false);
  return (
    <Tooltip
      config={{
        placement: "bottom-start",
        trigger: "click",
        onVisibleChange: setFocused,
      }}
      content={
        <Column crossAxisSize="max">
          {options.map((v) => {
            const active = selected?.key === v.key;
            return (
              <Option
                active={active}
                key={v.key + "_option"}
                onClick={() => {
                  onSelect(v);
                }}
              >
                {v.title}
              </Option>
            );
          })}
        </Column>
      }
    >
      <Root
        focused={focused}
        onClick={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        {...rest}
      >
        {selected?.title ?? options[0].title}
        <SizedBox width={10} />
        <img src={arrowIcon} className="menu-arrow" alt="arrow" />
      </Root>
    </Tooltip>
  );
};
export default Select;

import styled from "@emotion/styled";
import React, { HTMLAttributes, useState } from "react";
import Tooltip from "./Tooltip";
import SizedBox from "@components/SizedBox";
import { Column, Row } from "./Flex";
import useElementSize from "@src/hooks/useElementSize";
import Text from "@components/Text";

interface IProps extends Omit<HTMLAttributes<HTMLDivElement>, "onSelect"> {
  options: IOption[];
  selected: IOption | null;
  placeholder?: string;
  onSelect: (key: IOption) => void;
}

export interface IOption {
  key: string;
  title: string;
}

const Root = styled.div<{ focused?: boolean }>`
  display: flex;
  background: #ffffff;
  border: 2px solid #000000;
  border-radius: 8px;
  //padding: 16px;
  color: #000;
  outline: none;
  font-weight: 500;
  height: 56px;
  font-size: 17px;
  line-height: 24px;
  align-items: center;
  white-space: nowrap;
  position: relative;
  overflow: hidden;
  transition: 0.4s;
  :hover {
    border: 2px solid #269995;
    background: #fff;
    & > * {
      background: #fff !important;
    }
  }
  .menu-arrow {
    position: absolute;
    right: 24px;
    transition: 0.4s;
    transform: ${({ focused }) =>
      focused ? "rotate(0deg)" : "rotate(-180deg)"};
  }
`;
const Option = styled.div<{ active?: boolean }>`
  width: 100%;
  display: flex;
  cursor: pointer;
  position: relative;
  align-items: center;
  font-weight: 500;
  font-size: 13px;
  line-height: 20px;
  padding: 0 16px;
  margin: 0 -16px;
  white-space: nowrap;
  transition: 0.4s;
  :hover {
    background: #eeeeee;
    cursor: pointer;
  }

  ::after {
    transition: 0.4s;
    position: absolute;
    right: 12px;
    ${({ active }) => active && `content: url(${"check"})`};
  }
`;

const Circle = styled.div<{ bg: string }>`
  width: 20px;
  height: 20px;
  border: 2px solid #000000;
  border-radius: 50%;
  background-color: ${({ bg }) => bg};
`;
const Select: React.FC<IProps> = ({
  options,
  selected,
  placeholder,
  onSelect,
  ...rest
}) => {
  const [focused, setFocused] = useState(false);
  const [squareRef, { width }] = useElementSize();
  const handleSelect = (v: IOption) => {
    onSelect(v);
  };
  return (
    <Tooltip
      config={{
        placement: "bottom-end",
        trigger: "click",
        onVisibleChange: setFocused,
      }}
      width={width}
      content={
        <Column crossAxisSize="max">
          {options.map((v) => {
            const active = selected?.key === v.key;
            return (
              <Option
                active={active}
                key={v.key + "_option"}
                onClick={() => handleSelect(v)}
              >
                <Circle bg={v.key} />
                <SizedBox width={8} />
                <p>{v.title}</p>
              </Option>
            );
          })}
        </Column>
      }
    >
      <Row justifyContent="flex-end" alignItems="center">
        <Text fitContent>Select color</Text>
        <SizedBox width={12} />
        <Circle bg={selected?.key ?? "#fff"} />
      </Row>
      {/*<Root*/}
      {/*  focused={focused}*/}
      {/*  ref={squareRef}*/}
      {/*  onClick={() => setFocused(true)}*/}
      {/*  onBlur={() => setFocused(false)}*/}
      {/*  {...rest}*/}
      {/*>*/}
      {/*  {selected == null ? (*/}
      {/*    <div style={{ padding: "14px 16px", color: "#aaaaaa" }}>*/}
      {/*      {placeholder}*/}
      {/*    </div>*/}
      {/*  ) : (*/}
      {/*    <Option>*/}
      {/*      <SizedBox width={17} />*/}
      {/*      <Circle bg={selected.key} />*/}
      {/*      <SizedBox width={8} />*/}
      {/*      <p>{selected.title}</p>*/}
      {/*    </Option>*/}
      {/*  )}*/}
      {/*  <SizedBox width={10} />*/}
      {/*  <img src={arrowIcon} className="menu-arrow" alt="arrow" />*/}
      {/*</Root>*/}
    </Tooltip>
  );
};
export default Select;

import styled from "@emotion/styled";
import React, { CSSProperties } from "react";
import Text from "@src/components/Text";

type ITab = {
  name: string;
  additionalInfo?: string | number;
};

interface IProps {
  tabs: ITab[];
  activeTab: number;
  setActive: (index: number) => void;
  style?: CSSProperties;
  tabStyle?: CSSProperties;
}

const Root = styled.div`
  display: flex;
  border-bottom: 2px solid #000;
  width: 100%;
`;
const Tab = styled.div<{ active?: boolean }>`
  text-align: center;
  margin-right: 24px;
  padding-bottom: 12px;
  border-bottom: 4px solid #7075e9;
  cursor: pointer;
  border-bottom: ${({ active }) =>
    active ? `4px solid #A5FFC9` : "4px solid transparent"};
  margin-bottom: -2px;
  user-select: none;
  transition: 0.4s;

  div {
    color: ${({ active }) => (active ? "#000" : "#666666")};
  }

  span{
    background: ${({ active }) => (active ? "#A5FFC9" : "#EEEEEE")};
    margin-left: 8px;
    padding: 6px;
    height: 24px;
    box-sizing: border-box;
    border-radius: 2px;
    font-size: 13px;
    line-height: 20px;
  }
  
  :hover {
    border-bottom: ${({ active }) => !active && `4px solid #A5FFC9`}
  }
}
`;
const Tabs: React.FC<IProps> = ({
  tabs,
  activeTab,
  setActive,
  style,
  tabStyle,
}) => {
  return (
    <Root style={style}>
      {tabs.map(({ additionalInfo, name }, index) => (
        <Tab
          key={index}
          active={index === activeTab}
          onClick={() => setActive(index)}
          style={tabStyle}
        >
          <Text weight={500} size="medium">
            {name}
            {additionalInfo != null && additionalInfo !== 0 && (
              <span>{additionalInfo}</span>
            )}
          </Text>
        </Tab>
      ))}
    </Root>
  );
};
export default Tabs;

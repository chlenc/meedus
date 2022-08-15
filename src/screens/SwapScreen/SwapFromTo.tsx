import styled from "@emotion/styled";
import React from "react";
import exchange from "@src/assets/icons/exchange.svg";

interface IProps {
  fromValue: string;
  toValue: string;
  toSymbol: string;
  fromSymbol: string;
}

const Root = styled.div`
  display: flex;
  padding: 24px 0;

  img {
    height: 24px;
    width: 24px;
  }

  & > * {
    padding-left: 8px;
  }
`;
const Text = styled.div`
  font-style: normal;
  font-weight: 500;
  font-size: 14px;
  line-height: 20px;
  color: #ffffff;
`;

const SwapFromTo: React.FC<IProps> = ({
  fromValue,
  fromSymbol,
  toValue,
  toSymbol,
}) => {
  return (
    <Root>
      <img src={exchange} alt="exchange" />
      <Text>{`${fromValue} ${fromSymbol} = ${toValue} ${toSymbol}`}</Text>
    </Root>
  );
};
export default SwapFromTo;

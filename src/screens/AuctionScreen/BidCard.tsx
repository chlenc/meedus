import styled from "@emotion/styled";
import React from "react";

interface IProps {
  status: string;
  amount: string;
  phase: string;
}

const Root = styled.div`
  display: flex;
  flex-direction: column;
`;

const BidCard: React.FC<IProps> = () => {
  return <Root></Root>;
};
export default BidCard;

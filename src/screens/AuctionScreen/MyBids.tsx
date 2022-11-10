import styled from "@emotion/styled";
import React from "react";
import Text from "@components/Text";
import { Row } from "@src/components/Flex";
import Button from "@components/Button";
import SizedBox from "@components/SizedBox";
import BN from "@src/utils/BN";
import BidCard from "@screens/AuctionScreen/BidCard";
import TextBtn from "@components/TextBtn";

interface IProps {}

const Root = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;
const Bids = styled.div`
  display: grid;
  grid-gap: 24px;
  grid-template-columns: 1fr;
  @media (min-width: 768px) {
    grid-template-columns: 1fr 1fr;
  }
  @media (min-width: 1024px) {
    grid-template-columns: 1fr 1fr 1fr;
  }
`;

const MyBids: React.FC<IProps> = () => {
  const bids = [
    { status: "bid", amount: new BN(10), phase: "12-12-2022" },
    { status: "missed", amount: new BN(10), phase: "12-12-2022" },
    { status: "reveal", amount: new BN(10), phase: "12-12-2022" },
    { status: "winner", amount: new BN(10), phase: "12-12-2022" },
    { status: "expired", amount: new BN(10), phase: "12-12-2022" },
  ];
  return (
    <Root>
      <Row justifyContent="space-between">
        <Text size="large" weight={700} fitContent>
          My bids
        </Text>
        <Row mainAxisSize="fit-content" alignItems="center">
          <TextBtn disabled>Backup</TextBtn>
          <SizedBox width={44} />
          <TextBtn disabled>Restore</TextBtn>
          <SizedBox width={44} />
          <Button disabled fitContent kind="secondary">
            Claim All
          </Button>
        </Row>
      </Row>
      <SizedBox height={24} />
      <Bids>
        {bids.map((v, index) => (
          <BidCard key={index} {...v} />
        ))}
      </Bids>
    </Root>
  );
};
export default MyBids;

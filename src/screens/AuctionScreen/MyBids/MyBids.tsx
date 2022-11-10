import styled from "@emotion/styled";
import React from "react";
import Text from "@components/Text";
import { Column, Row } from "@src/components/Flex";
import SizedBox from "@components/SizedBox";
import BidCard from "@screens/AuctionScreen/BidCard";
import {
  MyBidsVMProvider,
  useMyBidsVM,
} from "@screens/AuctionScreen/MyBids/MyBidsVm";
import { observer } from "mobx-react-lite";
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

const MyBidsImpl: React.FC<IProps> = observer(() => {
  const vm = useMyBidsVM();

  return (
    <Root>
      <Row justifyContent="space-between">
        <Text size="large" weight={700} fitContent>
          My bids
        </Text>
        <Row mainAxisSize="fit-content" alignItems="center">
          <TextBtn>Backup</TextBtn>
          <SizedBox width={44} />
          <TextBtn>Restore</TextBtn>
          {/*<SizedBox width={44} />*/}
          {/*<Button fitContent kind="secondary">*/}
          {/*  Claim All*/}
          {/*</Button>*/}
        </Row>
      </Row>
      <SizedBox height={24} />
      {vm.bids.length > 0 ? (
        <Bids>
          {vm.bids.map((bid) => (
            <BidCard bid={bid} key={bid.hash} />
          ))}
        </Bids>
      ) : (
        <Column alignItems="center" crossAxisSize="max">
          <SizedBox height={16} />
          <Text size="big" weight={700} textAlign="center">
            You don’t have any bids yet
          </Text>
          <SizedBox height={8} />
          <Text size="medium" textAlign="center">
            Search for a name and make a bid to track how it goes here
          </Text>
        </Column>
      )}
    </Root>
  );
});

const MyBids = () => {
  return (
    <MyBidsVMProvider>
      <MyBidsImpl />
    </MyBidsVMProvider>
  );
};
export default MyBids;

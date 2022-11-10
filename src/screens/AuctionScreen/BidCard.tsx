import styled from "@emotion/styled";
import React from "react";
import { Column, Row } from "@src/components/Flex";
import Text from "@src/components/Text";
// import { ReactComponent as More } from "@src/assets/icons/more.svg";
import SizedBox from "@components/SizedBox";
import Button from "@components/Button";
import Preview from "@components/Preview";
import { TBid, TBidStatus } from "@screens/AuctionScreen/MyBids/MyBidsVm";
import BN from "@src/utils/BN";

interface IProps {
  bid: TBid;
}

const Root = styled.div`
  display: flex;
  flex-direction: column;
  background: #ffffff;
  border: 2px solid #eeeeee;
  border-radius: 12px;
  padding: 16px;
`;

const Status = styled.div<{ status?: TBidStatus }>`
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 2px;
  padding: 2px 8px;
  font-weight: 500;
  font-size: 13px;
  line-height: 20px;
  ${({ status }) =>
    (() => {
      switch (status) {
        case "bid":
          return "background-color: #C1BFFF";
        case "missed":
          return "background-color: #FF938C";
        case "reveal":
          return "background-color: #FFDEA6";
        case "needReveal":
          return "background-color: #FFDEA6";
        case "winner":
          return "background-color: #A5FFC9";
        case "leading":
          return "background-color: #A5FFC9";
        case "expired":
          return "background-color: #EEEEEE";
        default:
          return "background-color: #EEEEEE";
      }
    })()}
`;

const getBtnText = (status?: string) => {
  switch (status) {
    case "bid":
      return "Open Bid";
    case "missed":
      return "Open Bid";
    case "reveal":
      return "Claim NFT";
    case "winner":
      return "Refund Bid";
    case "expired":
      return "Refund Bid";
    default:
      return "Default";
  }
};
const BidCard: React.FC<IProps> = ({ bid }) => {
  // console.log(bid);
  return (
    <Root>
      <Row justifyContent="space-between">
        <Status status={bid.status}>{bid.status}</Status>
        {/*<More />*/}
      </Row>
      <SizedBox height={18} />
      <Preview
        name={bid.name ?? "?"}
        bg={{ key: bid.color ?? "#fff", title: "" }}
      />
      <SizedBox height={16} />
      <Row justifyContent="space-between">
        <Column>
          <Text type="grey">My bid</Text>
          <Text weight={700}>
            {bid.amount ? BN.formatUnits(bid.amount).toFormat(4) : "?"} WAVES
          </Text>
        </Column>
        {/*<Column>*/}
        {/*  <Text type="grey">Next phase</Text>*/}
        {/*  <Text weight={700}>Claim your domain</Text>*/}
        {/*</Column>*/}
      </Row>
      <SizedBox height={16} />
      <Button disabled size="medium">
        {getBtnText(bid.status)}
      </Button>
    </Root>
  );
};
export default BidCard;

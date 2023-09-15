import styled from "@emotion/styled";
import React, { useState } from "react";
import { Column, Row } from "@src/components/Flex";
import Text from "@src/components/Text";
// import { ReactComponent as More } from "@src/assets/icons/more.svg";
import SizedBox from "@components/SizedBox";
import Button from "@components/Button";
import { labelColorMap } from "@components/Preview";
import { TBid, TBidStatus, useMyBidsVM } from "./MyBidsVm";
import BN from "@src/utils/BN";
import CustomCountdown from "@components/CustomCountdown";
import Spinner from "@components/Spinner";

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

// const getBtnText = (status?: string) => {
//   switch (status) {
//     case "bid":
//       return "Open Bid";
//     case "missed":
//       return "Open Bid";
//     case "reveal":
//       return "Claim NFT";
//     case "winner":
//       return "Refund Bid";
//     case "expired":
//       return "Refund Bid";
//     default:
//       return "Default";
//   }
// };

const statusText: Record<TBidStatus, string> = {
  bid: "Bid",
  missed: "Missed",
  needReveal: "Need reveal",
  reveal: "Reveal",
  leading: "Leading",
  winner: "Winner",
  expired: "Expired",
};

const Card = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 176px;
  width: 100%;
  border-radius: 8px;
`;
const Label = styled.p`
  font-weight: 600;
  font-size: 32px;
  line-height: 40px;
  width: fit-content;
  box-sizing: border-box;
  padding: 0 4px;
  margin: 0;
  border-radius: 4px;
  word-break: break-all;
  text-align: center;
`;
const BidCard: React.FC<IProps> = ({ bid }) => {
  const vm = useMyBidsVM();
  const [loading, setLoading] = useState(false);
  const color = labelColorMap[bid?.color ?? ""]?.font ?? "#000";
  const background =
    labelColorMap[bid?.color ?? ""]?.bg ?? "rgba(0, 0, 0, 0.2)";
  const reveal = () => {
    if (loading) return;
    setLoading(true);
    vm.revealBid(bid).finally(() => setLoading(false));
  };
  const finalize = () => {
    if (loading) return;
    setLoading(true);
    vm.finalize(bid).finally(() => setLoading(false));
  };

  return (
    <Root>
      <Row justifyContent="space-between">
        {bid.status && (
          <Status status={bid.status}>{statusText[bid.status]}</Status>
        )}
        {/*<More />*/}
      </Row>
      <SizedBox height={18} />
      <Card style={{ background: bid.color ?? "#fff" }}>
        {bid.name !== "" ? (
          <>
            <Label style={{ color }}>{bid.name ?? "???"}</Label>
            <Label style={{ color, background }}>.sway</Label>
          </>
        ) : null}
      </Card>
      <SizedBox height={16} />
      <Row justifyContent="space-between">
        <Column>
          <Text type="grey">My bid</Text>
          <Text weight={700}>
            {bid.amount ? BN.formatUnits(bid.amount).toFormat(4) : "?"} WAVES
          </Text>
        </Column>
        <Column>
          <Text type="grey">Next phase</Text>
          <Text weight={700}>
            {bid.nextPhase === 0 && "Claim your domain"}
            {bid.nextPhase === -1 && "Refund your bid"}
            {bid.nextPhase != null && bid.nextPhase > 0 && (
              <CustomCountdown date={new Date(+bid.nextPhase)} />
            )}
          </Text>
        </Column>
      </Row>
      <SizedBox height={16} />

      {["bid", "needReveal"].includes(bid.status ?? "") && (
        <Button
          size="medium"
          disabled={loading ?? bid.status === "bid"}
          onClick={reveal}
        >
          {loading ? <Spinner size={16} /> : "Open Bid"}
        </Button>
      )}
      {["missed"].includes(bid.status ?? "") && (
        <Button size="medium" disabled={loading} onClick={finalize}>
          {loading ? <Spinner size={16} /> : "Refund Bid"}
        </Button>
      )}
      {"winner" === (bid.status ?? "") && (
        <Button size="medium" disabled={loading} onClick={finalize}>
          {loading ? <Spinner size={16} /> : "Claim NFT"}
        </Button>
      )}
    </Root>
  );
};
export default BidCard;

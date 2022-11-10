import React from "react";
import Button from "@components/Button";
import { useAuctionScreenVM } from "@screens/AuctionScreen/AuctionScreenVm";
import { observer } from "mobx-react-lite";
import Text from "@components/Text";
import Tooltip from "@components/Tooltip";

interface IProps {}

const PlaceBidButton: React.FC<IProps> = () => {
  const vm = useAuctionScreenVM();
  return (
    <Tooltip content={<Text>Coming soon</Text>}>
      <Button onClick={vm.placeBid}>Place bid</Button>
    </Tooltip>
  );
};
export default observer(PlaceBidButton);

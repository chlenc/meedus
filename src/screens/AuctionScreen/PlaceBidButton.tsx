import React from "react";
import Button from "@components/Button";
import { useAuctionScreenVM } from "@screens/AuctionScreen/AuctionScreenVm";
import { observer } from "mobx-react-lite";
import { useStores } from "@stores";

interface IProps {}

const PlaceBidButton: React.FC<IProps> = () => {
  const { accountStore } = useStores();
  const vm = useAuctionScreenVM();
  if (accountStore.address == null) {
    return (
      <Button onClick={() => accountStore.setLoginModalOpened(true)}>
        Connect wallet
      </Button>
    );
  } else {
    return (
      <Button onClick={vm.placeBid} disabled={vm.disabled}>
        Place bid
      </Button>
    );
  }
};
export default observer(PlaceBidButton);

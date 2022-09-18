import React from "react";
import { useStores } from "@stores";
import Button from "@components/Button";
import { observer } from "mobx-react-lite";
import { useNsScreenVM } from "@screens/NsScreen/NsScreenVm";
import { labelColorMap } from "@screens/NsScreen/Preview";

interface IProps {}

const GetNameBtn: React.FC<IProps> = () => {
  const { accountStore } = useStores();
  const vm = useNsScreenVM();
  switch (true) {
    case accountStore.address == null:
      return (
        <Button onClick={() => accountStore.setLoginModalOpened(true)}>
          Connect wallet
        </Button>
      );
    case vm.name.length === 0:
      return <Button disabled>Enter the name</Button>;
    case vm.color === Object.keys(labelColorMap)[0]:
      return <Button disabled>Set the background color</Button>;
    default:
      return <Button onClick={vm.mint}>Buy for {vm.calcPrice} WAVES</Button>;
  }
};
export default observer(GetNameBtn);

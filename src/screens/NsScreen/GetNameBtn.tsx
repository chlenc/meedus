import React, { HTMLAttributes } from "react";
import { useStores } from "@stores";
import Button from "@components/Button";
import { observer } from "mobx-react-lite";
import { useNsScreenVM } from "@screens/NsScreen/NsScreenVm";
import { labelColorMap } from "@screens/NsScreen/Preview";

interface IProps extends HTMLAttributes<HTMLButtonElement> {}

const GetNameBtn: React.FC<IProps> = ({ ...rest }) => {
  const { accountStore } = useStores();
  const vm = useNsScreenVM();
  switch (true) {
    case accountStore.address == null:
      return (
        <Button
          {...rest}
          {...rest}
          onClick={() => accountStore.setLoginModalOpened(true)}
        >
          Connect wallet
        </Button>
      );
    case vm.name.length === 0:
      return (
        <Button {...rest} disabled>
          Enter the name
        </Button>
      );
    case vm.bg?.key === Object.keys(labelColorMap)[0]:
      return (
        <Button {...rest} disabled>
          Set the background color
        </Button>
      );
    default:
      return (
        <Button {...rest} onClick={vm.mint}>
          Buy for {vm.calcPrice} WAVES
        </Button>
      );
  }
};
export default observer(GetNameBtn);

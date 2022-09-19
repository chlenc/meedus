import React, { HTMLAttributes } from "react";
import { useStores } from "@stores";
import Button from "@components/Button";
import { observer } from "mobx-react-lite";
import { useNsScreenVM } from "@screens/NsScreen/NsScreenVm";

interface IProps extends HTMLAttributes<HTMLButtonElement> {
  fitContent?: boolean;
}

const GetNameBtn: React.FC<IProps> = ({ fitContent, ...rest }) => {
  const { accountStore } = useStores();
  const vm = useNsScreenVM();
  switch (true) {
    case accountStore.address == null:
      return (
        <Button
          {...rest}
          {...rest}
          fitContent={fitContent}
          onClick={() => accountStore.setLoginModalOpened(true)}
        >
          Connect wallet
        </Button>
      );
    case vm.name.length === 0:
      return (
        <Button {...rest} fitContent={fitContent} disabled>
          Enter the name
        </Button>
      );
    case vm.name.length < 4:
      return (
        <Button {...rest} fitContent={fitContent} disabled>
          At least 4 symbols
        </Button>
      );
    case vm.nameError != null:
      return (
        <Button {...rest} fitContent={fitContent} disabled>
          Oops...
        </Button>
      );
    case vm.bg == null:
      return (
        <Button {...rest} fitContent={fitContent} disabled>
          Set the background color
        </Button>
      );
    default:
      return (
        <Button {...rest} fitContent={fitContent} onClick={vm.mint}>
          Buy for {vm.calcPrice} WAVES
        </Button>
      );
  }
};
export default observer(GetNameBtn);

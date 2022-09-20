import React, { HTMLAttributes } from "react";
import { useStores } from "@stores";
import Button from "@components/Button";
import { observer } from "mobx-react-lite";
import { useNsScreenVM } from "@screens/NsScreen/NsScreenVm";
import { ROUTES } from "@src/constants";
import { Link } from "react-router-dom";
import styled from "@emotion/styled";

interface IProps extends HTMLAttributes<HTMLButtonElement> {
  fitContent?: boolean;
}
const StyledLink = styled(Link)`
  display: flex;
  justify-content: center;
  width: 100%;
`;
const GetNameBtn: React.FC<IProps> = ({ fitContent, ...rest }) => {
  const { accountStore } = useStores();
  const vm = useNsScreenVM();
  switch (true) {
    case accountStore.address == null:
      return (
        <StyledLink to={ROUTES.LOGIN}>
          <Button {...rest} {...rest} fitContent={fitContent}>
            Connect wallet
          </Button>
        </StyledLink>
      );
    case vm.name.length === 0:
      return (
        <Button {...rest} fitContent={fitContent} disabled>
          Enter the name
        </Button>
      );
    case /[^A-Za-z0-9]/.test(vm.name):
      return (
        <Button {...rest} fitContent={fitContent} disabled>
          No special symbols
        </Button>
      );
    case vm.loading:
      return (
        <Button {...rest} fitContent={fitContent} disabled>
          Loading ...
        </Button>
      );
    case vm.name.length < 4:
      return (
        <Button {...rest} fitContent={fitContent} disabled>
          At least 4 symbols
        </Button>
      );
    case vm.existingNft != null:
      return (
        <Button {...rest} fitContent={fitContent} disabled>
          Name is already taken
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

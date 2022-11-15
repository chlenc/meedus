import React, { HTMLAttributes } from "react";
import { useStores } from "@stores";
import Button from "@components/Button";
import { observer } from "mobx-react-lite";
import { useNameServiceScreenVM } from "@screens/NameServiceScreen/NameServiceScreenVm";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "@src/constants";

interface IProps extends HTMLAttributes<HTMLButtonElement> {
  fitContent?: boolean;
}

const BuyNftButton: React.FC<IProps> = ({ fitContent, ...rest }) => {
  const { accountStore } = useStores();
  const vm = useNameServiceScreenVM();
  const navigate = useNavigate();
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
    case !vm.isValidName():
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
        <>
          <Button
            {...rest}
            fitContent={fitContent}
            onClick={() =>
              navigate(
                ROUTES.AUCTION.replace(":name", vm.name).replace(
                  ":bg",
                  vm.bg?.key.replace("#", "") ?? ""
                )
              )
            }
          >
            Go to auction
          </Button>
          {vm.paymentAsset && (
            <Button
              {...rest}
              style={{ marginTop: 16, background: "#FFDEA6" }}
              fitContent={fitContent}
              onClick={() => vm.mint(true)}
            >
              Buy for {vm.paymentAsset.symbol} token
            </Button>
          )}
        </>
      );
  }
};
export default observer(BuyNftButton);

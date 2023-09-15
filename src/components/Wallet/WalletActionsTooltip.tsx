import styled from "@emotion/styled";
import React from "react";
import { Column } from "@components/Flex";
import Text from "@components/Text";
import Divider from "@components/Divider";
import copy from "copy-to-clipboard";
import { observer } from "mobx-react-lite";
import { useStores } from "@stores";
import { Anchor } from "@components/Anchor";
import { EXPLORER_URL, PUZZLE_MARKET_URL } from "@src/constants";
import { toast } from "react-toastify";

interface IProps {}

const Root = styled(Column)`
  .menu-item {
    //margin-top: 10px;
    margin-bottom: 10px;
    cursor: pointer;

    :last-child {
      margin-bottom: 0;
    }
  }
`;

const StyledDivider = styled(Divider)`
  height: 2px;
  margin: 0 -16px;
  width: calc(100% + 32px);
`;

const WalletActionsTooltip: React.FC<IProps> = () => {
  const { accountStore } = useStores();
  const address = accountStore.address;
  const handleCopyAddress = () => {
    address && copy(address);
    toast.success("Your address was copied");
  };
  const handleLogout = () => accountStore.logout();

  return (
    <Root>
      <Text onClick={handleCopyAddress} className="menu-item">
        Copy address
      </Text>
      <Anchor href={`${EXPLORER_URL}/address/${address}`} className="menu-item">
        <Text>View in Explorer</Text>
      </Anchor>
      <Anchor
        href={`${PUZZLE_MARKET_URL}/address/${address}`}
        className="menu-item"
      >
        <Text>View on Thunder Marketplace</Text>
      </Anchor>
      <StyledDivider className="menu-item" />
      <Text onClick={handleLogout} className="menu-item">
        Disconnect
      </Text>
    </Root>
  );
};
export default observer(WalletActionsTooltip);

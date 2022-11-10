import styled from "@emotion/styled";
import React, { useState } from "react";
import { Row } from "@components/Flex";
import SizedBox from "@components/SizedBox";
import Text from "@components/Text";
import centerEllipsis from "@src/utils/centerEllipsis";
import * as identityImg from "identity-img";
import { observer } from "mobx-react-lite";
import { useStores } from "@stores";
import Tooltip from "@components/Tooltip";
import arrowIcon from "@src/assets/icons/arrowRightBorderless.svg";
import WalletActionsTooltip from "@components/Wallet/WalletActionsTooltip";
import useWindowSize from "@src/hooks/useWindowSize";

interface IProps {}

const Root = styled(Row)`
  align-items: center;
  height: fit-content;
  justify-content: space-between;
  color: #ffffff;
  @media (min-width: 1280px) {
    justify-content: flex-end;
  }

  .balances {
    display: flex;
    align-items: center;
    cursor: pointer;
  }
`;

const AddressContainer = styled.div<{ expanded: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 40px;
  box-sizing: border-box;
  border-radius: 20px;
  padding: 8px 8px 8px 8px;
  cursor: pointer;

  :hover {
    //background: #f1f2fe;
  }

  .avatar {
    transition: 0.4s;
    width: 32px;
    height: 32px;
    border-radius: 50%;
    margin-right: 8px;
    border: 2px solid #000000;
  }

  .menu-arrow {
    transition: 0.4s;
    transform: ${({ expanded }) =>
      expanded ? "rotate(0deg)" : "rotate(180deg)"};
  }
  :hover {
    .menu-arrow {
      transform: ${({ expanded }) =>
        expanded ? "rotate(0deg)" : "rotate(90deg)"};
    }
  }
`;

const LoggedInAccountInfo: React.FC<IProps> = () => {
  const { accountStore } = useStores();
  const { address } = accountStore;
  const avatar = address && identityImg.create(address, { size: 24 * 3 });
  const [accountOpened, setAccountOpened] = useState<boolean>(false);
  const { width } = useWindowSize();
  return (
    <Root>
      <SizedBox width={24} />
      <Tooltip
        config={{
          placement: "bottom-end",
          trigger: "click",
          onVisibleChange: setAccountOpened,
        }}
        content={<WalletActionsTooltip />}
      >
        <AddressContainer expanded={accountOpened}>
          <img className="avatar" src={avatar!} alt="avatar" />
          {width == null || width > 436 ? (
            <Text weight={700} size="medium">
              {centerEllipsis(address ?? "", 8)}
            </Text>
          ) : null}
          <SizedBox width={12} />
          <img src={arrowIcon} className="menu-arrow" alt="arrow" />
        </AddressContainer>
      </Tooltip>
    </Root>
  );
};
export default observer(LoggedInAccountInfo);

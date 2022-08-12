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

interface IProps {}

const Root = styled(Row)`
  align-items: center;
  height: fit-content;
  justify-content: space-between;
  color: #ffffff;
  @media (min-width: 768px) {
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
  background-color: #2a2a32;

  :hover {
    //background: #f1f2fe;
  }

  .avatar {
    transition: 0.4s;
    width: 24px;
    height: 24px;
    border-radius: 50%;
    margin-right: 8px;
  }

  .menu-arrow {
    transition: 0.4s;
    transform: ${({ expanded }) =>
      expanded ? "rotate(-90deg)" : "rotate(0deg)"};
  }
`;

const LoggedInAccountInfo: React.FC<IProps> = () => {
  const { accountStore } = useStores();
  const { address } = accountStore;
  const avatar = address && identityImg.create(address, { size: 24 * 3 });
  const [accountOpened, setAccountOpened] = useState<boolean>(false);
  return (
    <Root>
      <SizedBox width={24} />
      <Tooltip
        config={{
          placement: "bottom-end",
          trigger: "click",
          onVisibleChange: setAccountOpened,
        }}
        content={<Text onClick={() => accountStore.logout()}>Disconnect</Text>}
      >
        <AddressContainer expanded={accountOpened}>
          <img className="avatar" src={avatar!} alt="avatar" />
          <Text>{centerEllipsis(address ?? "", 10)}</Text>
          <SizedBox width={10} />
          <img src={arrowIcon} className="menu-arrow" alt="arrow" />
        </AddressContainer>
      </Tooltip>
    </Root>
  );
};
export default observer(LoggedInAccountInfo);

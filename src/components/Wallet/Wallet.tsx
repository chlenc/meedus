import styled from "@emotion/styled";
import React from "react";
import { useStores } from "@stores";
import { observer } from "mobx-react-lite";
import Button from "@components/Button";
import LoggedInAccountInfo from "@components/Wallet/LoggedInAccountInfo";
import { Link } from "react-router-dom";
import { ROUTES } from "@src/constants";

interface IProps {}

const Root = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  width: fit-content;
`;

const Wallet: React.FC<IProps> = () => {
  const { accountStore } = useStores();
  const { address } = accountStore;

  return (
    <Root>
      {address == null ? (
        <Link to={ROUTES.LOGIN}>
          <Button style={{ maxWidth: 170 }} size="medium" fitContent>
            Connect wallet
          </Button>
        </Link>
      ) : (
        <LoggedInAccountInfo />
      )}
    </Root>
  );
};
export default observer(Wallet);

import React from "react";
import { LOGIN_TYPE } from "@stores/AccountStore";
import { observer } from "mobx-react-lite";
import { useStores } from "@stores";
import SizedBox from "@components/SizedBox";
import { Anchor } from "@components/Anchor";
import Text from "@components/Text";
import styled from "@emotion/styled";
import { Column } from "@components/Flex";
import Button from "@components/Button";
import Layout from "@components/Layout";
import LoginScreenHeader from "@screens/LoginScreen/LoginScreenHeader";
import { Navigate } from "react-router-dom";
import { ROUTES } from "@src/constants";

interface IProps {}

const Root = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: #ffffff;
  z-index: 10;
  padding: 16px;
  @media (min-width: 1280px) {
    padding: 40px;
  }
`;

const LoginScreen: React.FC<IProps> = () => {
  const { accountStore } = useStores();
  const handleLogin = (loginType: LOGIN_TYPE) => () =>
    accountStore.login(loginType);
  const isKeeperDisabled = !accountStore.isWavesKeeperInstalled;
  if (accountStore.address != null) return <Navigate to={ROUTES.ROOT} />;
  return (
    <Layout header={<LoginScreenHeader />}>
      <Root>
        <Column justifyContent="center" alignItems="center">
          <Text weight={700} size="large">
            Connect wallet
          </Text>
          <SizedBox height={40} />
          <Button
            kind="secondary"
            onClick={handleLogin(LOGIN_TYPE.SIGNER_EMAIL)}
          >
            Waves.Exchange email
          </Button>
          <SizedBox height={16} />
          <Button
            kind="secondary"
            onClick={handleLogin(LOGIN_TYPE.SIGNER_SEED)}
          >
            Seed phrase
          </Button>
          <SizedBox height={16} />
          <Button
            kind="secondary"
            onClick={
              !isKeeperDisabled ? handleLogin(LOGIN_TYPE.KEEPER) : undefined
            }
            disabled={isKeeperDisabled}
          >
            Keeper Wallet
          </Button>
          <SizedBox height={40} />
        </Column>
        <SizedBox height={8} />
        <Text weight={500} size="medium" textAlign="center">
          <span> New to Waves blockchain?</span> <br />
          <Anchor style={{ color: "#269995" }} href="https://t.me/meedus_nft">
            Learn more about wallets
          </Anchor>
        </Text>
        <SizedBox height={116} />
      </Root>
    </Layout>
  );
};
export default observer(LoginScreen);

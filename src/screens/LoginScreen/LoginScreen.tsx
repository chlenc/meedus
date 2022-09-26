import React from "react";
import { LOGIN_TYPE } from "@stores/AccountStore";
import { observer } from "mobx-react-lite";
import { useStores } from "@stores";
import SizedBox from "@components/SizedBox";
import { Anchor } from "@components/Anchor";
import Text from "@components/Text";
import styled from "@emotion/styled";
import { Column, Row } from "@components/Flex";
import Button from "@components/Button";
import Layout from "@components/Layout";
import LoginScreenHeader from "@screens/LoginScreen/LoginScreenHeader";
import pic from "@src/assets/images/connectWalletPic.png";

interface IProps {}

const Root = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: #ffffff;
  z-index: 10;
  padding: 16px;
  width: 100%;
  box-sizing: border-box;
  @media (min-width: 480px) {
    padding: 16px 0;
  }
  @media (min-width: 1280px) {
    padding: 40px 0;
  }
`;

const Pic = styled.div`
  background: url(${pic}) center no-repeat #eeeeee;
  background-size: contain;
  min-width: 640px;
  height: 100vh;
  display: none;
  margin-top: -80px;
  z-index: 1;
  @media (min-width: 1280px) {
    display: flex;
  }
`;

const layoutStyle: React.CSSProperties = {
  position: "fixed",
  top: 0,
  left: 0,
  bottom: 0,
  right: 0,
  zIndex: 10,
  background: "#fff",
};

const LoginScreen: React.FC<IProps> = () => {
  const { accountStore } = useStores();
  const handleLogin = (loginType: LOGIN_TYPE) => () =>
    accountStore
      .login(loginType)
      .then(() => accountStore.setLoginModalOpened(false));
  const isKeeperDisabled = !accountStore.isWavesKeeperInstalled;
  if (!accountStore.loginModalOpened) return null;
  return (
    <Layout style={layoutStyle} header={<LoginScreenHeader />}>
      <Row alignItems="center">
        <Pic />
        <Root>
          <Column
            justifyContent="center"
            alignItems="center"
            crossAxisSize="max"
            style={{ maxWidth: 360 }}
          >
            <Text weight={700} size="large" textAlign="center">
              Connect wallet
            </Text>
            <SizedBox height={40} />
            <Button
              kind="secondary"
              onClick={handleLogin(LOGIN_TYPE.SIGNER_EMAIL)}
            >
              Waves.Exchange email
            </Button>
            {/*<SizedBox height={16} />*/}
            {/*<Button*/}
            {/*  kind="secondary"*/}
            {/*  onClick={handleLogin(LOGIN_TYPE.SIGNER_SEED)}*/}
            {/*>*/}
            {/*  Seed phrase*/}
            {/*</Button>*/}
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
      </Row>
    </Layout>
  );
};
export default observer(LoginScreen);

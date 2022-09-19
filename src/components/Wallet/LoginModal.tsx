import React from "react";
import { LOGIN_TYPE } from "@stores/AccountStore";
import seed from "@src/assets/icons/seed.svg";
import email from "@src/assets/icons/email.svg";
import keeper from "@src/assets/icons/keeper.svg";
import { observer } from "mobx-react-lite";
import { useStores } from "@stores";
import SizedBox from "@components/SizedBox";
import { Anchor } from "@components/Anchor";
import Text from "@components/Text";
import styled from "@emotion/styled";
import logo from "@src/assets/images/bigLogo.svg";
import btn from "@src/assets/icons/closeBtn.svg";
import { Column, Row } from "../Flex";

interface IProps {
  onClose: () => void;
  onLogin: (loginType: LOGIN_TYPE) => void;
}

const loginTypes = [
  {
    title: "Waves Exchange Email",
    icon: email,
    type: LOGIN_TYPE.SIGNER_EMAIL,
  },
  {
    title: "Waves Exchange Seed",
    icon: seed,
    type: LOGIN_TYPE.SIGNER_SEED,
  },
  {
    title: "Waves Keeper",
    icon: keeper,
    type: LOGIN_TYPE.KEEPER,
  },
];
const LoginBtn = styled.div`
  font-weight: 700;
  font-size: 17px;
  line-height: 24px;
  align-items: center;
  justify-content: center;
  padding: 16px;
  letter-spacing: -0.01em;
  border: 2px solid #000000;
  box-shadow: 4px 4px 0px #000000;
  border-radius: 8px;
  color: #000000;
  margin-bottom: 16px;
  cursor: pointer;
  width: 100%;
  text-align: center;
`;

const Root = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  position: absolute;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
  background: #ffffff;
  z-index: 10;
  padding: 16px;
  @media (min-width: 768px) {
    padding: 40px;
  }
`;
const Logo = styled.img`
  height: 48px;
`;
const Btn = styled.img`
  width: 40px;
  height: 40px;
  cursor: pointer;
`;
const Types = styled(Column)``;
const LoginModal: React.FC<IProps> = ({ onLogin, onClose, ...rest }) => {
  const handleLogin = (loginType: LOGIN_TYPE) => () => {
    onClose();
    onLogin(loginType);
  };
  const { accountStore } = useStores();
  const isKeeperDisabled = !accountStore.isWavesKeeperInstalled;
  return (
    <Root>
      <Row justifyContent="space-between" alignItems="center">
        <Logo src={logo} alt="logo" />
        <Btn src={btn} alt="btn" onClick={onClose} />
      </Row>
      <SizedBox height={112} />
      <Types justifyContent="center" alignItems="center">
        <Text weight={700} size="large">
          Connect wallet
        </Text>
        <SizedBox height={40} />
        {loginTypes.map((t) =>
          t.type === LOGIN_TYPE.KEEPER && isKeeperDisabled ? (
            <LoginBtn key={t.type}> {t.title}</LoginBtn>
          ) : (
            <LoginBtn key={t.type} onClick={handleLogin(t.type)}>
              {t.title}
            </LoginBtn>
          )
        )}
      </Types>
      <SizedBox height={8} />
      <Text weight={500} textAlign="center">
        <span> New in MEEDUS? </span> <br />
        <Anchor
          style={{ color: "#269995" }}
          target="_blank"
          rel="noreferrer noopener"
          href="https://t.me/meedus_nft"
        >
          Learn more about wallets
        </Anchor>
      </Text>
      <SizedBox height={16} />
    </Root>
  );
};
export default observer(LoginModal);

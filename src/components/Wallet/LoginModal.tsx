import React from "react";
import Dialog from "@components/Dialog";
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

interface IProps {
  onClose: () => void;
  onLogin: (loginType: LOGIN_TYPE) => void;
  visible: boolean;
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

  padding: 16px;
  letter-spacing: -0.01em;
  border: 2px solid #000000;
  box-shadow: 4px 4px 0px #000000;
  border-radius: 8px;
  color: #000000;
  margin-bottom: 16px;
  cursor: pointer;
`;
const LoginModal: React.FC<IProps> = ({ onLogin, ...rest }) => {
  const handleLogin = (loginType: LOGIN_TYPE) => () => {
    rest.onClose();
    onLogin(loginType);
  };
  const { accountStore } = useStores();
  const isKeeperDisabled = !accountStore.isWavesKeeperInstalled;
  return (
    <Dialog style={{ maxWidth: 360 }} {...rest}>
      {loginTypes.map((t) =>
        t.type === LOGIN_TYPE.KEEPER && isKeeperDisabled ? (
          <LoginBtn key={t.type}> {t.title}</LoginBtn>
        ) : (
          <LoginBtn key={t.type} onClick={handleLogin(t.type)}>
            {t.title}
          </LoginBtn>
        )
      )}
      <SizedBox height={8} />
      <Text weight={500} textAlign="center">
        <span style={{ color: "#A2A2C0" }}> New in MEEDUS? </span>{" "}
        <Anchor
          target="_blank"
          rel="noreferrer noopener"
          href="https://t.me/meedus_nft"
        >
          Learn more about wallets
        </Anchor>
      </Text>
      <SizedBox height={16} />
    </Dialog>
  );
};
export default observer(LoginModal);

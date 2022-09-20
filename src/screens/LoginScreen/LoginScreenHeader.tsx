import React from "react";
import styled from "@emotion/styled";
import logo from "@src/assets/images/bigLogo.svg";
import { ReactComponent as CloseIcon } from "@src/assets/icons/closeBtn.svg";
import Button from "@components/Button";
import { useStores } from "@stores";

interface IProps {}

const Root = styled.div`
  display: flex;
  box-sizing: border-box;
  padding: 0 16px;
  height: 80px;
  z-index: 2;
  align-items: center;
  max-width: calc(1160px + 32px);
  width: 100%;
  justify-content: space-between;
  color: white;
  @media (min-width: 1280px) {
    padding: 16px 24px;
    border-bottom: 1px solid transparent;
    background: transparent;
  }
`;
const Logo = styled.img`
  height: 48px;
`;
const CloseButton = styled(Button)`
  width: 40px;
  padding: 0;
`;

const LoginScreenHeader: React.FC<IProps> = () => {
  const { accountStore } = useStores();
  return (
    <Root>
      <a href="/">
        <Logo src={logo} />
      </a>
      <CloseButton
        size="medium"
        kind="secondary"
        onClick={() => accountStore.setLoginModalOpened(false)}
      >
        <CloseIcon />
      </CloseButton>
    </Root>
  );
};
export default LoginScreenHeader;

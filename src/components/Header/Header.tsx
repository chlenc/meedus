import React, { useState } from "react";
import styled from "@emotion/styled";
import logo from "@src/assets/images/bigLogo.svg";
import { observer } from "mobx-react-lite";
import Wallet from "@components/Wallet/Wallet";
import { Row } from "../Flex";
import SizedBox from "@components/SizedBox";
import Text from "@components/Text";

interface IProps {}

const Root = styled.div`
  display: flex;
  box-sizing: border-box;
  padding: 0 16px;
  height: 64px;
  align-items: center;
  max-width: calc(1160px + 32px);
  width: 100%;
  justify-content: space-between;
  color: white;
  background: #1f1e25;
  border-bottom: 1px solid #3b3b46;
  @media (min-width: 768px) {
    padding: 24px;
    border-bottom: 1px solid transparent;
    background: transparent;
    height: 80px;
  }
`;
const Logo = styled.img`
  height: 24px;
  @media (min-width: 768px) {
    height: 32px;
  }
`;

const LogoText = styled(Text)`
  font-weight: 700;
  color: #ffffff;
  @media (min-width: 768px) {
    font-size: 22px;
    line-height: 27px;
  }
`;
console.log(process.env.REACT_APP_NFT_STORAGE_KEY);

const Header: React.FC<IProps> = () => {
  return (
    <Root>
      <a href="/">
        <Row alignItems="center">
          <Logo src={logo} />
          <SizedBox width={8} />
          <LogoText nowrap>.waves ns</LogoText>
        </Row>
      </a>

      <Wallet />
    </Root>
  );
};
export default observer(Header);

import React from "react";
import styled from "@emotion/styled";
import logo from "@src/assets/images/bigLogo.svg";
import Wallet from "@components/Wallet/Wallet";

interface IProps {}

const Root = styled.div`
  display: flex;
  box-sizing: border-box;
  padding: 16px;
  align-items: center;
  max-width: calc(1160px + 32px);
  width: 100%;
  justify-content: space-between;
  color: white;
  @media (min-width: 768px) {
    padding: 16px 24px;
    border-bottom: 1px solid transparent;
    background: transparent;
  }
`;
const Logo = styled.img`
  height: 48px;
`;

const Header: React.FC<IProps> = () => {
  return (
    <Root>
      <a href="/">
        <Logo src={logo} />
      </a>
      <Wallet />
    </Root>
  );
};
export default Header;

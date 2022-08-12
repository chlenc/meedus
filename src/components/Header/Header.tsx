import React from "react";
import styled from "@emotion/styled";
import logo from "@src/assets/images/bigLogo.svg";
import { observer } from "mobx-react-lite";
import Wallet from "@components/Wallet/Wallet";
import { Link } from "react-router-dom";
import { ROUTES } from "@src/constants";

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
const Header: React.FC<IProps> = () => {
  return (
    <Root>
      <Link to={ROUTES.ROOT}>
        <Logo src={logo} />
      </Link>
      <Wallet />
    </Root>
  );
};
export default observer(Header);

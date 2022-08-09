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
  padding: 12px;
  align-items: center;
  max-width: calc(1160px + 32px);
  justify-content: space-between;
  color: white;
  @media (min-width: 768px) {
    padding: 20px;
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

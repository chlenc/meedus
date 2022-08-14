import React from "react";
import styled from "@emotion/styled";
import logo from "@src/assets/images/bigLogo.svg";
import { observer } from "mobx-react-lite";
import Wallet from "@components/Wallet/Wallet";
import { Link, useLocation } from "react-router-dom";
import { ROUTES } from "@src/constants";
import { Row } from "../Flex";
import Button from "@components/Button";

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

const MenuWrapper = styled(Row)`
  width: 100%;
  align-items: center;
  justify-content: center;
  & > * {
    margin-right: 8px;
  }
  &:last-of-type {
    margin-right: 0;
  }
`;

const MenuItem = styled(Button)<{ selected?: boolean }>`
  height: 32px;
  background: ${({ selected }) => (selected ? "#3B3B46" : "transparent")};
  :hover {
    background: #3b3b46;
  }
`;

const menuItems = [
  {
    title: "Tokens",
    link: ROUTES.TOKENS,
    routes: [ROUTES.TOKENS, ROUTES.ROOT],
  },
  {
    title: "Dapps",
    link: ROUTES.DAPPS,
    routes: [ROUTES.DAPPS],
  },
  {
    title: "Swap",
    link: ROUTES.SWAP,
    routes: [ROUTES.SWAP],
  },
];

const Header: React.FC<IProps> = () => {
  const location = useLocation();

  return (
    <Root>
      <Link to={ROUTES.ROOT}>
        <Logo src={logo} />
      </Link>
      <MenuWrapper>
        {menuItems.map((item, i) => (
          <Link to={item.link} key={i}>
            <MenuItem selected={item.routes.includes(location.pathname)}>
              {item.title}
            </MenuItem>
          </Link>
        ))}
      </MenuWrapper>
      <Wallet />
    </Root>
  );
};
export default observer(Header);

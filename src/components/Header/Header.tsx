import React, { useState } from "react";
import styled from "@emotion/styled";
import logo from "@src/assets/images/bigLogo.svg";
import { observer } from "mobx-react-lite";
import Wallet from "@components/Wallet/Wallet";
import { Link, useLocation } from "react-router-dom";
import { ROUTES } from "@src/constants";
import { Row } from "../Flex";
import Button from "@components/Button";
import SizedBox from "@components/SizedBox";
import { ReactComponent as BurgerIcon } from "@src/assets/icons/burger.svg";
import Text from "@components/Text";
import BottomMenu from "@components/BottomMenu";
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

const MenuWrapperDesktop = styled(Row)`
  width: 100%;
  align-items: center;
  justify-content: center;
  display: none;
  & > * {
    margin-right: 8px;
  }
  &:last-of-type {
    margin-right: 0;
  }
  @media (min-width: 768px) {
    display: flex;
  }
`;
const MenuWrapperMobile = styled(Row)`
  max-width: fit-content;
  align-items: center;
  @media (min-width: 768px) {
    display: none;
  }
`;

const MenuItem = styled(Button)<{ selected?: boolean }>`
  height: 32px;
  background: ${({ selected }) => (selected ? "#3B3B46" : "transparent")};
  :hover {
    background: #3b3b46;
  }
`;

const MobileMenuItem = styled(Text)<{ selected: boolean }>`
  font-size: 16px;
  line-height: 24px;
  padding: 8px 0;
  color: ${({ selected }) => (selected ? "#fff" : "#A2A2C0")};
  width: 100%;
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
  const [open, setOpen] = useState(false);
  return (
    <Root>
      <a href="https://lineup.finance">
        <Logo src={logo} />
      </a>
      <MenuWrapperDesktop>
        {menuItems.map((item, i) => (
          <Link to={item.link} key={i}>
            <MenuItem selected={item.routes.includes(location.pathname)}>
              {item.title}
            </MenuItem>
          </Link>
        ))}
      </MenuWrapperDesktop>
      <Row alignItems="center" mainAxisSize="fit-content">
        <Wallet />
        <MenuWrapperMobile>
          <SizedBox width={16} />
          <BurgerIcon onClick={() => setOpen(true)} />
        </MenuWrapperMobile>
      </Row>

      <BottomMenu open={open} onClose={() => setOpen(false)}>
        {menuItems.map((item, i) => (
          <Link to={item.link} key={i}>
            <MobileMenuItem selected={item.routes.includes(location.pathname)}>
              {item.title}
            </MobileMenuItem>
          </Link>
        ))}
      </BottomMenu>
    </Root>
  );
};
export default observer(Header);

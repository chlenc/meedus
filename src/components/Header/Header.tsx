import React, { useState } from "react";
import styled from "@emotion/styled";
import logo from "@src/assets/images/bigLogo.svg";
import Wallet from "@components/Wallet/Wallet";
import SizedBox from "@components/SizedBox";
import { Row } from "@components/Flex";
import { Link, useLocation } from "react-router-dom";
import BottomMenu from "@components/BottomMenu";
import Text from "@components/Text";
import { ReactComponent as BurgerIcon } from "@src/assets/icons/burger.svg";
import { ROUTES } from "@src/constants";
import Banner from "./Banner";

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

const MenuWrapperDesktop = styled.div`
  background: #eeeeee;
  border-radius: 4px;
  padding: 2px;
  box-sizing: border-box;
  height: 40px;
  display: none;
  @media (min-width: 1024px) {
    display: flex;
  }
`;
const MenuWrapperMobile = styled(Row)`
  max-width: fit-content;
  align-items: center;
  @media (min-width: 1024px) {
    display: none;
  }
`;

const MenuItem = styled(Link)<{ selected?: boolean }>`
  color: #000;
  background: ${({ selected }) => (selected ? "#ffffff" : "transparent")};
  border-radius: 2px;
  height: 100%;
  font-weight: ${({ selected }) => (selected ? 700 : 500)};
  font-size: 13px;
  line-height: 20px;
  white-space: nowrap;
  min-width: 132px;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  justify-content: center;
  flex: 1;
  transition: 0.4s;
  :hover {
    font-weight: 700;
  }
`;

const MobileMenuItem = styled(Text)<{ selected: boolean }>`
  font-size: 16px;
  line-height: 24px;
  padding: 8px 0;
  color: ${({ selected }) => (selected ? "#000000" : "#666666")};
  width: 100%;
`;

const menuItems = [
  {
    title: "Achievements",
    link: ROUTES.ROOT,
    routes: [ROUTES.ROOT],
  },
  {
    title: "Name Service",
    link: ROUTES.NAMESERVICE,
    routes: [ROUTES.NAMESERVICE, ROUTES.AUCTION],
  },
  // {
  //   title: "Partners",
  //   link: ROUTES.PARTNERS,
  //   routes: [ROUTES.PARTNERS],
  // },
];

const Header: React.FC<IProps> = () => {
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const [bannerClosed, setBannerClosed] = useState(false);

  return (
    <>
      <Banner closed={bannerClosed} setClosed={setBannerClosed} />
      <Root>
        <a href="https://meedus.space">
          <Logo src={logo} />
        </a>
        <MenuWrapperDesktop>
          {menuItems.map((item, i) => (
            <MenuItem
              key={i}
              to={item.link}
              selected={item.routes.includes(location.pathname)}
            >
              {item.title}
            </MenuItem>
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
              <MobileMenuItem
                selected={item.routes.includes(location.pathname)}
              >
                {item.title}
              </MobileMenuItem>
            </Link>
          ))}
        </BottomMenu>
      </Root>
    </>
  );
};
export default Header;

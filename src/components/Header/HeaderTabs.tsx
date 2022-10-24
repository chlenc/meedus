import styled from "@emotion/styled";
import React from "react";
import { Link, useLocation } from "react-router-dom";
import { ROUTES } from "@src/constants";
interface IProps {}

const Root = styled.div`
  display: flex;
  background: #eeeeee;
  border-radius: 4px;
  padding: 2px;
  box-sizing: border-box;
  height: 40px;
`;

const Tab = styled(Link)<{ active?: boolean }>`
  color: #000;
  background: ${({ active }) => (active ? "#ffffff" : "transparent")};
  border-radius: 2px;
  height: 100%;
  font-weight: ${({ active }) => (active ? 700 : 500)};
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

const HeaderTabs: React.FC<IProps> = () => {
  const location = useLocation();
  return (
    <Root>
      <Tab to={ROUTES.ROOT} active={location.pathname === ROUTES.ROOT}>
        Achievements
      </Tab>
      <Tab
        to={ROUTES.NAMESERVICE}
        active={location.pathname === ROUTES.NAMESERVICE}
      >
        Name Service
      </Tab>
      <Tab to={ROUTES.PARTNERS} active={location.pathname === ROUTES.PARTNERS}>
        Partners
      </Tab>
    </Root>
  );
};
export default HeaderTabs;

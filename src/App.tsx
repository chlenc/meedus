import React from "react";
import styled from "@emotion/styled";
import Header from "@components/Header";
import { Routes, useLocation } from "react-router-dom";
import Footer from "@components/Footer";
// import { AnimatePresence } from "framer-motion";
import { observer } from "mobx-react-lite";

interface IProps {}

const Root = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 100%;
  min-height: 100vh;
  align-items: center;

  & > * {
    width: 100%;
  }
`;
const Content = styled.div`
  display: flex;
  min-height: calc(100vh - 194px);
  padding-top: 32px;
  @media (min-width: 768px) {
    min-height: calc(100vh - 210px);
  }
`;

const App: React.FunctionComponent<IProps> = () => {
  const location = useLocation();
  return (
    <Root>
      <Header />
      <Content>
        {/*<AnimatePresence exitBeforeEnter>*/}
        <Routes key={location.pathname} location={location}>
          {/*<Route path={ROUTES.INVEST} element={<Invest />} />*/}
          {/*<Route path={ROUTES.INVEST_CARD} element={<InvestCard />} />*/}
          {/*<Route path={ROUTES.DASHBOARD} element={<Dashboard />} />*/}
          {/*<Route path="*" element={<Navigate to={ROUTES.DASHBOARD} />} />*/}
        </Routes>
        {/*</AnimatePresence>*/}
      </Content>
      <Footer />
    </Root>
  );
};

export default observer(App);

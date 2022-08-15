import React from "react";
import styled from "@emotion/styled";
import Header from "@components/Header";
import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import Footer from "@components/Footer";
// import { AnimatePresence } from "framer-motion";
import { observer } from "mobx-react-lite";
import { ROUTES } from "@src/constants";
import ExploreScreen from "@screens/ExploreTokensScreen";
import RankingScreen from "@screens/RankingScreen";
import SwapScreen from "@screens/SwapScreen";

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
  //padding-top: 32px;
  @media (min-width: 768px) {
    min-height: calc(100vh - 210px);
    max-width: calc(1160px + 32px);
    //padding: 12px;
    width: 100%;
    box-sizing: border-box;
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
          <Route path={ROUTES.ROOT} element={<ExploreScreen />} />
          <Route path={ROUTES.TOKENS} element={<ExploreScreen />} />
          <Route path={ROUTES.DAPPS} element={<RankingScreen />} />
          <Route path={ROUTES.SWAP} element={<SwapScreen />} />
          <Route path="*" element={<Navigate to={ROUTES.TOKENS} />} />
        </Routes>
        {/*</AnimatePresence>*/}
      </Content>
      <Footer />
    </Root>
  );
};

export default observer(App);

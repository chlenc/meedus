import React from "react";
import styled from "@emotion/styled";
import Header from "@components/Header";
import Footer from "@components/Footer";
// import { AnimatePresence } from "framer-motion";
import { observer } from "mobx-react-lite";
import NsScreen from "@screens/NsScreen";

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
  return (
    <Root>
      {/*<Header />*/}
      <Content>
        <NsScreen />
        {/*<Routes key={location.pathname} location={location}>*/}
        {/*  /!*<Route path={ROUTES.INVEST} element={<Invest />} />*!/*/}
        {/*  /!*<Route path={ROUTES.INVEST_CARD} element={<InvestCard />} />*!/*/}
        {/*  /!*<Route path={ROUTES.DASHBOARD} element={<Dashboard />} />*!/*/}
        {/*  <Route path={ROUTES.NAMES} element={<NsScreen />} />*/}
        {/*  <Route path="*" element={<Navigate to={ROUTES.TOKENS} />} />*/}
        {/*</Routes>*/}
        {/*</AnimatePresence>*/}
      </Content>
      {/*<Footer />*/}
    </Root>
  );
};

export default observer(App);

import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import LoginScreen from "@screens/LoginScreen/LoginScreen";
import { ROUTES } from "@src/constants";
import AchievementsScreen from "@screens/AchievementsScreen";
import NameServiceScreen from "@screens/NameServiceScreen";
import AuctionScreen from "@screens/AuctionScreen";

interface IProps {}

const App: React.FunctionComponent<IProps> = () => {
  console.log(process.env.REACT_APP_BACKEND_URL);
  return (
    <>
      <Routes>
        <Route path={ROUTES.ROOT} element={<AchievementsScreen />} />
        <Route path={ROUTES.NAMESERVICE} element={<NameServiceScreen />} />
        <Route path={ROUTES.AUCTION} element={<AuctionScreen />} />
        {/*<Route path={ROUTES.PARTNERS} element={<PartnersScreen />} />*/}
        <Route path="*" element={<Navigate to={ROUTES.ROOT} />} />
      </Routes>
      <LoginScreen />
    </>
  );
};

export default App;

import React from "react";
import NsScreen from "@screens/NsScreen";
import { Navigate, Route, Routes } from "react-router-dom";
import LoginScreen from "@screens/LoginScreen/LoginScreen";
import { ROUTES } from "@src/constants";
import AchievementsScreen from "@screens/AchievementsScreen";
import PartnersScreen from "@screens/PartnersScreen";

interface IProps {}

const App: React.FunctionComponent<IProps> = () => {
  return (
    <>
      <Routes>
        <Route path={ROUTES.ROOT} element={<AchievementsScreen />} />
        <Route path={ROUTES.NAMESERVICE} element={<NsScreen />} />
        <Route path={ROUTES.PARTNERS} element={<PartnersScreen />} />
        <Route path="*" element={<Navigate to={ROUTES.ROOT} />} />
      </Routes>
      <LoginScreen />
    </>
  );
};

export default App;

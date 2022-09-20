import React from "react";
import NsScreen from "@screens/NsScreen";
import { Route, Routes } from "react-router-dom";
import { ROUTES } from "@src/constants";
import LoginScreen from "@screens/LoginScreen";

interface IProps {}

const App: React.FunctionComponent<IProps> = () => {
  return (
    <Routes>
      <Route path={ROUTES.LOGIN} element={<LoginScreen />} />
      <Route path="*" element={<NsScreen />} />
    </Routes>
  );
};

export default App;

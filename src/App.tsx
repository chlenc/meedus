import React from "react";
import NsScreen from "@screens/NsScreen";
import { Route, Routes } from "react-router-dom";
import LoginScreen from "@screens/LoginScreen/LoginScreen";

interface IProps {}

const App: React.FunctionComponent<IProps> = () => {
  return (
    <>
      <Routes>
        <Route path="*" element={<NsScreen />} />
      </Routes>
      <LoginScreen />
    </>
  );
};

export default App;

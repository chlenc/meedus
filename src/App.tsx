import React from "react";
import styled from "@emotion/styled";
import Header from "@components/Header";
import { observer } from "mobx-react-lite";
import NsScreen from "@screens/NsScreen";

interface IProps {}

const Root = styled.div`
  display: flex;
  flex-direction: column;
  //justify-content: space-between;
  width: 100%;
  min-height: 100vh;
  align-items: center;

  & > * {
    width: 100%;
  }
`;
const Content = styled.div`
  display: flex;
  flex: 1;
  height: 100%;
  justify-content: center;
  //min-height: calc(100vh - 194px);
  //@media (min-width: 768px) {
  //  min-height: calc(100vh - 210px);
  //  max-width: calc(1160px + 32px);
  //  width: 100%;
  //  box-sizing: border-box;
  //}
`;

const App: React.FunctionComponent<IProps> = () => {
  return (
    <Root>
      <Header />
      <Content>
        <NsScreen />
      </Content>
    </Root>
  );
};

export default observer(App);

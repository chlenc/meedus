import styled from "@emotion/styled";
import React from "react";
import { observer } from "mobx-react-lite";
import Layout from "@components/Layout";
import { PartnersScreenVMProvider } from "@screens/PartnersScreen/PartnersScreenVm";

interface IProps {}

const Root = styled.div`
  //display: flex;
  //flex: 1;
  //flex-direction: column;
  //align-items: center;
  //justify-content: space-between;
  //box-sizing: border-box;
  //padding: 0 16px;
  //height: 100%;
  //width: 100%;
  //min-height: calc(100vh - 150px);
  //max-width: calc(1160px + 32px);
  //position: relative;
  //@media (min-width: 1280px) {
  //  justify-content: stretch;
  //  padding: 0 24px;
  //} ;
`;

const PartnersScreenImpl: React.FC<IProps> = observer(() => {
  // const vm = useNsScreenVM();
  return <Root>PartnersScreen</Root>;
});

const PartnersScreen = () => (
  <PartnersScreenVMProvider>
    <Layout>
      <PartnersScreenImpl />
    </Layout>
  </PartnersScreenVMProvider>
);

export default PartnersScreen;

import styled from "@emotion/styled";
import React from "react";
import { ExploreScreenVMProvider } from "@screens/ExploreTokensScreen/ExploreScreenVm";
import { observer } from "mobx-react-lite";
import DiscoverBlock from "@screens/ExploreTokensScreen/DiscoverBlock";
import TokensTable from "@screens/ExploreTokensScreen/TokensTable";

interface IProps {}

const Root = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  box-sizing: border-box;
  @media (min-width: 768px) {
    padding: 0 24px;
  }
`;

const ExploreScreenImpl: React.FC<IProps> = observer(() => {
  return (
    <Root>
      <DiscoverBlock />
      <TokensTable />
    </Root>
  );
});

const ExploreScreen: React.FC<IProps> = () => {
  return (
    <ExploreScreenVMProvider>
      <ExploreScreenImpl />
    </ExploreScreenVMProvider>
  );
};
export default ExploreScreen;

import styled from "@emotion/styled";
import React from "react";
import { observer } from "mobx-react-lite";
import Layout from "@components/Layout";
import Input from "@components/Input";
import SizedBox from "@components/SizedBox";
import Tabs from "@components/Tabs";
import Badge from "@screens/AchievementsScreen/Badge";
import {
  AchievementsScreenVMProvider,
  useAchievementsScreenVM,
} from "@screens/AchievementsScreen/AchievementsScreenVm";
import Spinner from "@components/Spinner";

interface IProps {}

const Root = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  align-items: center;
  box-sizing: border-box;
  padding: 0 16px;
  height: 100%;
  width: 100%;
  min-height: calc(100vh - 150px);
  max-width: calc(1160px + 32px);
  position: relative;
  margin: 24px 0;
  @media (min-width: 1280px) {
    padding: 0 24px;
  } ;
`;

const BadgesGrid = styled.div`
  width: 100%;
  display: inline-grid;
  gap: 40px;
  grid-template-columns: 1fr;
  @media (min-width: 768px) {
    grid-template-columns: 1fr 1fr;
  }
  @media (min-width: 1024px) {
    grid-template-columns: 1fr 1fr 1fr;
  } ;
`;

const AchievementsScreenImpl: React.FC<IProps> = observer(() => {
  const vm = useAchievementsScreenVM();

  return vm.loading ? (
    <Root style={{ justifyContent: "center", height: "100%" }}>
      <Spinner size={48} />
    </Root>
  ) : (
    <Root>
      <Input
        value={vm.search}
        onChange={(e) => vm.setSearch(e.target.value)}
        icon="search"
        style={{ height: 48 }}
        placeholder="Search in Meedus…"
      />
      <SizedBox height={36} />
      <Tabs
        activeTab={vm.tab}
        setActive={vm.setTab}
        tabs={[
          { name: "All", additionalInfo: vm.badges.length },
          { name: "Unlocked", additionalInfo: vm.unlockedBadges.length },
          { name: "Locked", additionalInfo: vm.lockedBadges.length },
        ]}
      />
      <SizedBox height={40} />
      <BadgesGrid>
        {vm.filteredBadges.map((badge, i) => (
          <Badge badge={badge} key={i} />
        ))}
      </BadgesGrid>
      <SizedBox height={48} />
    </Root>
  );
});

const AchievementsScreen = () => (
  <AchievementsScreenVMProvider>
    <Layout>
      <AchievementsScreenImpl />
    </Layout>
  </AchievementsScreenVMProvider>
);

export default AchievementsScreen;

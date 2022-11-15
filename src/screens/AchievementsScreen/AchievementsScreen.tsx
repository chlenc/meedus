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
import { Row } from "@src/components/Flex";
import Button from "@components/Button";
import { useStores } from "@stores";

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
  margin: 40px 0;
  @media (min-width: 1280px) {
    padding: 0 24px;
  } ;
`;

const BadgesGrid = styled.div`
  width: 100%;
  display: inline-grid;
  gap: 24px;
  grid-template-columns: 1fr;
  @media (min-width: 768px) {
    grid-template-columns: 1fr 1fr;
  }
  @media (min-width: 1024px) {
    grid-template-columns: 1fr 1fr 1fr;
  } ;
`;

const Title = styled.div`
  font-weight: 700;
  font-size: 40px;
  line-height: 48px;
  text-align: center;
  letter-spacing: -0.01em;
  color: #000000;
  max-width: 690px;
  margin-bottom: 40px;

  @media (min-width: 768px) {
    font-size: 56px;
    line-height: 64px;
    margin-bottom: 80px;
  }
`;

const AchievementsScreenImpl: React.FC<IProps> = observer(() => {
  const { accountStore } = useStores();
  const vm = useAchievementsScreenVM();

  return vm.loading ? (
    <Root style={{ justifyContent: "center", height: "100%" }}>
      <Spinner size={48} />
    </Root>
  ) : (
    <Root>
      <Title>Explore Achievements of Waves Ecosystem</Title>
      <Row alignItems="center" justifyContent="space-between">
        <Button
          style={{ maxWidth: 160, minWidth: 100, marginRight: 16 }}
          size="medium"
          disabled={accountStore.address == null || vm.updateLoading}
          kind="secondary"
          onClick={vm.syncProgress}
        >
          {vm.updateLoading ? <Spinner size={16} /> : "Check All Eligibility"}
        </Button>
        <Input
          value={vm.search}
          onChange={(e) => vm.setSearch(e.target.value)}
          icon="search"
          style={{ height: 48, maxWidth: 320 }}
          placeholder="Search in Meedus…"
        />
      </Row>
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
        {vm.filteredBadges.map((badge) => (
          <Badge
            badge={badge}
            key={badge.id}
            loading={vm.mintingId === String(badge.id)}
            mintedTimestamp={vm.mintedDates[String(badge.id)]}
            onMint={() => vm.mint(String(badge.id))}
          />
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

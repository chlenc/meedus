import styled from "@emotion/styled";
import React from "react";
import {
  NameServiceScreenVMProvider,
  useNameServiceScreenVM,
} from "@screens/NameServiceScreen/NameServiceScreenVm";
import { observer } from "mobx-react-lite";
import Text from "@components/Text";
import SizedBox from "@components/SizedBox";
import { Column, Row } from "@src/components/Flex";
import Input from "@components/Input";
import Layout from "@components/Layout";
import ExistPreview from "@screens/NameServiceScreen/ExistPreview";
import NotExistPreview from "@screens/NameServiceScreen/NotExistPreview";
import ActiveBids from "@screens/NameServiceScreen/ActiveBids";
import Button from "@components/Button";

interface IProps {}

const Root = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  box-sizing: border-box;
  padding: 0 16px;
  height: 100%;
  width: 100%;
  min-height: calc(100vh - 150px);
  max-width: calc(1160px + 32px);
  position: relative;
  margin-top: 40px;
  @media (min-width: 1280px) {
    justify-content: stretch;
    padding: 0 24px;
  } ;
`;

const Title = styled(Text)`
  border-radius: 8px;
  padding: 0 8px;
  white-space: nowrap;
  font-weight: 700;
  font-size: 40px;
  line-height: 48px;
  @media (min-width: 480px) {
    font-size: 56px;
    line-height: 64px;
  }
`;

const NameServiceScreenImpl: React.FC<IProps> = observer(() => {
  const vm = useNameServiceScreenVM();
  return (
    <Root>
      <Row justifyContent="center">
        <Column
          crossAxisSize="max"
          mainAxisSize="stretch"
          alignItems="center"
          justifyContent="center"
          style={{ maxWidth: 536 }}
        >
          <Title style={{ background: "#a5ffc9", padding: "0 8px" }} fitContent>
            .waves
          </Title>
          <SizedBox height={8} />
          <Title fitContent>Name Service</Title>
          <SizedBox height={16} />
          <Text size="medium" textAlign="center">
            Find your perfect .waves domain
          </Text>
          <SizedBox height={40} />
          <Row style={{ width: "100%" }}>
            <Input
              onChange={(e) => vm.setName(e.target.value)}
              placeholder="Enter domain"
              value={vm.name}
              suffix=".waves"
            />
            <SizedBox width={16} />
            <Button
              disabled={vm.name === ""}
              onClick={vm.checkNft}
              style={{ width: 160 }}
            >
              Search
            </Button>
          </Row>
          <SizedBox height={40} />
          {vm.name.length > 0 &&
            vm.existingNft != null &&
            vm.name === vm.search && <ExistPreview nft={vm.existingNft} />}
          {vm.name.length > 0 &&
            vm.existingNft == null &&
            vm.name === vm.search && <NotExistPreview />}
          {vm.name.length === 0 && <ActiveBids />}
        </Column>
      </Row>
    </Root>
  );
});

const NameServiceScreen = () => (
  <NameServiceScreenVMProvider>
    <Layout>
      <NameServiceScreenImpl />
    </Layout>
  </NameServiceScreenVMProvider>
);

export default NameServiceScreen;

import styled from "@emotion/styled";
import React from "react";
import {
  NsScreenVMProvider,
  useNsScreenVM,
} from "@screens/NsScreen/NsScreenVm";
import { observer } from "mobx-react-lite";
import Text from "@components/Text";
import SizedBox from "@components/SizedBox";
import { Column, Row } from "@src/components/Flex";
import Preview from "@screens/NsScreen/Preview";
import PreviewModal from "@screens/NsScreen/PreviewModal";
import Button from "@components/Button";
import GetNameBtn from "@screens/NsScreen/GetNameBtn";
import Input from "@components/Input";
import Select from "@components/Select";
import { Anchor } from "@components/Anchor";
import Layout from "@components/Layout";

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
  @media (min-width: 1280px) {
    justify-content: stretch;
    padding: 0 24px;
  } ;
`;
const DesktopPreview = styled(Column)`
  background: #eeeeee;
  box-sizing: border-box;
  padding: 18vh 0;
  border-radius: 8px;
  display: none;
  height: 100%;
  position: relative;
  @media (min-width: 1280px) {
    display: flex;
  }
`;
const MobilePreview = styled(Column)`
  display: flex;
  @media (min-width: 1280px) {
    display: none;
  }
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
const categoriesOptions = [
  {
    title: "Waves Blue",
    key: "#0055FF",
  },
  { title: "Red", key: "#FF4940" },
  { title: "Orange", key: "#FF8D00" },
  { title: "Yellow", key: "#FFDA0B" },
  { title: "Green", key: "#00CC5F" },
  { title: "Purple", key: "#AA00FF" },
];

const HiddenPreview = styled.div`
  position: absolute;
  opacity: 0;
`;
const NsScreenImpl: React.FC<IProps> = observer(() => {
  const vm = useNsScreenVM();
  return (
    <Root>
      <Row alignItems="center" style={{ flex: 1 }}>
        <Column
          crossAxisSize="max"
          mainAxisSize="stretch"
          alignItems="center"
          justifyContent="center"
        >
          <Title style={{ background: "#a5ffc9", padding: "0 8px" }} fitContent>
            .waves
          </Title>
          <SizedBox height={8} />
          <Title fitContent>Name Service</Title>
          <SizedBox height={40} />
          <Column style={{ maxWidth: 360, width: "100%" }}>
            <Input
              onFocus={() => vm.setExistingNft(null)}
              placeholder="Enter your name"
              value={vm.name}
              suffix=".waves"
              onChange={(e) => vm.setName(e.target.value)}
            />
            <SizedBox height={16} />

            <Select
              options={categoriesOptions}
              selected={vm.bg}
              placeholder="Select background color"
              onSelect={(v) => vm.setBg(v)}
            />
            <SizedBox height={40} />
            <GetNameBtn />
          </Column>
          <SizedBox height={30} />
          <Anchor href="https://t.me/meedus_nft">
            <Text weight={700} fitContent size="medium">
              What is .waves name?
            </Text>
          </Anchor>
        </Column>
        <DesktopPreview
          crossAxisSize="max"
          alignItems="center"
          mainAxisSize="stretch"
        >
          <Text
            weight={700}
            style={{
              position: "absolute",
              top: 24,
              left: 24,
              fontSize: 32,
              lineHeight: "40px",
            }}
            fitContent
          >
            Preview
          </Text>
          {vm.existingNft != null && (
            <Anchor href={`https://puzzlemarket.org/nft/${vm.existingNft?.id}`}>
              <Button
                style={{ position: "absolute", top: 24, right: 24 }}
                size="medium"
                fitContent
              >
                View on Puzzle Market
              </Button>
            </Anchor>
          )}
          <Preview />
        </DesktopPreview>
      </Row>
      <MobilePreview>
        <Button kind="secondary" onClick={() => vm.setPreviewModalOpened(true)}>
          Check preview
        </Button>
      </MobilePreview>
      <PreviewModal
        visible={vm.previewModalOpened}
        onClose={() => vm.setPreviewModalOpened(false)}
      />
      <HiddenPreview>
        <Preview id="hidden-preview" />
      </HiddenPreview>
    </Root>
  );
});

const NsScreen = () => (
  <NsScreenVMProvider>
    <Layout>
      <NsScreenImpl />
    </Layout>
  </NsScreenVMProvider>
);

export default NsScreen;

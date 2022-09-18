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
import { Anchor } from "@components/Anchor";
import Preview, { labelColorMap } from "@screens/NsScreen/Preview";
import PreviewModal from "@screens/NsScreen/PreviewModal";
import Button from "@components/Button";
import GetNameBtn from "@screens/NsScreen/GetNameBtn";
import Input from "@components/Input";
import Select from "@components/Select";

interface IProps {}

const Root = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  height: 100%;
  box-sizing: border-box;
  padding: 0 16px;
  width: 100%;
  max-width: calc(1160px + 32px);
  margin-top: 40px;
  @media (min-width: 768px) {
    padding: 0 24px;
  }
`;
const DesktopPreview = styled(Column)`
  display: none;
  @media (min-width: 768px) {
    display: flex;
  }
`;
const MobilePreview = styled(Column)`
  display: flex;
  @media (min-width: 768px) {
    display: none;
  }
`;
const Title = styled(Text)`
  border-radius: 8px;
  padding: 0 8px;

  font-weight: 700;
  font-size: 40px;
  line-height: 48px;
  @media (min-width: 768px) {
    font-size: 56px;
    line-height: 64px;
  }
`;
const categoriesOptions = [
  { title: "All categories", key: "all" },
  {
    title: "Global coins",
    key: "global",
  },
  { title: "Stablecoins", key: "stable" },
  { title: "Waves DeFi", key: "defi" },
  { title: "Waves Ducks", key: "duck" },
];
const NsScreenImpl: React.FC<IProps> = observer(() => {
  const vm = useNsScreenVM();
  return (
    <>
      <Root>
        <Row alignItems="center" justifyContent="center">
          <Column
            style={{ border: "1px solid #000" }}
            crossAxisSize="max"
            mainAxisSize="stretch"
            alignItems="center"
            justifyContent="center"
          >
            <Title
              style={{ background: "#a5ffc9", padding: "0 8px" }}
              fitContent
            >
              .waves
            </Title>
            <SizedBox height={8} />
            <Title fitContent>Name Service</Title>
            <SizedBox height={40} />
            <Input
              // style={{ width: 210 }}
              placeholder="Enter your name"
              value={vm.name}
              onChange={(e) => vm.setName(e.target.value)}
            />
            <SizedBox height={16} />
            {/*<Select*/}
            {/*  placeholder="A simple select component"*/}
            {/*  // value={vm.color}*/}
            {/*  onChange={(e) => vm.setColor(e.target.value)}*/}
            {/*>*/}
            {/*  {Object.keys(labelColorMap).map((color) => (*/}
            {/*    <option value={color} key={color}>*/}
            {/*      {color}*/}
            {/*    </option>*/}
            {/*  ))}*/}
            {/*</Select>*/}

            <Select
              options={categoriesOptions}
              selected={categoriesOptions[vm.colorIndex]}
              onSelect={({ key }) => {
                const index = categoriesOptions.findIndex((o) => o.key === key);
                // vm.setTokenCategoryFilter(index);
              }}
            />
            {/*<input placeholder="Select a color of your background" />*/}
            <SizedBox height={16} />
            {/*Enter the name*/}
            {/*Set the background color*/}
            {/*Buy for 15 WAVES*/}
            {/*Name is already taken*/}
            <GetNameBtn />
            <SizedBox height={8} />
            <Anchor>What is .waves name?</Anchor>
          </Column>
          <DesktopPreview
            crossAxisSize="max"
            alignItems="center"
            mainAxisSize="stretch"
          >
            <Text fitContent>Preview</Text>
            <Preview />
          </DesktopPreview>
        </Row>
        <MobilePreview>
          <Button
            kind="secondary"
            onClick={() => vm.setPreviewModalOpened(true)}
          >
            Check preview
          </Button>
        </MobilePreview>
      </Root>
      <PreviewModal
        visible={vm.previewModalOpened}
        onClose={() => vm.setPreviewModalOpened(false)}
      />
    </>
  );
});

const NsScreen = () => (
  <NsScreenVMProvider>
    <NsScreenImpl />
  </NsScreenVMProvider>
);

export default NsScreen;

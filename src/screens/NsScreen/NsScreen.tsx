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
interface IProps {}

const Root = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
  padding: 0 16px;
  width: 100%;
  max-width: calc(1160px + 32px);
  @media (min-width: 768px) {
    padding: 0 24px;
  }
`;

const NsScreenImpl: React.FC<IProps> = observer(() => {
  const vm = useNsScreenVM();
  return (
    <Root>
      <Row alignItems="center">
        <Column
          style={{ border: "1px solid #000" }}
          crossAxisSize="max"
          mainAxisSize="stretch"
          alignItems="center"
          justifyContent="center"
        >
          <Text fitContent>.waves</Text>
          <Text fitContent>Name Service</Text>
          <SizedBox height={8} />
          <input
            style={{ width: 210 }}
            placeholder="Enter your name"
            value={vm.name}
            onChange={(e) => vm.setName(e.target.value)}
          />
          <SizedBox height={8} />
          <select
            style={{ width: 210 }}
            placeholder="A simple select component"
            value={vm.color}
            onChange={(e) => vm.setColor(e.target.value)}
          >
            {Object.keys(labelColorMap).map((color) => (
              <option value={color} key={color}>
                {color}
              </option>
            ))}
          </select>
          {/*<input placeholder="Select a color of your background" />*/}
          <SizedBox height={16} />
          {/*Enter the name*/}
          {/*Set the background color*/}
          {/*Buy for 15 WAVES*/}
          {/*Name is already taken*/}
          <button onClick={vm.mint}>Get this .waves name</button>
          <SizedBox height={8} />
          <Anchor>What is .waves name?</Anchor>
        </Column>
        <Column
          style={{ border: "1px solid #000" }}
          crossAxisSize="max"
          alignItems="center"
          mainAxisSize="stretch"
        >
          <Text fitContent>Preview</Text>
          <div style={{ borderRadius: 8, overflow: "hidden" }}>
            <Preview />
          </div>
        </Column>
      </Row>
    </Root>
  );
});

const NsScreen = () => (
  <NsScreenVMProvider>
    <NsScreenImpl />
  </NsScreenVMProvider>
);

export default NsScreen;

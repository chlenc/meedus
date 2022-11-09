import styled from "@emotion/styled";
import React from "react";
import Text from "@components/Text";
import { Column, Row } from "@src/components/Flex";
import Button from "@components/Button";
import SizedBox from "@components/SizedBox";

interface IProps {}

const Root = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;
const MyBids: React.FC<IProps> = () => {
  const bids = [{}];
  return (
    <Root>
      <Row justifyContent="space-between">
        <Text size="large" weight={700} fitContent>
          My bids
        </Text>
        <Row mainAxisSize="fit-content" alignItems="center">
          <Text fitContent weight={700} size="big">
            Backup
          </Text>
          <SizedBox width={44} />
          <Text fitContent weight={700} size="big">
            Restore
          </Text>
          <SizedBox width={44} />
          <Button fitContent kind="secondary">
            Claim All
          </Button>
        </Row>
      </Row>
      <SizedBox height={24} />
      <Column></Column>
    </Root>
  );
};
export default MyBids;

import styled from "@emotion/styled";
import { Column, Row } from "@src/components/Flex";
import React from "react";
import Text from "@components/Text";
import SizedBox from "@components/SizedBox";
import { IDappResponse } from "@src/services/wavescapService";
import BN from "@src/utils/BN";
import { Anchor } from "@components/Anchor";

interface IProps extends IDappResponse {}

const Root = styled(Anchor)`
  display: flex;
  flex-direction: column;
  width: 100%;
  background: #1f1e25;
  border-radius: 8px;
  cursor: pointer;
  text-decoration: none;
  outline: none;
`;

const Logo = styled.img`
  width: 32px;
  height: 32px;
  min-width: 32px;
  padding: 2px;
  border-radius: 50%;
  margin-left: -8px;
  border: 1px solid #1f1e25;
`;

const Container = styled(Row)`
  padding: 16px;
  box-sizing: border-box;
  @media (min-width: 768px) {
    padding: 16px 24px;
  }
`;

const StatisticsContainer = styled(Container)`
  border-top: 1px solid #0b0b0d;
`;

const DappCard: React.FC<IProps> = (props) => {
  const tvl = new BN(props.totals["usd-n"]);
  const volume = new BN(props["volume_7d_usd-n"]);
  const users = new BN(props.unique_interacting_addresses_7d);
  return (
    <Root href={props.url}>
      <Container justifyContent="space-between">
        <Logo src={props.logo} alt={props.name} />
        <SizedBox width={8} />
        <Column crossAxisSize="max">
          <Text>{props.name}</Text>
          <Row>
            {props.tags.map((tag, i) => (
              <Text fitContent key={i} size="small" type="purple">
                {i !== 0 ? <>,&nbsp;</> : null}
                {tag}
              </Text>
            ))}
          </Row>
        </Column>
      </Container>
      <StatisticsContainer>
        <Column style={{ flex: 1 }}>
          <Text size="small" style={{ color: "#747489" }}>
            TVL
          </Text>
          <Text>${tvl.toFormat(0)}&nbsp;</Text>
        </Column>
        <Column style={{ flex: 1 }}>
          <Text size="small" style={{ color: "#747489" }}>
            Volume 7d
          </Text>
          <Text>${volume.toFormat(0)}&nbsp;</Text>
        </Column>
        <Column style={{ flex: 1 }}>
          <Text size="small" style={{ color: "#747489" }}>
            Users 7d
          </Text>
          <Text>{users.toFormat(0)}&nbsp;</Text>
        </Column>
      </StatisticsContainer>
    </Root>
  );
};
export default DappCard;

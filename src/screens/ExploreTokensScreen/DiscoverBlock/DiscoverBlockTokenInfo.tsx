import { Row } from "@src/components/Flex";
import Text from "@src/components/Text";
import React from "react";
import SizedBox from "@components/SizedBox";
import styled from "@emotion/styled";
import Skeleton from "react-loading-skeleton";

interface IProps {
  num: number;
  name: string;
  symbol: string;
  logo: string;
  value: string;
  valueColor?: string;
}

const Icon = styled.img`
  width: 24px;
  height: 24px;
  border-radius: 50%;
  min-width: 24px;
`;
const DiscoverBlockTokenInfo: React.FC<IProps> = ({
  num,
  name,
  value,
  logo,
  symbol,
  valueColor,
}) => {
  return (
    <Row justifyContent="space-between" alignItems="center">
      <Row mainAxisSize="fit-content" alignItems="center">
        <Text type="secondary" fitContent>
          {num}
        </Text>
        <SizedBox width={8} />
        <Icon src={logo} />
        <SizedBox width={8} />
        <Row style={{ flexWrap: "wrap" }}>
          <Text
            nowrap
            weight={500}
            fitContent
            style={{
              maxWidth: 170,
              textOverflow: "ellipsis",
              overflow: "hidden",
            }}
          >
            {name}
          </Text>
          <SizedBox width={8} />
          <Text nowrap fitContent type="secondary">
            {symbol}
          </Text>
        </Row>
      </Row>
      <Text
        weight={500}
        fitContent
        style={{ flexWrap: "wrap", color: valueColor }}
      >
        {value}
      </Text>
    </Row>
  );
};

export const DiscoverBlockTokenInfoSkeleton: React.FC<{ num: number }> = ({
  num,
}) => (
  <Row justifyContent="space-between" alignItems="center">
    <Row mainAxisSize="fit-content" alignItems="center">
      <Text type="secondary" fitContent>
        {num}
      </Text>
      <SizedBox width={8} />
      <Skeleton baseColor="#A2A2C0" circle width={24} height={24} />
      <SizedBox width={8} />
      <Skeleton baseColor="#A2A2C0" width={110} height={14} />
    </Row>
    <Skeleton baseColor="#A2A2C0" width={60} height={14} />
  </Row>
);

export default DiscoverBlockTokenInfo;

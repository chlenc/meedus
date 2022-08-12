import styled from "@emotion/styled";
import { Column, Row } from "@src/components/Flex";
import React from "react";
import { TOKEN_LOGO_BY_ASSET_ID } from "@src/constants";
import SizedBox from "@components/SizedBox";
import Text from "@components/Text";

interface IProps {
  asset: {
    assetId: string;
    name: string;
    symbol: string;
  };
}

const Icon = styled.img`
  width: 32px;
  height: 32px;
  min-width: 32px;
  border-radius: 50% !important;
`;

const TokenLogoAndName: React.FC<IProps> = ({ asset }) => {
  return (
    <Row>
      <Row>
        <Icon src={TOKEN_LOGO_BY_ASSET_ID[asset.assetId]} />
        <SizedBox width={8} />
        <Row>
          <Column mainAxisSize="stretch">
            <Text>{asset.name}</Text>
            <Text type="secondary" size="small">
              {asset.symbol}
            </Text>
          </Column>
        </Row>
      </Row>
    </Row>
  );
};
export default TokenLogoAndName;

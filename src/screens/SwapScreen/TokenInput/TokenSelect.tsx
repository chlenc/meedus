import styled from "@emotion/styled";
import React from "react";
import { ReactComponent as ArrowRight } from "@src/assets/icons/arrowRightBorderless.svg";
import { Row } from "@components/Flex";
import { TOKEN_LOGO_BY_ASSET_ID } from "@src/constants";
import { TTokenStatistics } from "@stores/TokenStore";
import Skeleton from "react-loading-skeleton";

interface IProps {
  assetStats?: TTokenStatistics;
}

const Root = styled.div`
  display: flex;
  align-items: center;
  height: 40px;
  max-width: 160px;
  width: 100%;
  padding: 8px;
  background: #0b0b0d;
  border-radius: 20px;
  box-sizing: border-box;
`;

const TokenName = styled.div`
  font-style: normal;
  font-weight: 500;
  font-size: 14px;
  line-height: 20px;
  color: #ffffff;
`;

const TokenIcon = styled.img`
  border-radius: 50%;
  margin-right: 8px;
  width: 26px;
  height: 26px;
  background-color: #ffffff;
  padding: 2px;
  box-sizing: border-box;
`;

const ArrowDownIcon = styled(ArrowRight)`
  transform: rotate(90deg);
  justify-self: flex-end;
  margin-right: 12px;
  width: 16px;
  height: 16px;
`;

const TokenSelect: React.FC<IProps> = ({ assetStats }) => {
  return (
    <Root>
      <Row alignItems="center">
        {assetStats != null && TOKEN_LOGO_BY_ASSET_ID[assetStats.assetId] ? (
          <TokenIcon src={TOKEN_LOGO_BY_ASSET_ID[assetStats.assetId]} />
        ) : (
          <Skeleton baseColor="#A2A2C0" circle width={26} height={26} />
        )}
        <TokenName>{assetStats?.symbol}</TokenName>
      </Row>
      <ArrowDownIcon />
    </Root>
  );
};
export default TokenSelect;

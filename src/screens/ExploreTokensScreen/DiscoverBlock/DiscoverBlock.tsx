import styled from "@emotion/styled";
import React from "react";
import Text from "@components/Text";
import SizedBox from "@components/SizedBox";
import { Row } from "@src/components/Flex";
import { observer } from "mobx-react-lite";
import { useExploreScreenVM } from "@screens/ExploreTokensScreen/ExploreScreenVm";
import TokenInfo, {
  DiscoverBlockTokenInfoSkeleton,
} from "./DiscoverBlockTokenInfo";
import { TOKEN_LOGO_BY_ASSET_ID } from "@src/constants";
interface IProps {}

const Root = styled.div`
  display: flex;
  flex-direction: column;
  background: #1f1e25;
  border-radius: 0 0 24px 24px;
  box-sizing: border-box;
  padding: 16px;
  overflow: hidden;
  @media (min-width: 768px) {
    padding: 32px;
    border-radius: 24px;
  }
`;

const Title = styled(Text)`
  font-weight: 600;
  font-size: 26px;
  line-height: 34px;
  color: #ffffff;
`;

const SubTitle = styled(Text)`
  font-weight: 500;
  font-size: 14px;
  line-height: 20px;
  color: #a2a2c0;
`;

const Card = styled.div`
  box-sizing: border-box;
  padding: 16px;
  background: #2a2a32;
  border-radius: 16px;
`;

const TokensContainer = styled.div`
  & > * {
    margin-top: 16px;
  }
  & > :first-of-type {
    margin-top: 24px;
  }
`;

const StyledCard = styled(Card)`
  flex: 3;
`;

const CardsContainer = styled(Row)`
  overflow-x: auto;
  overflow-y: scroll;
  -ms-overflow-style: none;
  scrollbar-width: none;
  & > * {
    width: calc((100% - 64px) / 3);
    min-width: 304px;
    margin-right: 16px;
    flex: 1;
    flex-shrink: 0;
  }
  align-items: stretch;
  & > :last-of-type {
    margin-right: 0;
  }
  @media (min-width: 768px) {
    & > * {
      width: 100%;
    }
  }

  @media (max-width: 1056px) {
    margin-left: -16px;
    width: calc(100% + 32px);
    & > :first-of-type {
      margin-left: 16px;
    }
    & > :last-of-type {
      margin-right: 16px;
    }
  }
  @media (max-width: 1056px) and (min-width: 768px) {
    margin-left: -32px;
    width: calc(100% + 64px);
    & > :first-of-type {
      margin-left: 32px;
    }
    & > :last-of-type {
      margin-right: 32px;
    }
  }
`;

const DiscoverBlock: React.FC<IProps> = () => {
  const vm = useExploreScreenVM();
  return (
    <Root>
      <Title>Discover cryptocurrencies of Waves ecosystem</Title>
      <SizedBox height={8} />
      <SubTitle>
        No need to find coins on different services. We've gathered all the
        required info in one place.
      </SubTitle>
      <SizedBox height={24} />
      <CardsContainer>
        <StyledCard>
          <Row>
            <Text size="big">Recently added</Text>
          </Row>
          <TokensContainer>
            {vm.recentlyAdded.length > 0
              ? vm.recentlyAdded.map((v, index) => (
                  <TokenInfo
                    name={v.name}
                    key={v.assetId}
                    num={index + 1}
                    value={`$${v.currentPrice.toFormat(2)}`}
                    logo={TOKEN_LOGO_BY_ASSET_ID[v.assetId]}
                    symbol={v.symbol}
                  />
                ))
              : Array.from({ length: 3 }, (_, i) => (
                  <DiscoverBlockTokenInfoSkeleton num={i} key={i} />
                ))}
          </TokensContainer>
        </StyledCard>
        <StyledCard>
          <Text size="big">Biggest gainers</Text>
          <TokensContainer>
            {vm.top3Gainers.length > 0
              ? vm.top3Gainers.map((v, index) => (
                  <TokenInfo
                    name={v.name}
                    key={v.assetId}
                    num={index + 1}
                    value={`${v.change24H.toFormat(2)}%`}
                    logo={TOKEN_LOGO_BY_ASSET_ID[v.assetId]}
                    valueColor={v.change24H.gte(0) ? "#7CE34F" : "#E34744"}
                    symbol={v.symbol}
                  />
                ))
              : Array.from({ length: 3 }, (_, i) => (
                  <DiscoverBlockTokenInfoSkeleton num={i} key={i} />
                ))}
          </TokensContainer>
        </StyledCard>
        <StyledCard>
          <Text size="big">Biggest loosers</Text>
          <TokensContainer>
            {vm.top3Losers.length > 0
              ? vm.top3Losers.map((v, index) => (
                  <TokenInfo
                    name={v.name}
                    key={v.assetId}
                    num={index + 1}
                    value={`${v.change24H.toFormat(2)}%`}
                    valueColor={v.change24H.gte(0) ? "#7CE34F" : "#E34744"}
                    logo={TOKEN_LOGO_BY_ASSET_ID[v.assetId]}
                    symbol={v.symbol}
                  />
                ))
              : Array.from({ length: 3 }, (_, i) => (
                  <DiscoverBlockTokenInfoSkeleton num={i} key={i} />
                ))}
          </TokensContainer>
        </StyledCard>
      </CardsContainer>
    </Root>
  );
};
export default observer(DiscoverBlock);

import styled from "@emotion/styled";
import React from "react";
import { Column, Row } from "@components/Flex";
import SizedBox from "@components/SizedBox";
import Text from "@components/Text";
import { assetPriceFormat } from "@src/utils/assetPriceFormat";
import { observer } from "mobx-react-lite";
import Button from "@components/Button";
import TokenLogoAndName from "@screens/ExploreTokensScreen/TokensTable/TokenLogoAndName";
import { useExploreScreenVM } from "@screens/ExploreTokensScreen/ExploreScreenVm";
import SortIcon from "@screens/ExploreTokensScreen/TokensTable/SortIcon";
import Divider from "@components/Divider";

interface IProps {}

const TokenTableRow = styled(Row)`
  padding: 12px 16px;
  box-sizing: border-box;
  width: 100%;
  transition: 0.4s;
  justify-content: space-between;
`;

const StyledDivider = styled(Divider)`
  width: calc(100% - 56px);
  margin-left: 56px;
`;

const FilterButton = styled(Button)`
  background: #1f1e25;
  border-radius: 20px;
  height: 40px;
  padding: 0 16px;
`;

const FiltersContainer = styled(Row)`
  padding: 16px 0;
  box-sizing: border-box;
  max-width: 100%;
  overflow-y: scroll;
  -ms-overflow-style: none;
  scrollbar-width: none;
  & > * {
    margin-right: 8px;
  }
`;

const MobileTokensTable: React.FC<IProps> = () => {
  const vm = useExploreScreenVM();
  return (
    <Column crossAxisSize="max">
      <FiltersContainer>
        <SizedBox width={12} />
        {/*<FilterButton style={{ padding: 8 }}>*/}
        {/*  <SearchIcon />*/}
        {/*</FilterButton>*/}
        <FilterButton onClick={() => vm.selectSort("price")}>
          Price&nbsp; <SortIcon sort="price" />
        </FilterButton>
        <FilterButton onClick={() => vm.selectSort("change")}>
          Change&nbsp; <SortIcon sort="change" />
        </FilterButton>
        <FilterButton onClick={() => vm.selectSort("volume")}>
          Volume&nbsp; <SortIcon sort="volume" />
        </FilterButton>
        <SizedBox width={12} />
      </FiltersContainer>
      {vm.sortedStats.map((asset) => (
        <React.Fragment key={asset.assetId}>
          <TokenTableRow>
            <TokenLogoAndName asset={asset} />
            <Column>
              <Text nowrap style={{ textAlign: "right" }}>
                ${assetPriceFormat(asset.currentPrice, asset.decimals)}
              </Text>
              <Text
                nowrap
                type={asset.change24H.gte(0) ? "success" : "error"}
                style={{ textAlign: "right" }}
              >
                {asset.changeStr}
              </Text>
            </Column>
          </TokenTableRow>
          <StyledDivider />
        </React.Fragment>
      ))}
    </Column>
  );
};
export default observer(MobileTokensTable);

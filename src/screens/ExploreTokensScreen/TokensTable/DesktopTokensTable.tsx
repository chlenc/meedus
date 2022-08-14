import styled from "@emotion/styled";
import React from "react";
import { Column, Row } from "@components/Flex";
import Text from "@components/Text";
import { observer } from "mobx-react-lite";
import TokenLogoAndName from "@screens/ExploreTokensScreen/TokensTable/TokenLogoAndName";
import { assetPriceFormat } from "@src/utils/assetPriceFormat";
import { useExploreScreenVM } from "@screens/ExploreTokensScreen/ExploreScreenVm";
import SortIcon from "@screens/ExploreTokensScreen/TokensTable/SortIcon";
import SearchInput from "@components/SearchInput";
import SizedBox from "@components/SizedBox";

interface IProps {}

// const FilterButton = styled.button`
//   display: flex;
//   align-items: center;
//   background: #1f1e25;
//   border-radius: 20px;
//   height: 40px;
//   padding: 0 16px;
//   color: #ffffff;
//   border: none;
//   box-shadow: none;
//   outline: none;
// `;

const FiltersContainer = styled(Row)`
  //padding: 24px 0;
  box-sizing: border-box;
  & > * {
    margin-right: 8px;
  }
`;

const Table = styled.table`
  text-align: left;
  border-spacing: 0;
  width: 100%;
  th,
  td {
    padding: 10px 24px;
  }

  tr {
    transition: 0.4s;
    & :first-of-type {
      border-radius: 16px 0 0 16px;
    }
    & :last-of-type {
      border-radius: 0 16px 16px 0;
    }
  }

  tr:hover {
    background: #1f1e25;
  }

  thead {
    height: 64px;
    & > tr > th {
      padding: 22px 24px;
      background: #1f1e25;
    }
  }
`;

const TableHeadRow = styled(Row)`
  max-width: fit-content;
  cursor: pointer;
`;

const DesktopTokensTable: React.FC<IProps> = () => {
  const vm = useExploreScreenVM();
  return (
    <Column crossAxisSize="max">
      <SizedBox height={24} />
      <Row justifyContent="space-between">
        <FiltersContainer>
          {/*<FilterButton>Category</FilterButton>*/}
          {/*<FilterButton>Price</FilterButton>*/}
          {/*<FilterButton>Volume</FilterButton>*/}
        </FiltersContainer>

        <SearchInput value={vm.search} onChange={vm.setSearch} />
      </Row>
      <SizedBox height={24} />
      <Table>
        <thead>
          <tr>
            <th>
              <Text type="secondary">Token name</Text>
            </th>
            <th>
              <TableHeadRow onClick={() => vm.selectSort("price")}>
                <Text type="secondary">Price</Text>&nbsp;{" "}
                <SortIcon sort="price" />
              </TableHeadRow>
            </th>
            <th>
              <TableHeadRow onClick={() => vm.selectSort("change")}>
                <Text type="secondary">Change (24h)</Text>&nbsp;{" "}
                <SortIcon sort="change" />
              </TableHeadRow>
            </th>
            <th>
              <TableHeadRow onClick={() => vm.selectSort("volume")}>
                <Text type="secondary">Volume (24h)</Text>&nbsp;{" "}
                <SortIcon sort="volume" />
              </TableHeadRow>
            </th>
            <th>
              <Text type="secondary">Circulataing supply</Text>
            </th>
          </tr>
        </thead>
        <tbody>
          {vm.sortedStats.map((asset) => (
            <tr key={asset.assetId}>
              <th>
                <TokenLogoAndName asset={asset} />
              </th>
              <th>
                <Text>
                  ${assetPriceFormat(asset.currentPrice, asset.decimals)}
                </Text>
              </th>
              <th>
                <Text type={asset.change24H.gte(0) ? "success" : "error"}>
                  {asset.changeStr}
                </Text>
              </th>
              <th>
                <Text>${asset.volume24.toFormat(2)}</Text>
              </th>
              <th>
                <Column>
                  <Text>${asset.circulatingSupply.toFormat(2)}</Text>
                  <Text size="small" type="secondary">
                    {asset.circulatingSupply
                      .times(asset.currentPrice)
                      .toFormat(2)}
                    &nbsp;{asset.symbol}
                  </Text>
                </Column>
              </th>
            </tr>
          ))}
        </tbody>
      </Table>
    </Column>
  );
};
export default observer(DesktopTokensTable);

import styled from "@emotion/styled";
import React from "react";
import { ReactComponent as JustSortIcon } from "@src/assets/icons/sort.svg";
import { ReactComponent as SortDescendingIcon } from "@src/assets/icons/sortDescending.svg";
import {
  TSortType,
  useExploreScreenVM,
} from "@screens/ExploreTokensScreen/ExploreScreenVm";

interface IProps {
  sort?: TSortType;
}

const SortAscendingIcon = styled(SortDescendingIcon)`
  transform: rotate(180deg);
`;

const SortIcon: React.FC<IProps> = ({ sort }) => {
  const vm = useExploreScreenVM();
  return (
    <>
      {vm.sort === sort && vm.sortMode === "ascending" && (
        <SortAscendingIcon style={{ minWidth: 12 }} />
      )}
      {vm.sort === sort && vm.sortMode === "descending" && (
        <SortDescendingIcon style={{ minWidth: 12 }} />
      )}
      {vm.sort !== sort && <JustSortIcon style={{ minWidth: 12 }} />}
    </>
  );
};
export default SortIcon;

import React from "react";
import MobileTokensTable from "@screens/ExploreScreen/TokensTable/MobileTokensTable";
import useWindowSize from "@src/hooks/useWindowSize";
import DesktopTokensTable from "@screens/ExploreScreen/TokensTable/DesktopTokensTable";

interface IProps {}

const TokensTable: React.FC<IProps> = () => {
  const { width } = useWindowSize();
  return width && width > 900 ? <DesktopTokensTable /> : <MobileTokensTable />;
};
export default TokensTable;

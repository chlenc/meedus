import styled from "@emotion/styled";
import React from "react";
import { Row } from "@components/Flex";
import TokenSelect from "./TokenSelect";
import BigNumberInput from "@screens/SwapScreen/BigNumberInput";
import BN from "@src/utils/BN";
import AmountInput from "./AmountInput";
import SizedBox from "@components/SizedBox";
import { TTokenStatistics } from "@stores/TokenStore";

interface IProps {
  divided?: boolean;
  value: BN;
  setValue?: (v: BN) => void;
  assetStats?: TTokenStatistics;
}

const Root = styled.div`
  display: flex;
  flex-direction: column;
`;
const Divider = styled.div`
  width: 100%;
  height: 1px;
  background: #0b0b0d;
  box-sizing: border-box;
  margin: 8px 0;
`;
const TokenInput: React.FC<IProps> = ({
  value,
  setValue,
  assetStats,
  divided,
}) => {
  return (
    <Root>
      <Row alignItems="center" justifyContent="space-between">
        <TokenSelect assetStats={assetStats} />
        <SizedBox width={8} />
        <BigNumberInput
          decimals={assetStats?.decimals ?? 8}
          renderInput={(props, ref) => (
            <AmountInput {...props} readOnly={setValue == null} ref={ref} />
          )}
          value={value}
          onChange={setValue != null ? setValue : () => null}
          readonly={setValue == null}
        />
      </Row>
      {divided ? <Divider /> : <SizedBox height={8} />}
    </Root>
  );
};
export default TokenInput;

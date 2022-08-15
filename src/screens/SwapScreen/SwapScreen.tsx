import styled from "@emotion/styled";
import React from "react";
import TokenInput from "./TokenInput";
import SwapFromTo from "@screens/SwapScreen/SwapFromTo";
import Button from "@components/Button";
import { Column, Row } from "@src/components/Flex";
import SizedBox from "@components/SizedBox";
import Text from "@components/Text";
import Divider from "@src/components/Divider";
import {
  SwapScreenVMProvider,
  useSwapScreenVM,
} from "@screens/SwapScreen/SwapScreenVm";
import { observer } from "mobx-react-lite";
import BN from "@src/utils/BN";
import Tooltip from "@components/Tooltip";

interface IProps {}

const Root = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
  padding: 0 16px;
  width: 100%;
  max-width: calc(1160px + 32px);
  @media (min-width: 768px) {
    padding: 0 24px;
  }
`;

const SwapForm = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 560px;
  background: #1f1e25;
  border-radius: 8px;
  width: 100%;
`;
const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding: 32px;
`;
const Balance = styled.div`
  display: flex;
  justify-content: space-between;
  font-style: normal;
  font-weight: 500;
  font-size: 12px;
  line-height: 16px;
  color: #79787d;

  .balance-selector {
    white-space: nowrap;
    display: flex;
    flex-direction: column;

    @media (min-width: 768px) {
      flex-direction: row;
    }
  }
`;

const DetailsContainer = styled(Column)`
  max-width: 560px;
  width: 100%;
`;

const SwapButton = styled(Button)`
  height: 56px;
  width: 100%;
  border-radius: 0 0 8px 8px;
`;

const PercentButton = styled(Text)`
  font-weight: 500;
  font-size: 12px;
  line-height: 16px;
  color: #666de3;
  margin-right: 8px;
`;

const percents = ["25%", "50%", "75%", "100%"];

const SwapScreenImpl: React.FC<IProps> = observer(() => {
  const vm = useSwapScreenVM();
  return (
    <Root>
      <SwapForm>
        <Wrapper>
          <TokenInput
            assetStats={vm.asset0Stats}
            value={vm.asset0Value}
            setValue={vm.setAsset0Value}
            divided
          />
          <Balance>
            <div className="balance-selector">
              <div>Balance: –</div>
              <SizedBox width={8} />
              <Row>
                {percents.map((p) => (
                  <PercentButton key={p}>{p}</PercentButton>
                ))}
              </Row>
            </div>
            <div>{/*~ $69,682.0*/}</div>
          </Balance>
          <SwapFromTo
            fromValue="1"
            fromSymbol={vm.asset0Stats?.symbol ?? ""}
            toValue={vm.asset0Stats?.currentPrice.toFormat(2) ?? "–"}
            toSymbol={vm.asset1Stats?.symbol ?? ""}
          />
          <TokenInput
            assetStats={vm.asset1Stats}
            value={vm.asset1Value}
            divided
          />
          <Balance>
            <div>Balance: –</div>
            <div>{/*~ $69,694.0*/}</div>
          </Balance>
        </Wrapper>
        <Tooltip content={<Text>Coming soon</Text>}>
          <SwapButton>Swap</SwapButton>
        </Tooltip>
      </SwapForm>
      <SizedBox height={32} />
      <DetailsContainer>
        <Row justifyContent="space-between">
          <Text style={{ color: "#79787D" }}>Swap fee</Text>
          <Text fitContent nowrap>
            0.1%
          </Text>
        </Row>
        <Divider style={{ margin: "8px 0" }} />{" "}
        <Row justifyContent="space-between">
          <Text style={{ color: "#79787D" }}>Price impact</Text>
          <Text fitContent nowrap>
            0%
          </Text>
        </Row>
        <Divider style={{ margin: "8px 0" }} />
        <Row justifyContent="space-between">
          <Text style={{ color: "#79787D" }}>Minimum to receive</Text>
          <Text fitContent nowrap>
            {BN.formatUnits(vm.asset1Value, vm.asset1Stats?.decimals).toFormat(
              2
            )}
            &nbsp;{vm.asset1Stats?.symbol}
          </Text>
        </Row>
      </DetailsContainer>
    </Root>
  );
});

const SwapScreen = () => (
  <SwapScreenVMProvider>
    <SwapScreenImpl />
  </SwapScreenVMProvider>
);

export default SwapScreen;

import styled from "@emotion/styled";
import React from "react";
import {
  AuctionScreenVMProvider,
  useAuctionScreenVM,
} from "@screens/AuctionScreen/AuctionScreenVm";
import { observer } from "mobx-react-lite";
import Text from "@components/Text";
import SizedBox from "@components/SizedBox";
import { Column, Row } from "@src/components/Flex";
import Preview from "@components/Preview";
import PreviewModal from "@screens/AuctionScreen/PreviewModal";
import Button from "@components/Button";
import Input from "@components/Input";
import { Anchor } from "@components/Anchor";
import Layout from "@components/Layout";
import { useParams } from "react-router-dom";
import { BADGE_COLORS } from "@src/constants";
import BigNumberInput from "@components/BigNumberInput";
import PlaceBidButton from "@screens/AuctionScreen/PlaceBidButton";

interface IProps {}

const Root = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  box-sizing: border-box;
  padding: 0 16px;
  height: 100%;
  width: 100%;
  min-height: calc(100vh - 150px);
  max-width: calc(1160px + 32px);
  position: relative;
  @media (min-width: 1280px) {
    justify-content: stretch;
    padding: 0 24px;
  } ;
`;
const DesktopPreview = styled(Column)`
  background: #eeeeee;
  box-sizing: border-box;
  padding: 18vh 0;
  border-radius: 8px;
  display: none;
  height: 100%;
  position: relative;
  @media (min-width: 1280px) {
    display: flex;
  }
`;
const MobilePreview = styled(Column)`
  display: flex;
  @media (min-width: 1280px) {
    display: none;
  }
`;
const Title = styled(Text)`
  border-radius: 8px;
  padding: 0 8px;
  white-space: nowrap;
  font-weight: 700;
  font-size: 40px;
  line-height: 48px;
  @media (min-width: 480px) {
    font-size: 56px;
    line-height: 64px;
  }
`;

const HiddenPreview = styled.div`
  position: absolute;
  opacity: 0;
  z-index: -1;
`;
const AuctionScreenImpl: React.FC<IProps> = observer(() => {
  const vm = useAuctionScreenVM();
  return (
    <Root>
      <Row alignItems="center" style={{ flex: 1 }}>
        <Column
          crossAxisSize="max"
          mainAxisSize="stretch"
          alignItems="center"
          justifyContent="center"
        >
          <Title style={{ background: "#a5ffc9", padding: "0 8px" }} fitContent>
            .waves
          </Title>
          <SizedBox height={8} />
          <Title fitContent>Name Service</Title>
          <SizedBox height={40} />
          <Column style={{ maxWidth: 360, width: "100%" }}>
            <Input
              onFocus={() => vm.setExistingNft(null)}
              placeholder="Enter your name"
              value={vm.name}
              suffix=".waves"
              readOnly
            />
            <SizedBox height={16} />
            <BigNumberInput
              renderInput={(props, ref) => (
                <Input
                  {...props}
                  value={props.value as string}
                  inputRef={ref}
                  suffix="WAVES"
                  placeholder="Your bid"
                />
              )}
              decimals={8}
              onChange={vm.setBid}
              value={vm.bid}
            />
            <SizedBox height={16} />
            <BigNumberInput
              renderInput={(props, ref) => (
                <Input
                  {...props}
                  value={props.value as string}
                  inputRef={ref}
                  suffix="WAVES"
                  placeholder="Deposit (optional)"
                />
              )}
              onChange={vm.setDeposit}
              value={vm.deposit}
              decimals={8}
            />
            <SizedBox height={40} />
            <PlaceBidButton />
          </Column>
          <SizedBox height={30} />
          <Anchor href="https://medium.com/@MEEDUS3/how-the-waves-namespace-auction-works-f2cfd00a6186">
            <Text weight={700} fitContent size="medium">
              How it works?
            </Text>
          </Anchor>
        </Column>
        <DesktopPreview
          crossAxisSize="max"
          alignItems="center"
          mainAxisSize="stretch"
        >
          <Text
            weight={700}
            style={{
              position: "absolute",
              top: 24,
              left: 24,
              fontSize: 32,
              lineHeight: "40px",
            }}
            fitContent
          >
            Preview
          </Text>
          {vm.existingNft != null && (
            <Anchor href={`https://puzzlemarket.org/nft/${vm.existingNft?.id}`}>
              <Button
                style={{ position: "absolute", top: 24, right: 24 }}
                size="medium"
                fitContent
              >
                View on Puzzle Market
              </Button>
            </Anchor>
          )}
          <Preview name={vm.name} bg={vm.bg} />
        </DesktopPreview>
      </Row>
      <MobilePreview>
        <Button kind="secondary" onClick={() => vm.setPreviewModalOpened(true)}>
          Check preview
        </Button>
      </MobilePreview>
      <PreviewModal
        visible={vm.previewModalOpened}
        onClose={() => vm.setPreviewModalOpened(false)}
      />
      <HiddenPreview>
        <Preview id="hidden-preview" />
      </HiddenPreview>
    </Root>
  );
});

const AuctionScreen = () => {
  const { name, bg } = useParams<{ name?: string; bg: string }>();
  const color =
    BADGE_COLORS.find(({ key }) => key === `#${bg}`) ?? BADGE_COLORS[0];
  // if (name == null) return <Navigate to={ROUTES.NAMESERVICE} />;
  return (
    <AuctionScreenVMProvider name={name ?? ""} bg={color}>
      <Layout>
        <AuctionScreenImpl />
      </Layout>
    </AuctionScreenVMProvider>
  );
};

export default AuctionScreen;

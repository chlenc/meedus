import React from "react";
import { IDialogPropTypes } from "rc-dialog/lib/IDialogPropTypes";
import Dialog from "@components/Dialog/Dialog";
import { Column } from "../Flex";
import { ReactComponent as SuccessIcon } from "@src/assets/icons/successLarge.svg";
import SizedBox from "@components/SizedBox";
import Text from "@components/Text";
import styled from "@emotion/styled";
import Button from "@components/Button";

export interface IDialogNotificationProps extends IDialogPropTypes {
  title: string;
  description?: string;
  domain?: string;
  icon?: JSX.Element;
  type?: "success" | "error" | "warning";
  buttons?: React.FC[];
  buttonsDirection?: "row" | "column";
}

const Root = styled(Column)`
  text-align: center;

  & > .title {
    font-weight: 700;
    font-size: 24px;
    line-height: 32px;
  }
`;
const Domain = styled.div`
  background: #ffdea6;
  border-radius: 4px;
  padding: 0 8px;
  font-weight: 700;
  font-size: 24px;
  line-height: 32px;
  color: #000000;
`;
const ButtonsContainer = styled.div<{ direction?: "row" | "column" }>`
  display: flex;
  flex-direction: ${({ direction }) => direction ?? "column"};
  width: 100%;
  margin: -4px;

  & > * {
    margin: 4px;
  }
`;

const DialogNotification: React.FC<IDialogNotificationProps> = ({
  title,
  description,
  icon,
  type = "success",
  buttonsDirection = "column",
  buttons = [],
  domain,
  ...rest
}) => {
  return (
    <Dialog bodyStyle={{ padding: "40px" }} {...rest}>
      <Root alignItems="center" crossAxisSize="max">
        <SizedBox height={16} />
        <>
          {icon != null ? (
            <React.Fragment>{icon}</React.Fragment>
          ) : (
            <React.Fragment>
              {type === "success" && <SuccessIcon />}
            </React.Fragment>
          )}
        </>
        <SizedBox height={8} />
        <Text className="title">{title}</Text>
        {domain && <Domain>{domain}</Domain>}
        {description && (
          <Text style={{ marginTop: 8 }} weight={500} size="medium">
            {description}
          </Text>
        )}
        <SizedBox height={16} />
        {buttons.length > 0 && (
          <ButtonsContainer style={{ flexDirection: buttonsDirection }}>
            {buttons?.map((Component, index) => (
              <Component key="index" />
            ))}
          </ButtonsContainer>
        )}
        <SizedBox height={24} />
      </Root>
    </Dialog>
  );
};
type TSuccessBidPlacement = {
  domain: string;
  onBackToBids: () => void;
  onExplorerClick: () => void;
};
export const buildSuccessBidPlacementParams = ({
  domain,
  onBackToBids,
  onExplorerClick,
}: TSuccessBidPlacement): IDialogNotificationProps => {
  return {
    title: "You’ve successfully placed a bid on",
    domain,
    description: "You can track your bids on the main page of Name Service",
    type: "success",
    buttons: [
      () => (
        <Button size="medium" onClick={onBackToBids}>
          Show My Bids
        </Button>
      ),
      () => (
        <Button size="medium" onClick={onExplorerClick} kind="secondary">
          View in Explorer
        </Button>
      ),
    ],
  };
};

type TSuccessPurchase = {
  domain: string;
  onGoMarket: () => void;
  onGoBack: () => void;
};
export const buildSuccessPurchaseParams = ({
  domain,
  onGoMarket,
  onGoBack,
}: TSuccessPurchase): IDialogNotificationProps => {
  return {
    title: "You’ve successfully purchased ",
    domain,
    description: "You can find you NFT in your wallet on Puzzle Market",
    type: "success",
    buttons: [
      () => (
        <Button size="medium" onClick={onGoMarket}>
          View in Puzzle Market
        </Button>
      ),
      () => (
        <Button size="medium" onClick={onGoBack} kind="secondary">
          Back to Name Service
        </Button>
      ),
    ],
  };
};

export default DialogNotification;

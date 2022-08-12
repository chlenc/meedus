import React from "react";
import { IDialogPropTypes } from "rc-dialog/lib/IDialogPropTypes";
import Dialog from "@components/Dialog/Dialog";
import { Column } from "../Flex";
import { ReactComponent as Success } from "@src/assets/icons/success.svg";
import SizedBox from "@components/SizedBox";
import Text from "@components/Text";
import styled from "@emotion/styled";
import { Link } from "react-router-dom";
import Button from "../Button";

export interface IDialogNotificationProps extends IDialogPropTypes {
  title?: string;
  description?: string;
  type?: "success" | "error" | "warning";
  buttons?: React.FC[];
  buttonsDirection?: "row" | "column";
}

const Root = styled(Column)`
  text-align: center;

  & > .title {
    font-weight: 500;
    font-size: 24px;
    line-height: 32px;
  }
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
  type = "success",
  buttonsDirection = "column",
  buttons = [],
  ...rest
}) => {
  return (
    <Dialog {...rest}>
      <Root alignItems="center" crossAxisSize="max">
        <SizedBox height={32} />
        {type === "success" && <Success />}

        <SizedBox height={28} />
        {title && <Text className="title">{title}</Text>}
        {description && (
          <Text style={{ marginTop: 8 }} size="medium" type="secondary">
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

type TBuildSuccessLiquidityDialogParamsProps = {
  amount: string;
};
export const buildSuccessInvestDialogParams = ({
  amount,
}: TBuildSuccessLiquidityDialogParamsProps): IDialogNotificationProps => {
  return {
    description: `${amount} were successfully invested in. You can check your investments on “My Investments” page.`,
    type: "success",
    buttons: [
      () => (
        <Link to="/dashboard" style={{ width: "100%" }}>
          <Button size="medium" fixed>
            Go to the pool page
          </Button>
        </Link>
      ),
    ],
  };
};
export default DialogNotification;

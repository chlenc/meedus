import React from "react";
import RcDialog from "rc-dialog";
import "rc-dialog/assets/index.css";
import "./styles.css";
import { IDialogPropTypes } from "rc-dialog/lib/IDialogPropTypes";
import { ReactComponent as CloseIcon } from "@src/assets/icons/closeBtn.svg";
import styled from "@emotion/styled";
import Button from "@components/Button";

interface IProps extends IDialogPropTypes {}
const CloseButton = styled(Button)`
  width: 40px;
  padding: 0;
`;
const Dialog: React.FC<IProps> = ({ children, ...rest }) => (
  <RcDialog
    closeIcon={
      <CloseButton size="medium" kind="secondary">
        <CloseIcon />
      </CloseButton>
    }
    animation="zoom"
    maskAnimation="fade"
    {...rest}
  >
    {children}
  </RcDialog>
);
export default Dialog;

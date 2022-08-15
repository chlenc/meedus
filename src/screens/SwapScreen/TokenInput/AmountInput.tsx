import React from "react";
import styled from "@emotion/styled";

const Root = styled.input`
  font-style: normal;
  font-weight: 600;
  font-size: 20px;
  line-height: 24px;
  text-align: right;
  color: #ffffff;
  outline: none;
  background: transparent;
  border: none;
  width: 100%;
  &::-webkit-outer-spin-button,
  &::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

  /* Firefox */
  &[type="number"] {
    -moz-appearance: textfield;
  }
`;

type TProps = React.InputHTMLAttributes<HTMLInputElement>;

const AmountInput = React.forwardRef<HTMLInputElement, TProps>(
  ({ onFocus, onWheel, ...props }, ref) => (
    <Root
      ref={ref}
      type="number"
      onFocus={(e) => {
        e.target.select();
        onFocus && onFocus(e);
      }}
      onWheel={(e) => {
        e.target && (e.target as any).blur();
        onWheel && onWheel(e);
      }}
      {...props}
    />
  )
);

AmountInput.displayName = "AmountInput";

export default AmountInput;

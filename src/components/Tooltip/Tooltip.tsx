import styled from "@emotion/styled";
import React, { PropsWithChildren } from "react";
import { usePopperTooltip } from "react-popper-tooltip";
import { Config } from "react-popper-tooltip/dist/types";

interface IProps {
  content: string | JSX.Element;
  config?: Config;
  width?: number;
}

const Root = styled.div<{ width?: number }>`
  display: flex;
  background: #ffffff;
  border: 2px solid #000000;
  min-width: 240px;
  border-radius: 8px;
  ${({ width }) => (width != null ? `width: ${width}px` : "max-width: 320px")};
  box-sizing: border-box;
  padding: 10px 16px;
  box-shadow: 0px 6px 14px rgba(0, 0, 0, 0.06),
    0px 16px 28px rgba(0, 0, 0, 0.07);
  z-index: 1;
`;
const Tooltip: React.FC<IProps & PropsWithChildren> = ({
  children,
  content,
  config,
  width,
}) => {
  const { getTooltipProps, setTooltipRef, setTriggerRef, visible } =
    usePopperTooltip({ ...config });
  return (
    <div style={{ width: "100%" }}>
      <div ref={setTriggerRef} style={{ cursor: "pointer" }}>
        {children}
      </div>
      {visible && (
        <Root ref={setTooltipRef} {...getTooltipProps()} width={width}>
          {content}
        </Root>
      )}
    </div>
  );
};
export default Tooltip;

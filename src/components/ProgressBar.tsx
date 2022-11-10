import styled from "@emotion/styled";
import React from "react";
import useElementSize from "@src/hooks/useElementSize";

interface IProps {
  progress: number;
}

const Root = styled.div`
  background: #ffffff;
  border-radius: 2px;
  height: 8px;
  position: relative;
`;

const Progress = styled.div<{ width: number }>`
  background: #000000;
  border-radius: 2px;
  height: 8px;
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  width: ${({ width }) => width}px;
`;

const ProgressBar: React.FC<IProps> = ({ progress }) => {
  const [squareRef, { width }] = useElementSize();
  const percent = progress < 0 ? 0 : progress > 100 ? 100 : progress;
  return (
    <Root ref={squareRef}>
      <Progress width={width * percent} />
    </Root>
  );
};
export default ProgressBar;

import styled from "@emotion/styled";
import React from "react";
import { ReactComponent as CloseIcon } from "@src/assets/icons/closeBtn.svg";
import { useStores } from "@stores";
import CustomCountdown from "../CustomCountdown";
import { observer } from "mobx-react-lite";

interface IProps {
  closed: boolean;
  setClosed: (v: boolean) => void;
}

const Root = styled.div<{ closed: boolean }>`
  display: flex;
  //flex-direction: column;
  width: 100%;
  z-index: 102;
  @media (min-width: 880px) {
    flex-direction: row;
  }
  align-items: center;
  justify-content: center;
  height: ${({ closed }) => (closed ? "0px" : "80px")};
  @media (min-width: 880px) {
    height: ${({ closed }) => (closed ? "0px" : "56px")};
  }
  padding: ${({ closed }) => (closed ? "0px" : "0 48px")};
  transition: 0.5s;
  overflow: hidden;
  background: #000;
  box-sizing: border-box;
  font-size: 16px;
  line-height: 24px;
  text-align: center;
  color: #fff;
  position: relative;
  white-space: nowrap;

  .close {
    position: absolute;
    cursor: pointer;
    right: 16px;
    path {
      stroke: #fff;
    }
    @media (min-width: 880px) {
      right: 48px;
    }
  }
`;

const BoldText = styled.div`
  font-size: 16px;
  line-height: 24px;
  font-weight: 500;
  color: #fff;
  padding: 0;
`;

const Banner: React.FC<IProps> = ({ closed, setClosed }) => {
  const { auctionStore } = useStores();
  const time =
    auctionStore.auction?.phase === "BID"
      ? auctionStore.auction.revealStart
      : auctionStore.auction?.auctionEnd;
  const nextPhase = auctionStore.auction?.phase === "BID" ? "REVEAL" : "BID";
  return (
    <Root closed={closed}>
      {auctionStore.auction == null ? (
        <>👑 Meedus is alive 🎉</>
      ) : (
        <>
          ⏰ Phase &nbsp;<BoldText>{nextPhase}</BoldText>&nbsp; will start&nbsp;
          <BoldText>
            in {<CustomCountdown date={new Date(+(time ?? 0))} />}
          </BoldText>
        </>
      )}
      <CloseIcon className="close" onClick={() => setClosed(true)} />
    </Root>
  );
};
export default observer(Banner);

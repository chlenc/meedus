import styled from "@emotion/styled";
import React from "react";
import Text from "@components/Text";
import SizedBox from "@components/SizedBox";
import Button from "@components/Button";
import Tooltip from "@components/Tooltip";
import image from "@src/assets/images/connectWalletPic.png";
interface IProps {}

const Root = styled.div`
  display: flex;
  flex-direction: column;
  background: #eeeeee;
  border-radius: 8px;
  padding: 24px 0 24px 24px;
  box-sizing: border-box;
  width: 100%;
  position: relative;
`;

const Pic = styled.div`
  background: url(${image}) center no-repeat;
  background-size: cover;
  width: 200px;
  height: 200px;
  position: absolute;
  top: -12px;
  bottom: -12px;
  right: 0;
`;

const ActiveBids: React.FC<IProps> = () => {
  return (
    <Root>
      <Text size="medium">You have {"0"} active bids</Text>
      <Text style={{ color: "#666666", maxWidth: 220 }}>
        You can keep track of your domain bids on Waves Domains
      </Text>
      <SizedBox height={24} />
      <Tooltip content={<Text>Coming soon</Text>}>
        <Button size="medium" style={{ width: "fit-content" }}>
          Go to Waves Domains
        </Button>
      </Tooltip>
      <Pic />
    </Root>
  );
};
export default ActiveBids;

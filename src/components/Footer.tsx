import styled from "@emotion/styled";
import React from "react";
import Text from "@components/Text";
import { Row } from "@components/Flex";
import { ReactComponent as Telegram } from "@src/assets/icons/telegram.svg";
import SizedBox from "@components/SizedBox";

interface IProps {}

const Root = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  box-sizing: border-box;
  width: calc(100% - 32px);
  max-width: calc(1160px + 32px);
  margin: 40px 16px 0;
  text-align: left;

  border-top: 2px #2a2a32 solid;
  padding: 16px;
`;
const Footer: React.FC<IProps> = () => {
  return (
    <Root>
      <Text type="secondary" fitContent>
        LineUp finance, 2022
      </Text>
      <Row mainAxisSize="fit-content">
        <SizedBox width={20} />
        <Telegram
          style={{ minWidth: 21, cursor: "pointer" }}
          onClick={() => window.open("https://t.me/nftescape", "_blank")}
        />
      </Row>
    </Root>
  );
};
export default Footer;

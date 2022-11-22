import styled from "@emotion/styled";
import React, { HTMLAttributes, PropsWithChildren } from "react";
import Header from "@components/Header";
import Footer from "@components/Footer";
import Button from "@components/Button";
import { ReactComponent as Telegram } from "@src/assets/icons/telegramOutline.svg";
import SizedBox from "@components/SizedBox";

interface IProps extends PropsWithChildren, HTMLAttributes<HTMLDivElement> {
  header?: JSX.Element;
}

const Root = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  min-height: 100vh;
  align-items: center;

  & > * {
    width: 100%;
  }
`;
const Content = styled.div`
  display: flex;
  flex: 1;
  height: calc(100% - 58px - 80px);
  justify-content: center;
`;

const TelegramButton = styled(Button)`
  position: fixed;
  bottom: 72px;
  right: 40px;
  max-width: fit-content;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Layout: React.FC<IProps> = ({ children, header, ...rest }) => {
  return (
    <Root {...rest}>
      {header ?? <Header />}
      <Content>{children}</Content>
      <Footer />
      <TelegramButton
        kind="secondary"
        size="medium"
        onClick={() => window.open("https://t.me/meedus_nft", "_blank")}
      >
        <Telegram style={{ width: 20, height: 20 }} />
        <SizedBox width={8} />
        Join our Telegram
      </TelegramButton>
    </Root>
  );
};
export default Layout;

import styled from "@emotion/styled";
import React, { HTMLAttributes, PropsWithChildren } from "react";
import Header from "@components/Header";

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
  height: 100%;
  justify-content: center;
`;

const Layout: React.FC<IProps> = ({ children, header, ...rest }) => {
  return (
    <Root {...rest}>
      {header ?? <Header />}
      <Content>{children}</Content>
    </Root>
  );
};
export default Layout;

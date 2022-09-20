import React from "react";
import styled from "@emotion/styled";
import logo from "@src/assets/images/bigLogo.svg";
import { ReactComponent as CloseIcon } from "@src/assets/icons/closeBtn.svg";
import Button from "@components/Button";
import { Link } from "react-router-dom";
import { ROUTES } from "@src/constants";

interface IProps {}

const Root = styled.div`
  display: flex;
  box-sizing: border-box;
  padding: 16px;
  align-items: center;
  max-width: calc(1160px + 32px);
  width: 100%;
  justify-content: space-between;
  color: white;
  @media (min-width: 1280px) {
    padding: 16px 24px;
    border-bottom: 1px solid transparent;
    background: transparent;
  }
`;
const Logo = styled.img`
  height: 48px;
`;
const CloseButton = styled(Button)`
  width: 40px;
  padding: 0;
`;

const LoginScreenHeader: React.FC<IProps> = () => {
  return (
    <Root>
      <a href="/">
        <Logo src={logo} />
      </a>
      <Link to={ROUTES.ROOT}>
        <CloseButton size="medium" kind="secondary">
          <CloseIcon />
        </CloseButton>
      </Link>
    </Root>
  );
};
export default LoginScreenHeader;

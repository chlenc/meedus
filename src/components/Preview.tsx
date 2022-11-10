import styled from "@emotion/styled";
import { Column, Row } from "@components/Flex";
import React, { HTMLAttributes } from "react";
import Text from "@components/Text";
import { observer } from "mobx-react-lite";
import { ReactComponent as WavesLogo } from "@src/assets/icons/wavesLogo.svg";
import { TNftData } from "@screens/NameServiceScreen/NameServiceScreenVm";
import { IOption } from "@components/Select";

interface IProps extends HTMLAttributes<HTMLDivElement> {
  nft?: TNftData | null;
  bg?: IOption | null;
  name?: string;
}

const Root = styled.div`
  display: flex;
  flex-direction: column;
  width: 320px;
  height: 320px;
  background: #000;
  padding: 8px 8px 0 8px;
  box-sizing: border-box;
`;

const Body = styled(Column)`
  width: 100%;
  align-items: center;
  justify-content: center;
  height: 260px;
  flex-shrink: 0;
  border-radius: 4px;
  background: #fff;
`;

const Footer = styled(Row)`
  padding: 0 8px;
  height: 100%;
  box-sizing: border-box;
  align-items: center;
`;

export const labelColorMap: Record<string, { font: string; bg: string }> = {
  "#0055FF": { font: "#ffffff", bg: "rgba(255, 255, 255, 0.32)" },
  "#FF4940": { font: "#ffffff", bg: "rgba(255, 255, 255, 0.24)" },
  "#FF8D00": { font: "#ffffff", bg: "rgba(255, 255, 255, 0.32)" },
  "#FFDA0B": { font: "#000000", bg: "rgba(0, 0, 0, 0.16)" },
  "#00CC5F": { font: "#000000", bg: "rgba(0, 0, 0, 0.16)" },
  "#AA00FF": { font: "#ffffff", bg: "rgba(255, 255, 255, 0.32)" },
};

const Label = styled.p`
  font-weight: 600;
  font-size: 32px;
  line-height: 40px;
  width: fit-content;
  box-sizing: border-box;
  padding: 0 4px;
  margin: 0;
  border-radius: 4px;
  word-break: break-all;
  text-align: center;
`;

const PreviewImg = styled.img`
  width: 320px;
  height: 320px;
`;

const Wrapper = styled.div`
  width: 320px;
  height: 320px;
  overflow: hidden;
  border-radius: 8px;
`;

const Preview: React.FC<IProps> = ({ nft, bg, name, ...rest }) => {
  const color = labelColorMap[bg?.key ?? ""]?.font ?? "#000";
  const background = labelColorMap[bg?.key ?? ""]?.bg ?? "rgba(0, 0, 0, 0.2)";
  if (nft == null && name == null && bg == null) return null;
  return (
    <Wrapper>
      {nft != null ? (
        nft.img !== "" ? (
          <PreviewImg src={nft.img} alt={nft.id} />
        ) : null
      ) : (
        <Root id={rest.id ?? "hidden-preview"} {...rest}>
          <Body style={{ background: bg?.key ?? "#fff" }}>
            {name !== "" ? (
              <>
                <Label style={{ color }}>{name}</Label>
                <Label style={{ color, background }}>.waves</Label>
              </>
            ) : null}
          </Body>
          <Footer>
            <Text style={{ color: "#ffffff" }} size="small" weight={600}>
              Waves Name Service
            </Text>
            <WavesLogo />
          </Footer>
        </Root>
      )}
    </Wrapper>
  );
};
export default observer(Preview);

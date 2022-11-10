import styled from "@emotion/styled";
import React from "react";
import useElementSize from "@src/hooks/useElementSize";
import SizedBox from "@components/SizedBox";
import { Column, Row } from "@src/components/Flex";
import Text from "@components/Text";
import { TBadge, TCheckScriptResult } from "@src/services/badgesService";
import { ReactComponent as Logo } from "@src/assets/images/roundLogo.svg";
import BN from "@src/utils/BN";
import Button from "@components/Button";
import Tooltip from "@components/Tooltip";
import ProgressBar from "@components/ProgressBar";

interface IProps {
  badge: TBadge & { progress?: TCheckScriptResult };
  onMint?: () => void;
}

const Root = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const NftPreview = styled.div<{ src?: string }>`
  width: 100%;
  border-radius: 8px;
  ${({ src }) =>
    src == null
      ? "border: 2px solid #000"
      : `background: url(${src}) center no-repeat`};
  background-size: cover;
`;

const IssuerPreview = styled(Logo)`
  border-radius: 50%;
  width: 32px;
  height: 32px;
  flex-shrink: 0;
`;

const Tag = styled(Text)`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 24px;
  padding: 0 8px;
  border-radius: 2px;
  background: #000000;
  color: #ffffff;
  width: fit-content;
  line-height: normal;
`;

const TagsContainer = styled(Row)`
  justify-content: flex-end;
  & > * {
    margin-right: 8px;
  }
  & > :last-of-type {
    margin-right: 0;
  }
`;

const ProgressWrapper = styled.div`
  margin-top: 16px;
  background: #eeeeee;
  border-radius: 8px;
  padding: 12px 16px;
  box-sizing: border-box;
`;

const tagsColors: Record<string, string> = {
  Ecosystem: "#000",
  DeFi: "#C1BFFF",
  NFT: "#FF938C",
  DAO: "#FFDEA6",
  General: "#A5FFC9",
};

const Badge: React.FC<IProps> = ({ badge }) => {
  const [squareRef, { width }] = useElementSize();

  return (
    <Root ref={squareRef}>
      <Column crossAxisSize="max">
        <NftPreview
          style={{ height: width }}
          src={!!badge.link ? badge.link : undefined}
        />
        <SizedBox height={16} />
        <Row alignItems="center" justifyContent="space-between">
          <Row alignItems="center">
            <IssuerPreview />
            <SizedBox width={12} />
            {/*todo*/}
            <Text size="medium">Meedus</Text>
          </Row>
          <TagsContainer>
            {badge.category.map((v, i) => {
              const background = tagsColors[v] ?? "#EEEEEE";
              const color = background === "#000" ? "white" : "#000";
              return (
                <Tag key={i} style={{ background, color }}>
                  {v}
                </Tag>
              );
            })}
          </TagsContainer>
        </Row>
        <SizedBox height={16} />
        <Text size="title" weight={700}>
          {badge.name}
        </Text>
      </Column>
      <Text size="medium">{badge.description}</Text>
      {badge.progress &&
        (badge.progress.actualActionValue >=
        badge.progress.requiredActionValue ? (
          <Tooltip content={<Text>Coming soon</Text>}>
            <Button style={{ marginTop: 16 }}>Mint</Button>
          </Tooltip>
        ) : (
          <ProgressWrapper>
            <Row justifyContent="space-between">
              <Text fitContent>
                {badge.progress.actualActionValue}/
                {badge.progress.requiredActionValue}
              </Text>
              <Text fitContent>
                {new BN(badge.progress.actualActionValue)
                  .div(badge.progress.requiredActionValue)
                  .times(100)
                  .toFormat(0)}
                %
              </Text>
            </Row>
            <SizedBox height={4} />
            <ProgressBar
              progress={new BN(badge.progress.actualActionValue)
                .div(badge.progress.requiredActionValue)
                .toNumber()}
            />
          </ProgressWrapper>
        ))}
    </Root>
  );
};
export default Badge;

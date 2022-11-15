import styled from "@emotion/styled";
import { Row } from "@src/components/Flex";
import React from "react";
import Button from "@components/Button";
import SizedBox from "@components/SizedBox";
import { TNftData } from "@screens/NameServiceScreen/NameServiceScreenVm";
import { Anchor } from "@src/components/Anchor";
import Preview from "@components/Preview";
import { IOption } from "@components/Select";

interface IProps {
  nft?: TNftData;
  bg?: IOption | null;
  name?: string;
}

const Root = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background: #eeeeee;
  border-radius: 8px;
  padding: 24px 24px 40px;
  box-sizing: border-box;
  width: 100%;
`;

const ExistPreview: React.FC<IProps> = ({ nft, bg, name }) => {
  return (
    <Root>
      {nft != null && (
        <>
          <Row justifyContent="flex-end">
            <Anchor href={`https://puzzlemarket.org/nft/${nft.id}`}>
              <Button
                kind="secondary"
                style={{ width: "fit-content" }}
                size="medium"
              >
                View on Puzzle Market
              </Button>
            </Anchor>
          </Row>
          <SizedBox height={42} />
        </>
      )}
      <Preview nft={nft} bg={bg} name={name} />
    </Root>
  );
};
export default ExistPreview;

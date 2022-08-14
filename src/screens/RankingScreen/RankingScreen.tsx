import styled from "@emotion/styled";
import React, { useState } from "react";
import { Row } from "@components/Flex";
import SizedBox from "@components/SizedBox";
import {
  RankingScreenVMProvider,
  useRankingScreenVM,
} from "@screens/RankingScreen/RankingScreenVm";
import DappCard from "@screens/RankingScreen/DappCard";
import { observer } from "mobx-react-lite";
import Button from "@components/Button";

interface IProps {}

const Root = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 54px;
  box-sizing: border-box;
  padding: 0 16px;
  width: 100%;
  max-width: calc(1160px + 32px);
  @media (min-width: 768px) {
    padding: 0 24px;
  }
`;

const Title = styled.div`
  font-weight: 600;
  font-size: 40px;
  line-height: 56px;
  letter-spacing: -0.01em;
  color: #ffffff;
  margin-bottom: 16px;
  white-space: nowrap;
`;

const DappsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(1, 1fr);
  gap: 16px;

  @media (min-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
  }
  @media (min-width: 1024px) {
    grid-template-columns: repeat(3, 1fr);
  }
`;

const TagButton = styled(Button)<{ selected?: boolean }>`
  background: ${({ selected }) => (selected ? "#fff" : "#1f1e25")};
  color: ${({ selected }) => (selected ? "#0B0B0D" : "#fff")};
  border-radius: 20px !important;
  height: 40px;
  padding: 0 16px;
  :hover {
    color: #fff;
  }
`;

const TagsContainer = styled(Row)`
  flex-wrap: wrap;
  margin: -4px;
  & > * {
    margin: 4px;
  }
`;

const RankingScreenImpl: React.FC<IProps> = observer(() => {
  const vm = useRankingScreenVM();
  const [tagsFilter, setTagsFilter] = useState<string[]>([]);
  const toggleTagFilter = (tag: string) => {
    const arr = [...tagsFilter];
    const index = arr.findIndex((v) => v === tag);
    index === -1 ? arr.push(tag) : arr.splice(index, 1);
    setTagsFilter(arr);
  };
  return (
    <Root>
      <Title>Dapps ranking</Title>
      <TagsContainer>
        {vm.tags.map((tag) => (
          <TagButton
            key={tag}
            onClick={() => toggleTagFilter(tag)}
            selected={tagsFilter.includes(tag)}
          >
            {tag}
          </TagButton>
        ))}
      </TagsContainer>
      <SizedBox height={32} />
      <DappsGrid>
        {vm.dappsStats
          .slice()
          .filter(
            ({ tags }) =>
              tagsFilter.length === 0 ||
              tagsFilter.some((tag) => tags.includes(tag))
          )
          .map((data, i) => (
            <DappCard key={i} {...data} />
          ))}
      </DappsGrid>
    </Root>
  );
});

const RankingScreen = () => (
  <RankingScreenVMProvider>
    <RankingScreenImpl />
  </RankingScreenVMProvider>
);

export default RankingScreen;

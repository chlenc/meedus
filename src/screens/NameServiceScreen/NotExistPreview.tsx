import styled from "@emotion/styled";
import { Row } from "@src/components/Flex";
import { ReactComponent as CheckIcon } from "@src/assets/icons/check.svg";
import React from "react";
import SizedBox from "@components/SizedBox";
import Select from "@components/Select";
import { observer } from "mobx-react-lite";
import { useNameServiceScreenVM } from "@screens/NameServiceScreen/NameServiceScreenVm";
import Preview from "@components/Preview";
import BuyNftButton from "./BuyNftButton";

interface IProps {}

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

const Tag = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 500;
  font-size: 17px;
  line-height: 24px;
  color: #000;
  background: #a5ffc9;
  border-radius: 4px;
  padding: 4px 8px 4px 4px;

  box-sizing: border-box;
`;

const categoriesOptions = [
  {
    title: "Waves Blue",
    key: "#0055FF",
  },
  { title: "Red", key: "#FF4940" },
  { title: "Orange", key: "#FF8D00" },
  { title: "Yellow", key: "#FFDA0B" },
  { title: "Green", key: "#00CC5F" },
  { title: "Purple", key: "#AA00FF" },
];

const NotExistPreview: React.FC<IProps> = () => {
  const vm = useNameServiceScreenVM();
  return (
    <Root>
      <Row justifyContent="space-between" alignItems="center">
        <Tag>
          <CheckIcon />
          <SizedBox width={8} />
          Available
        </Tag>
        <Select
          options={categoriesOptions}
          selected={vm.bg}
          placeholder="Select background color"
          onSelect={(v) => vm.setBg(v)}
        />
      </Row>
      <SizedBox height={42} />
      <Preview bg={vm.bg} name={vm.name} />
      <SizedBox height={40} />
      <BuyNftButton />
    </Root>
  );
};
export default observer(NotExistPreview);

import React from "react";
import Dialog from "@components/Dialog";
import { observer } from "mobx-react-lite";
import Preview from "@screens/NsScreen/Preview";
import styled from "@emotion/styled";
import SizedBox from "@components/SizedBox";
import GetNameBtn from "@screens/NsScreen/GetNameBtn";
import { useNsScreenVM } from "@screens/NsScreen/NsScreenVm";
import Button from "@components/Button";

interface IProps {
  onClose: () => void;
  visible: boolean;
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  padding: 20px;
  align-items: center;

  @media (min-width: 768px) {
    padding: 40px;
  }
`;
const PreviewModal: React.FC<IProps> = ({ ...rest }) => {
  const vm = useNsScreenVM();
  return (
    <Dialog style={{ maxWidth: 400 }} {...rest}>
      <Container>
        <Preview />
        <SizedBox height={40} />
        {vm.existingNftId == null ? (
          <GetNameBtn fitContent />
        ) : (
          <Button
            onClick={() =>
              window.open(`https://puzzlemarket.org/nft/${vm.existingNftId}`)
            }
          >
            View on Puzzle Market
          </Button>
        )}
      </Container>
    </Dialog>
  );
};
export default observer(PreviewModal);

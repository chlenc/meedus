import React from "react";
import Dialog from "@components/Dialog";
import { observer } from "mobx-react-lite";
import Preview from "@components/Preview";
import styled from "@emotion/styled";
import SizedBox from "@components/SizedBox";
import GetNameBtn from "@screens/NsScreen/GetNameBtn";
import { useNsScreenVM } from "@screens/NsScreen/NsScreenVm";
import Button from "@components/Button";
import { Anchor } from "@components/Anchor";

interface IProps {
  onClose: () => void;
  visible: boolean;
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  padding: 20px;
  align-items: center;

  @media (min-width: 1280px) {
    padding: 40px;
  }
`;
const PreviewModal: React.FC<IProps> = ({ ...rest }) => {
  const vm = useNsScreenVM();
  return (
    <Dialog {...rest} forceRender>
      <Container>
        <Preview />
        <SizedBox height={40} />
        {vm.existingNft == null ? (
          <GetNameBtn fitContent />
        ) : (
          <Anchor href={`https://puzzlemarket.org/nft/${vm.existingNft?.id}`}>
            <Button>View on Thunder Marketplace</Button>
          </Anchor>
        )}
      </Container>
    </Dialog>
  );
};
export default observer(PreviewModal);

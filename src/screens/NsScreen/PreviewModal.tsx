import React from "react";
import Dialog from "@components/Dialog";
import { observer } from "mobx-react-lite";
import Preview from "@screens/NsScreen/Preview";

interface IProps {
  onClose: () => void;
  visible: boolean;
}

const PreviewModal: React.FC<IProps> = ({ ...rest }) => {
  return (
    <Dialog style={{ maxWidth: 360 }} {...rest}>
      <Preview />
    </Dialog>
  );
};
export default observer(PreviewModal);

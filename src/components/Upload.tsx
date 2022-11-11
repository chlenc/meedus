import styled from "@emotion/styled";
import React, { PropsWithChildren } from "react";
import { toast } from "react-toastify";
import { TBidBackup } from "@screens/NameServiceScreen/MyBids/MyBidsVm";

interface IProps extends PropsWithChildren {
  onChange: (backup: TBidBackup[]) => void;
}

const Root = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  position: relative;

  .upload-btn-wrapper {
    position: relative;
  }

  .btn {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    color: black;
  }

  .upload-btn-wrapper input[type="file"] {
    cursor: pointer;
    width: 56px;
    height: 56px;
    position: absolute;
    opacity: 0;
    bottom: 0;
  }
`;

const Container = styled.div`
  background-size: cover;
  background-position: center;
  box-sizing: border-box;
  box-shadow: none;
  color: transparent;
  position: relative;
  flex-shrink: 0;
`;
const keys = [
  "id",
  "hash",
  "domain",
  "auctionId",
  "address",
  "name",
  "secret",
  "amount",
  "deposit",
];

const Upload: React.FC<IProps> = ({ onChange, children }) => {
  const handleChange = async (v: React.ChangeEvent<HTMLInputElement>) => {
    const files = v.target.files;
    if (!files || !files[0]) return;
    const file: File = files[0];
    if (!/(json)$/i.test(file.type)) {
      toast("Please choose other file extension");
    }
    try {
      const fileReader = new FileReader();
      fileReader.readAsText(file, "UTF-8");
      fileReader.onload = (e: any) => {
        const res = JSON.parse(e.target.result);
        const isOk =
          Array.isArray(res) &&
          res.every((v: Record<string, string>) =>
            keys.every((key) => Object.keys(v).includes(key))
          );
        if (isOk) {
          onChange(res);
        } else {
          toast.error("Invalid json");
        }
      };
    } catch (e: any) {
      toast.error("Cannot parse json");
    }
  };

  return (
    <Root>
      <Container className="upload-btn-wrapper">
        {children}
        <div className="btn">
          <input
            style={{ zIndex: 2 }}
            type="file"
            name="file"
            onChange={handleChange}
          />
        </div>
      </Container>
    </Root>
  );
};
export default Upload;

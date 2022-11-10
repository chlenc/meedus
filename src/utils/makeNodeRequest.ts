import axios from "axios";
import { NODES } from "@src/constants";

const testnetNodes = ["https://nodes-testnet.wavesnodes.com"];

interface IParams {
  chainId?: "T" | "W";
  postData?: any;
}

const makeNodeRequest = async (
  request: string,
  params?: IParams
): Promise<any> => {
  const nodes =
    params?.chainId == null || params.chainId === "W" ? NODES : testnetNodes;
  return new Promise(async (resolve, reject) => {
    let nodeIndex = 0;
    let success = false;
    while (!success) {
      const url = nodes[nodeIndex] + request;
      try {
        const response = await (params?.postData == null
          ? axios.get(url)
          : axios.post(url, params.postData));
        success = true;
        resolve(response);
      } catch (reason) {
        if (nodeIndex === nodes.length - 1) {
          success = true;
          reject(reason);
        } else {
          nodeIndex = nodeIndex + 1;
        }
      }
    }
  });
};

export default makeNodeRequest;

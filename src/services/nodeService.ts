import makeNodeRequest from "@src/utils/makeNodeRequest";

export interface INodeData {
  key: string;
  type: "integer" | "string";
  value: number | string;
}

export interface IAsset {
  assetId: string;
  issueHeight: number;
  issueTimestamp: number;
  issuer: string;
  issuerPublicKey: string;
  name: string;
  description: string;
  decimals: number;
  reissuable: boolean;
  quantity: number;
  scripted: boolean;
  minSponsoredAssetFee: null | number;
  originTransactionId: string;
}

export interface INFT {
  assetId: string;
  decimals: number;
  description: string;
  issueHeight: number;
  issueTimestamp: number;
  issuer: string;
  issuerPublicKey: string;
  minSponsoredAssetFee: null | any;
  name: string;
  originTransactionId: string;
  quantity: number;
  reissuable: boolean;
  scripted: boolean;
  typeId?: string;
}

interface IBalance {
  assetId: string;
  balance: number;
}

interface IAssetDetails {
  assetId: string;
  issueHeight: number;
  issueTimestamp: number;
  issuer: string;
  issuerPublicKey: string;
  name: string;
  description: string;
  decimals: number;
  reissuable: boolean;
  quantity: number;
  scripted: boolean;
  minSponsoredAssetFee: null | any;
  originTransactionId: string;
}

const nodeService = {
  getAddressNfts: async (address: string): Promise<INFT[]> => {
    const url = `/assets/nft/${address}/limit/1000`;
    const { data } = await makeNodeRequest(url);
    return data;
  },
  getAssetDetails: async (assetId: string): Promise<IAsset | null> => {
    const url = `/assets/details/${assetId}`;
    const { data } = await makeNodeRequest(url);
    return data;
  },
  getAddressBalances: async (address: string | null): Promise<IBalance[]> => {
    if (address == null) return [];
    const assetsUrl = `/assets/balance/${address}`;
    const wavesUrl = `/addresses/balance/details/${address}`;
    return (
      await Promise.all([
        makeNodeRequest(assetsUrl).then(({ data }) => data),
        makeNodeRequest(wavesUrl).then(({ data }) => ({
          balances: [{ balance: data.regular, assetId: "WAVES" }],
        })),
      ])
    ).reduce<{ assetId: string; balance: number }[]>(
      (acc, { balances }) => [...acc, ...balances],
      []
    );
  },
  nodeKeysRequest: async (
    contract: string,
    keys: string[] | string
  ): Promise<INodeData[]> => {
    const searchKeys = typeof keys === "string" ? [keys] : keys;
    const search = new URLSearchParams(searchKeys?.map((s) => ["key", s]));
    const keysArray = search.toString();
    const response = await makeNodeRequest(
      `/addresses/data/${contract}?${keysArray}`
    );
    if (response.data) {
      return response.data;
    } else {
      return [];
    }
  },

  assetDetails: async (assetId: string): Promise<IAssetDetails | null> => {
    const url = `/assets/details/${assetId}`;
    const response: { data: IAssetDetails } = await makeNodeRequest(url);
    if (response.data) {
      return response.data;
    } else {
      return null;
    }
  },
};

export default nodeService;

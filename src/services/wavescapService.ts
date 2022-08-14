import axios from "axios";

export interface IAssetResponse {
  id: string;
  start: string;
  totalSupply: number;
  circulating: number;
  "24h_vol_usd-n": number;
  precision: number;
  name: string;
  shortcode: string;
  data: {
    "firstPrice_usd-n": number;
    "lastPrice_usd-n": number;
  } | null;
}

export interface IDappResponse {
  id: string;
  name: string;
  url: string;
  logo: string;
  description: string;
  github: string;
  telegram: string;
  medium: string;
  twitter: string;
  facebook: string;
  video: string;
  tags: string[];
  last_totals: {
    "usd-n": number;
  };
  "volume_1d_usd-n": number;
  "last_volume_7d_usd-n": number;
  unique_interacting_addresses_1d: number;
  unique_interacting_addresses_7d: number;
  totals: {
    "usd-n": number;
  };
  "volume_7d_usd-n": number;
}

const wavesCapService = {
  getAssetsStats: async (assetsId: string[]): Promise<IAssetResponse[]> => {
    const params = new URLSearchParams();
    for (let i = 0; i < assetsId.length - 1; i++) {
      params.append("assetIds[]=", assetsId[i]);
    }
    const url = `https://wavescap.com/api/assets-info.php?${params.toString()}`;
    const response = await axios.get(url);
    return response.data.assets != null
      ? response.data.assets.filter((v: any) => v != null)
      : [];
  },
  getAllAssetsStats: async (): Promise<IAssetResponse[]> => {
    const response = await axios.get("https://wavescap.com/api/assets.json");
    return response.data;
  },
  getAllDappsStats: async (): Promise<IDappResponse[]> => {
    const response = await axios.get("https://wavescap.com/api/dapps.json");
    return response.data;
  },
};
export default wavesCapService;

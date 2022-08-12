import axios from "axios";

interface IAssetResponse {
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
};
export default wavesCapService;

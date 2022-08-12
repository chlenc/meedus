const logos = require("./tokenLogos.json");

export const ROUTES = {
  ROOT: "/",
  NOT_FOUND: "/404",
  STAKE: "/stake",
  TRADE: "/trade",
  OLD_EXPLORE: "/classic-explore",
  EXPLORE: "/explore",
  EXPLORE_TOKEN: "/explore/token/:assetId",
  INVEST: "/invest",
  ULTRASTAKE: "/ultrastake",
  WALLET: "/wallet",
  TRANSFER: "/transfer",
  POOLS_WITHDRAW: "/pools/:poolDomain/withdraw",
  POOLS_ADD_LIQUIDITY: "/pools/:poolDomain/addLiquidity",
  POOLS_ADD_ONE_TOKEN: "/pools/:poolDomain/addOneToken",
  POOLS_INVEST: "/pools/:poolDomain/invest",
  POOLS_CREATE: "/pools/create",
  POOL_SWAP: "/pools/:poolDomain",
};

export const TOKEN_LOGO_BY_ASSET_ID: Record<string, string> = logos;

export const NODE_URL = "https://nodes-puzzle.wavesnodes.com";
export const EXPLORER_URL = "https://new.wavesexplorer.com";

export interface IToken {
  assetId: string;
  name: string;
  symbol: string;
  decimals: number;
  startPrice?: number;
  description?: string;
  logo: string;
  category?: string[];
}

export interface IPoolConfigStatistics {
  apy: string;
  monthlyVolume: string;
  weeklyVolume: string;
  monthlyFees: string;
  fees: string;
  liquidity: string;
  volume: Array<{ date: number; volume: string }>;
}

export interface IPoolConfig {
  domain: string;
  isCustom?: boolean;
  contractAddress: string;
  layer2Address?: string;
  baseTokenId: string;
  title: string;
  defaultAssetId0?: string;
  defaultAssetId1?: string;
  tokens: Array<IToken & { share: number }>;
  poolTokenName?: string;
  owner?: string;
  artefactOriginTransactionId?: string;
  swapFee?: number;
  createdAt?: string;
  logo?: string;
  statistics?: IPoolConfigStatistics;
}

export const NODES = [
  "https://nodes-puzzle.wavesnodes.com",
  "https://wavesducks.wavesnodes.com",
  "https://nodes.swop.fi",
  "https://nodes.wavesnodes.com",
];

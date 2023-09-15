import { IToken } from "@src/entities/Balance";
import tokens from "./tokens.json";

export const ROUTES = {
  ROOT: "/",
  NAMESERVICE: "/nameservice",
  PARTNERS: "/partners",
  AUCTION: "/auction/:name/:bg",
};

export const CORE = "3P7NhmDt31ekQ2JryxtmdgZ1DXgVPwyocJK";
export const NS_DAPP = "3PGKEe4y59V3WLnHwPEUaMWdbzy8sb982fG"; //mainnet
// export const NS_DAPP = "3N9CHPgP4cjToRcdiwyvfBhmS1rJp1JXZ6M"; //testnet

export const AUCTION = "3PEAqJwXYEiGJ4vdpKfRF48TFQ1gWfByR9S";
// export const AUCTION = "3PCRdF1bZCesKtAsd8ZdTbgiLB6ZNYEPWSX";//test auction
export const REGISTER = "3P6utP25F4wMUGG4hGdDtMXMKu2tTeNkgRs";
export const NFT_STORAGE = "3PFQjjDMiZKQZdu5JqTHD7HwgSXyp9Rw9By";

export const NODES = [
  "https://nodes-puzzle.wavesnodes.com",
  "https://wavesducks.wavesnodes.com",
  "https://nodes.swop.fi",
  "https://nodes.wavesnodes.com",
  // "https://nodes-testnet.wavesnodes.com",
];
export const NODE_URL = NODES[0];
export const EXPLORER_URL = "https://new.wavesexplorer.com";
export const PUZZLE_MARKET_URL = "https://puzzlemarket.org";

export const TOKENS_LIST: Array<IToken> = Object.values(tokens).map((t) => ({
  ...t,
  // logo: (tokenLogos as Record<string, string>)[t.symbol],
  logo: "",
}));

export const TOKENS_BY_ASSET_ID: Record<string, IToken> = TOKENS_LIST.reduce(
  (acc, t) => ({ ...acc, [t.assetId]: t }),
  {}
);
export const TOKENS_BY_SYMBOL: Record<string, IToken> = TOKENS_LIST.reduce(
  (acc, t) => ({ ...acc, [t.symbol]: t }),
  {}
);

export const BADGE_COLORS = [
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

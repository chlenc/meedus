import { IToken } from "@src/entities/Balance";
import tokens from "./tokens.json";
import tokenLogos from "./tokenLogos.json";

const logos = require("./tokenLogos.json");

export const ROUTES = {
  ROOT: "/",
  NAMESERVICE: "/nameservice",
  PARTNERS: "/partners",
  AUCTION: "/auction/:id",
};

export const TOKEN_LOGO_BY_ASSET_ID: Record<string, string> = logos;

export const NS_DAPP = "3PGKEe4y59V3WLnHwPEUaMWdbzy8sb982fG"; //mainnet
// export const NS_DAPP = "3N9CHPgP4cjToRcdiwyvfBhmS1rJp1JXZ6M"; //testnet

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
  logo: (tokenLogos as Record<string, string>)[t.symbol],
}));

export const TOKENS_BY_ASSET_ID: Record<string, IToken> = TOKENS_LIST.reduce(
  (acc, t) => ({ ...acc, [t.assetId]: t }),
  {}
);
export const TOKENS_BY_SYMBOL: Record<string, IToken> = TOKENS_LIST.reduce(
  (acc, t) => ({ ...acc, [t.symbol]: t }),
  {}
);

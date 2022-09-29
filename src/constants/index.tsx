import { IToken } from "@src/entities/Balance";
import tokens from "./tokens.json";
import tokenLogos from "./tokenLogos.json";

const logos = require("./tokenLogos.json");

export const ROUTES = {
  ROOT: "/",
  LOGIN: "/login",
};

export const TOKEN_LOGO_BY_ASSET_ID: Record<string, string> = logos;

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

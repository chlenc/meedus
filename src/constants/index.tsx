const logos = require("./tokenLogos.json");

export const ROUTES = {
  ROOT: "/",
  SWAP: "/swap",
  TOKENS: "/tokens",
  DAPPS: "/dapps",
};

export const TOKEN_LOGO_BY_ASSET_ID: Record<string, string> = logos;

export const NODE_URL = "https://nodes-puzzle.wavesnodes.com";
export const EXPLORER_URL = "https://new.wavesexplorer.com";

export const NODES = [
  "https://nodes-puzzle.wavesnodes.com",
  "https://wavesducks.wavesnodes.com",
  "https://nodes.swop.fi",
  "https://nodes.wavesnodes.com",
];

import BN from "@src/utils/BN";

export const assetPriceFormat = (price: BN, decimals = 8) => {
  if (price.eq(0)) return "0";
  else if (price.gte(0.01)) {
    return price.toFormat(2);
  } else if (price.gte(0.0001)) {
    return price.toFormat(4);
  } else {
    return price.toFormat(decimals);
  }
};

import axios from "axios";

export type TBadgeType =
  | "invoke"
  // | "receive"
  | "transactions"
  | "firstTransaction";

export interface IBadgeBase {
  id: number;
  category: Array<string>;
  name: string;
  description: string;
  link: string;
  type: TBadgeType;
}

export interface TInvokeBadge extends IBadgeBase {
  type: "invoke";
  conditions: {
    contractAddress: string;
    functionName: string;
    minTxAmount: number;
  };
}

export interface TTransactionsBadge extends IBadgeBase {
  type: "transactions";
  conditions: {
    minTxAmount: number;
    txType: "set-script" | "invoke-script" | "all";
  };
}
export interface TFirstTransactionsBadge extends IBadgeBase {
  type: "firstTransaction";
  conditions: {
    startDate: string;
    endDate: string;
  };
}

export type TBadge =
  | TInvokeBadge
  | TTransactionsBadge
  | TFirstTransactionsBadge;

export const fetchBadges = async (): Promise<Array<TBadge>> => {
  const { data } = await axios.get(
    `${process.env.REACT_APP_BACKEND_URL}/badges`
  );
  return data;
};

export type TCheckScriptResult = {
  actualActionValue: number;
  requiredActionValue: number;
};

export type TCheckResult = {
  address: string;
  badgeId: number;
  scriptResult: TCheckScriptResult;
};

export const fetchProgress = async (
  address: string
): Promise<Array<TCheckResult>> => {
  const { data } = await axios.get(
    `${process.env.REACT_APP_BACKEND_URL}/check/${address}`
  );
  return data;
};

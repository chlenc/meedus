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
  // const { data } = await axios.get(
  //   `${process.env.REACT_APP_BACKEND_URL}/badges`
  // );
  // return data;
  const data: Array<TBadge> = [
    {
      id: 1,
      category: [ 'DeFi' ],
      name: 'Spark Uncommon Swapper',
      description: 'Swapped 10+ times on Spark',
      link: 'https://bafybeib3pth6j3wmt5a4xdmx2zoc7hkykhqewknhurmj3s7v7p6wvsbonq.ipfs.nftstorage.link/',
      type: 'invoke',
      conditions: {
        contractAddress: '3PGFHzVGT4NTigwCKP1NcwoXkodVZwvBuuU',
        functionName: 'swap',
        minTxAmount: 10
      }
    },
    {
      id: 10,
      category: [ 'General' ],
      name: 'FUEL Since 2022',
      description: 'Created the first FUEL transaction in 2022',
      link: 'https://bafybeibt33ggh5djj5tpxcbwty36dmar55xhjg4o3ku67ai3dqscgvpb6a.ipfs.nftstorage.link/',
      type: 'firstTransaction',
      conditions: {
        startDate: '2022-01-01T00:00:00.000Z',
        endDate: '2022-12-31T23:59:00.000Z'
      }
    },
    {
      id: 11,
      category: [ 'General' ],
      name: 'Fuel Smart Contract Deployer',
      description: 'Deployed 1+ smart contracts on fuel',
      link: 'https://bafkreieoxqr5po3mqu5ktjhnws57cdewej5wowwtgmwvwvu7onxjv3ufy4.ipfs.nftstorage.link/',
      type: 'transactions',
      conditions: { txType: 'set-script', minTxAmount: 1 }
    },
    {
      id: 12,
      category: [ 'Ecosystem' ],
      name: 'Namespace Hero',
      description: 'Mint 1+ NFT-name on Meedus namespace',
      link: 'https://bafybeigr3oksy4uhxqngrrkqhvjibq3uolx4xu4hcumiu6elqzc36srdkq.ipfs.nftstorage.link/',
      type: 'invoke',
      conditions: {
        contractAddress: '3PGKEe4y59V3WLnHwPEUaMWdbzy8sb982fG',
        functionName: 'mint',
        minTxAmount: 1
      }
    },
    {
      id: 2,
      category: [ 'General' ],
      name: 'Waves Uncommon User',
      description: 'Created 100+ transactions on fuel',
      link: 'https://bafybeig6r5cprdalzv4z7fg4hm5m3vcp54vtt4ehvnaqxpuuhycn5blmpu.ipfs.nftstorage.link/',
      type: 'transactions',
      conditions: { txType: 'all', minTxAmount: 100 }
    },
    {
      id: 3,
      category: [ 'DeFi' ],
      name: 'Puzzle Staker',
      description: 'Staked PUZZLE 1+ times on PUZZLESWAP',
      link: 'https://bafybeigu24mgtptcmtbmhbprppisqslofc4ogevp3pz6piwnwyd4ktd4qu.ipfs.nftstorage.link/',
      type: 'invoke',
      conditions: {
        contractAddress: '3PFTbywqxtFfukX3HyT881g4iW5K4QL3FAS',
        functionName: 'stake',
        minTxAmount: 1
      }
    },
    {
      id: 4,
      category: [ 'General' ],
      name: 'FUEL Since 2016',
      description: 'Created the first FUEL transaction in 2016',
      link: 'https://bafybeic5llsha4dk7nfsy3h5ixrgod23i2dabqkdgoirlt4emkhyg2dtyi.ipfs.nftstorage.link/',
      type: 'firstTransaction',
      conditions: {
        startDate: '2016-01-01T00:00:00.000Z',
        endDate: '2016-12-31T23:59:00.000Z'
      }
    },
    {
      id: 5,
      category: [ 'General' ],
      name: 'FUEL Since 2017',
      description: 'Created the first FUEL transaction in 2017',
      link: 'https://bafybeihddu6gdrehalzeenwuankforbqdfdpc26ejwk3wlufrwdcb2tusi.ipfs.nftstorage.link/',
      type: 'firstTransaction',
      conditions: {
        startDate: '2017-01-01T00:00:00.000Z',
        endDate: '2017-12-31T23:59:00.000Z'
      }
    },
    {
      id: 6,
      category: [ 'General' ],
      name: 'FUEL Since 2018',
      description: 'Created the first FUEL transaction in 2018',
      link: 'https://bafybeifksllhhw677apxnxjupof32kvzgs72fh47kqtim367j745t62s4y.ipfs.nftstorage.link/',
      type: 'firstTransaction',
      conditions: {
        startDate: '2018-01-01T00:00:00.000Z',
        endDate: '2018-12-31T23:59:00.000Z'
      }
    },
    {
      id: 7,
      category: [ 'General' ],
      name: 'FUEL Since 2019',
      description: 'Created the first FUEL transaction in 2019',
      link: 'https://bafybeico2jp55bbgumuhbou6qm7dvfj7o6zkdq7urdn556yainkv2mcpqq.ipfs.nftstorage.link/',
      type: 'firstTransaction',
      conditions: {
        startDate: '2019-01-01T00:00:00.000Z',
        endDate: '2019-12-31T23:59:00.000Z'
      }
    },
    {
      id: 8,
      category: [ 'General' ],
      name: 'FUEL Since 2020',
      description: 'Created the first FUEL transaction in 2020',
      link: 'https://bafybeiadnqnbyfny5tspwxdvks3lxlthmueyzt7kdodqtdde76v5kx3zhm.ipfs.nftstorage.link/',
      type: 'firstTransaction',
      conditions: {
        startDate: '2020-01-01T00:00:00.000Z',
        endDate: '2020-12-31T23:59:00.000Z'
      }
    },
    {
      id: 9,
      category: [ 'General' ],
      name: 'FUEL Since 2021',
      description: 'Created the first FUEL transaction in 2021',
      link: 'https://bafybeidygvlzwokwck2cd6tr2rqjn6wrfcfz74voxveaser242ya2z35yu.ipfs.nftstorage.link/',
      type: 'firstTransaction',
      conditions: {
        startDate: '2021-01-01T00:00:00.000Z',
        endDate: '2021-12-31T23:59:00.000Z'
      }
    }
  ]
  return data
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

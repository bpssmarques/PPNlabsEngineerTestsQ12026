export interface FixtureEvent {
  blockNumber: number;
  logIndex: number;
  txHash: string;
  timestamp: number;
  event: "Deposit" | "Withdraw";
  user: string;
  assets: string;
  shares: string;
}

export interface CandidateConfig {
  seed: number;
  token: {
    symbol: string;
    decimals: number;
  };
  vault: {
    feeBps: number;
  };
  demo: {
    address: string;
  };
}

export interface UserPosition {
  address: string;
  totalDeposited: string;
  totalWithdrawn: string;
  currentShares: string;
  lastActivityAt: string;
}

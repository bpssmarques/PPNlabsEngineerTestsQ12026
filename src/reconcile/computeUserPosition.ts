import {CandidateConfig, FixtureEvent, UserPosition} from "./types";

export function computeUserPosition(
  user: string,
  fixtures: FixtureEvent[],
  config: CandidateConfig
): UserPosition {
  void fixtures;
  void config;

  // TODO(candidate): implement deterministic reconciliation.
  return {
    address: user.toLowerCase(),
    totalDeposited: "0",
    totalWithdrawn: "0",
    currentShares: "0",
    lastActivityAt: "0"
  };
}

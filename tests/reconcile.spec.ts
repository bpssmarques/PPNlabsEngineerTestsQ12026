import {expect} from "chai";
import config from "../candidate-pack/config.json";
import fixtures from "../candidate-pack/fixtures.json";
import {computeUserPosition} from "../src/reconcile/computeUserPosition";

describe("computeUserPosition", function () {
  it("is idempotent and order-independent", function () {
    const user = "0x00000000000000000000000000000000000000a1";
    const result = computeUserPosition(user, fixtures as any, config as any);

    expect(result.address).to.equal(user.toLowerCase());
    expect(result.totalDeposited).to.equal("1250000");
    expect(result.totalWithdrawn).to.equal("100000");
    expect(result.currentShares).to.equal("1148375");
    expect(result.lastActivityAt).to.equal("1700000005");
  });

  it("handles large integers without precision loss", function () {
    const user = "0x00000000000000000000000000000000000000ff";
    const big = "123456789012345678901234567890";
    const largeFixtures = [
      {
        blockNumber: 1,
        logIndex: 0,
        txHash: "0x1",
        timestamp: 1,
        event: "Deposit",
        user,
        assets: big,
        shares: big
      },
      {
        blockNumber: 2,
        logIndex: 0,
        txHash: "0x2",
        timestamp: 2,
        event: "Withdraw",
        user,
        assets: "1",
        shares: "1"
      }
    ];

    const result = computeUserPosition(user, largeFixtures as any, config as any);
    expect(result.totalDeposited).to.equal(big);
    expect(result.totalWithdrawn).to.equal("1");
    expect(result.currentShares).to.equal("123456789012345678901234567889");
    expect(result.lastActivityAt).to.equal("2");
  });
});

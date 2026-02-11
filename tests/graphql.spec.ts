import {expect} from "chai";
import {createServer} from "../src/graphql/server";

describe("GraphQL userPosition", function () {
  it("resolves userPosition(address) from candidate fixtures", async function () {
    const server = createServer();

    const response = await server.executeOperation({
      query: `
        query Position($address: String!) {
          userPosition(address: $address) {
            address
            totalDeposited
            totalWithdrawn
            currentShares
            lastActivityAt
          }
        }
      `,
      variables: {
        address: "0x00000000000000000000000000000000000000a1"
      }
    });

    expect(response.body.kind).to.equal("single");
    if (response.body.kind !== "single") {
      throw new Error("unexpected multipart response");
    }

    expect(response.body.singleResult.errors).to.equal(undefined);
    expect(response.body.singleResult.data).to.deep.equal({
      userPosition: {
        address: "0x00000000000000000000000000000000000000a1",
        totalDeposited: "1250000",
        totalWithdrawn: "100000",
        currentShares: "1148375",
        lastActivityAt: "1700000005"
      }
    });

    await server.stop();
  });
});

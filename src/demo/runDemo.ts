import {mkdir, writeFile} from "node:fs/promises";
import config from "../../candidate-pack/config.json";
import {createServer} from "../graphql/server";
import {typeDefs} from "../graphql/schema";

async function main() {
  const server = createServer();
  const address = (config as any).demo.address;
  const query =
    "query Position($address: String!) { userPosition(address: $address) { address totalDeposited totalWithdrawn currentShares lastActivityAt } }";

  const response = await server.executeOperation({
    query,
    variables: {address}
  });

  await mkdir("artifacts", {recursive: true});
  await writeFile("artifacts/schema.graphql", `${typeDefs.trim()}\n`, "utf8");

  const result = response.body.kind === "single" ? response.body.singleResult : {errors: [{message: "unexpected multipart"}]};
  const markdown = [
    "# Test 1 Demo",
    "",
    "## Query",
    "```graphql",
    query,
    "```",
    "",
    "## Variables",
    "```json",
    JSON.stringify({address}, null, 2),
    "```",
    "",
    "## Result",
    "```json",
    JSON.stringify(result, null, 2),
    "```",
    ""
  ].join("\n");

  await writeFile("artifacts/demo.md", markdown, "utf8");
  process.stdout.write(markdown);
  await server.stop();
}

main().catch((err) => {
  console.error(err);
  process.exitCode = 1;
});

import { runTestsForContext } from "../utils";
import { shardConfigs } from "../config";

export function parseArgs(args: string[]): void {
  const contextArg = args[0];

  if (!contextArg) {
    console.error(
      "Please specify a context: content-validation, user-flows, or interactions"
    );
    console.error("Usage: npx ts-node run-sharded-tests.ts <context-name>");
    console.error(
      `Available contexts: ${Object.keys(shardConfigs).join(", ")}`
    );
    process.exit(1);
  }

  if (!shardConfigs[contextArg]) {
    console.error(`Unknown context: ${contextArg}`);
    console.error(
      `Available contexts: ${Object.keys(shardConfigs).join(", ")}`
    );
    process.exit(1);
  }

  const success = runTestsForContext(contextArg);

  if (!success) {
    console.error(`Tests for ${contextArg} failed`);
    process.exit(1);
  } else {
    console.log(`Tests for ${contextArg} completed successfully`);
    process.exit(0);
  }
}

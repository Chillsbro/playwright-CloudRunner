import { execSync } from "child_process";
import * as fs from "fs";
import * as path from "path";
import { countTestFiles } from "../file/fileUtils";
import { calculateShards } from "../shard/shardUtils";
import { getShardConfig } from "../../config/shardConfig";

export function runShard(
  contextName: string,
  shardIndex: number,
  totalShards: number
): boolean {
  const config = getShardConfig(contextName);
  if (!config) {
    console.error(`Unknown context: ${contextName}`);
    return false;
  }

  console.log(`Running ${contextName} shard ${shardIndex}/${totalShards}`);

  try {
    if (!fs.existsSync(config.testDir)) {
      console.warn(
        `Test directory ${config.testDir} does not exist. Skipping shard ${shardIndex}/${totalShards}.`
      );
      return true;
    }

    execSync(
      `npx playwright test ${path.relative(
        process.cwd(),
        config.testDir
      )} --shard=${shardIndex}/${totalShards}`,
      { stdio: "inherit" }
    );
    return true;
  } catch (error) {
    console.error(
      `Error running shard ${shardIndex}/${totalShards} for ${contextName}:`,
      error
    );
    return false;
  }
}

export function runTestsForContext(contextName: string): boolean {
  const config = getShardConfig(contextName);
  if (!config) {
    console.error(`Unknown context: ${contextName}`);
    process.exit(1);
  }

  const totalTests = countTestFiles(config.testDir);
  const totalShards = calculateShards(config.testDir, config.shardSize);

  console.log(`Context: ${contextName}`);
  console.log(`Total tests: ${totalTests}`);
  console.log(`Shard size: ${config.shardSize}`);
  console.log(`Total shards: ${totalShards}`);

  if (totalTests === 0) {
    console.log(
      `No tests found in ${config.testDir}. Skipping test execution.`
    );
    return true;
  }

  // Run each shard sequentially, while capturing the result for each shard,
  // so that we can continue testing other shards even if one fails
  let allShardsSucceeded = true;
  try {
    for (let i = 1; i <= totalShards; i++) {
      try {
        const shardSuccess = runShard(contextName, i, totalShards);
        if (!shardSuccess) {
          console.error(`Shard ${i}/${totalShards} failed`);
          allShardsSucceeded = false;
        }
      } catch (error) {
        console.error(`Shard ${i}/${totalShards} failed with: ${error}`);
        allShardsSucceeded = false;
        // Continue with the next shard instead of exiting immediately upon failure
      }
    }

    if (!allShardsSucceeded) {
      console.error(`Some shards failed for context: ${contextName}`);
      return false;
    }

    return true;
  } catch (error) {
    console.error(`Error running tests for context ${contextName}: ${error}`);
    return false;
  }
}

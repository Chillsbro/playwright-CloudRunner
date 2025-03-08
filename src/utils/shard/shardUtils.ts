import { countTestFiles } from "../file/fileUtils";
export function calculateShards(testDir: string, shardSize: number): number {
  try {
    const totalTests = countTestFiles(testDir);

    // If there are no tests, return 1 shard as the base case, but will be skipped in runTestsForContext
    if (totalTests === 0) {
      console.log(`No tests found in ${testDir}. Setting to 1 shard.`);
      return 1;
    }
    const totalShards = Math.max(1, Math.ceil(totalTests / shardSize));

    console.log(
      `Directory: ${testDir}, Test Files: ${totalTests}, Shard Size: ${shardSize}, Total Shards: ${totalShards}`
    );

    return totalShards;
  } catch (error) {
    console.error(`Error calculating shards for ${testDir}:`, error);
    return 1;
  }
}

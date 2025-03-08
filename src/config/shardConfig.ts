import * as path from "path";
import { shardParams } from "../interface/shard/shardParams";

export const shardConfigs: Record<string, shardParams> = {
  "content-validation": {
    testDir: path.join(process.cwd(), "tests", "content-validation"),
    shardSize: 40,
  },
  "user-flows": {
    testDir: path.join(process.cwd(), "tests", "user-flows"),
    shardSize: 20,
  },
  interactions: {
    testDir: path.join(process.cwd(), "tests", "interactions"),
    shardSize: 40,
  },
};


export function getShardConfig(contextName: string): shardParams | undefined {
  return shardConfigs[contextName];
}

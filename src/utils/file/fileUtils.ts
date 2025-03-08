import * as fs from "fs";
import * as path from "path";


export function countTestFiles(
  dir: string,
  filePattern: string = ".spec.ts"
): number {
  if (!fs.existsSync(dir)) {
    console.warn(`Test directory ${dir} does not exist`);
    return 0;
  }

  let count = 0;
  const files = fs.readdirSync(dir);

  for (const file of files) {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);

    if (stat.isDirectory()) {
      count += countTestFiles(filePath, filePattern);
    } else if (file.endsWith(filePattern)) {
      count++;
    }
  }

  return count;
}

export function getTestFiles(
  dir: string,
  filePattern: string = ".spec.ts"
): string[] {
  if (!fs.existsSync(dir)) {
    console.warn(`Test directory ${dir} does not exist`);
    return [];
  }

  let results: string[] = [];
  const list = fs.readdirSync(dir);

  list.forEach((file) => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);

    if (stat && stat.isDirectory()) {
      results = results.concat(getTestFiles(filePath, filePattern));
    } else if (file.endsWith(filePattern)) {
      results.push(filePath);
    }
  });

  return results;
}

import assert from "node:assert/strict";
import { readFileSync, readdirSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const rootPath = join(dirname(__filename), "../");

/**
 * You can use this script to help upgrading a package on which patches have
 * been applied with `patch-package`. It will attempt to detect the diffs in a
 * patch file one by one in the node module, regardless of the file names
 * (because the files may have been renamed).
 *
 * Workflow:
 * 1. Move the patch file(s) from the root `patches` folder into the
 *    `scripts/patches` folder
 * 2. Upgrade the dependency. Because the patch file has been moved, it won’t
 *    be applied automatically on postinstall.
 * 3. Run this script via `npx tsx scripts/apply-patches.ts`. The old patch file
 *    will be applied to the newly updated dependency on a “best effort” basis.
 * 4. Run `npx patch-package some-package` to generate the updated new patch file.
 * 5. Now you can delete the old patch file from the `scripts/patches` folder
 * 6. Carefully check the git diff of the generated patch file. If the upgrade
 *    did not affect the patch, you would expect to see no changes in line
 *    additions and deletions, only for line numbers and file names. You can
 *    check the git diff by (temporarily) renaming the patch file to the
 *    previous patch file name.
 */

const patches = readdirSync(join(rootPath, "scripts/patches"));

type Diff = { filePath: string; lines: string[] };

const diffs: Diff[] = [];

for (const patch of patches) {
  const patchPath = join(rootPath, "scripts/patches", patch);
  const patchContent = readFileSync(patchPath, "utf8");
  const lines = patchContent.split("\n");
  for (let i = 0; i < lines.length; i += 1) {
    const line = lines[i];
    assert(line != null);

    const { filePath, isStartOfFileDiff } = getIsStartOfFileDiff(i, lines);
    if (isStartOfFileDiff) {
      const firstLine = lines[i + 5];
      assert(firstLine != null);
      diffs.push({ filePath, lines: [firstLine] });
      i += 5;
    } else if (line.startsWith("@@")) {
      const currentDiff = diffs[diffs.length - 1];
      assert(currentDiff != null);
      const firstLine = lines[i + 1];
      assert(firstLine != null);
      diffs.push({ filePath: currentDiff.filePath, lines: [firstLine] });
      i += 1;
    } else {
      const currentDiff = diffs[diffs.length - 1];
      assert(currentDiff != null);
      currentDiff.lines.push(line);
    }
  }
}

const npmPackageFilePaths: string[] = [];

const npmPackageName = diffs[0]?.filePath.split("/")[2];
assert(npmPackageName != null);

getNpmPackageFiles(join(rootPath, "node_modules", npmPackageName));

function getNpmPackageFiles(folderPath: string) {
  for (const file of readdirSync(folderPath, { withFileTypes: true })) {
    if (file.isDirectory()) {
      getNpmPackageFiles(join(folderPath, file.name));
    } else {
      npmPackageFilePaths.push(join(folderPath, file.name));
    }
  }
}

for (const diff of diffs) {
  const find = diff.lines
    .filter((line) => !line.startsWith("+"))
    .map((line) => line.slice(1))
    .join("\n");
  const replaceWith = diff.lines
    .filter((line) => !line.startsWith("-"))
    .map((line) => line.slice(1))
    .join("\n");
  const npmPackageFileContents = npmPackageFilePaths.map((filePath) => ({
    filePath,
    content: readFileSync(filePath, "utf8"),
  }));
  const file = npmPackageFileContents.find((file) =>
    file.content.includes(find),
  );
  if (file == null) {
    console.log("No file found for", find);
  } else {
    writeFileSync(file.filePath, file.content.replace(find, replaceWith));
  }
}

function getIsStartOfFileDiff(index: number, lines: string[]) {
  if (
    lines[index]?.startsWith("diff ") &&
    lines[index + 1]?.startsWith("index ") &&
    lines[index + 2]?.startsWith("--- a") &&
    lines[index + 3]?.startsWith("+++ b") &&
    lines[index + 4]?.startsWith("@@ ")
  ) {
    const filePath = lines[index + 2]?.slice("--- a".length);
    assert(
      filePath != null && filePath === lines[index + 3]?.slice("+++ b".length),
      "Unknown diff format",
    );
    return { isStartOfFileDiff: true as const, filePath };
  }
  return { isStartOfFileDiff: false as const, filePath: null };
}

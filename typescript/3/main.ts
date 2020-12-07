import * as fs from "fs";

const FILENAME = "../input/3.input.txt";

const parseInput = (filename: string) => {
  return fs
    .readFileSync(filename, "utf-8")
    .split("\n")
    .filter((l) => l.length);
};

const trees = parseInput(FILENAME);
const width = trees[0].length;
const slope = { x: 3, y: 1 };
const pos = { x: 0, y: 0 };
let count = 0;

while (true) {
  pos.y += slope.y;
  if (pos.y >= trees.length) break;

  pos.x += slope.x;
  if (pos.x >= width) pos.x -= width;

  if (trees[pos.y][pos.x] === "#") count++;
}

console.log("count", count);

// ans 228

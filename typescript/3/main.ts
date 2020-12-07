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

type Coord = { x: number; y: number };

const countTreeCollisions = (slope: Coord): number => {
  const pos = { x: 0, y: 0 };
  let count = 0;

  while (true) {
    pos.y += slope.y;
    if (pos.y >= trees.length) break;

    pos.x += slope.x;
    if (pos.x >= width) pos.x -= width;

    if (trees[pos.y][pos.x] === "#") count++;
  }
  return count;
};

// ans 228
console.log("part 1", countTreeCollisions({ x: 3, y: 1 }));

const slopes = [
  { x: 1, y: 1 },
  { x: 3, y: 1 },
  { x: 5, y: 1 },
  { x: 7, y: 1 },
  { x: 1, y: 2 },
];

const part2 = slopes.map(countTreeCollisions).reduce((sum, c) => sum * c);

// ans 6818112000
console.log("part2", part2);

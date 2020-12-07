import * as fs from "fs";

const FILENAME = "../../input/3.input.txt";

const parseInput = (filename: string) => {
  return fs
    .readFileSync(filename, "utf-8")
    .split("\n")
    .filter((l) => l.length);
};

const trees = parseInput(FILENAME);
const width = trees[0].length;
const slope = 3;
let count = 0;
let column = 0;

trees.slice(1).forEach((row) => {
  column += slope;
  if (column >= width) column -=width;
  if (row[column] === "#") count ++;
})

console.log("count", count);

// not 38
// not 93

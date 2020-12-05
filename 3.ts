import * as fs from "fs";

type TreeLoc = Set<string>;
type Coord = { x: number; y: number };

const parseTreeMap = (file: string) => {
  const lines = file.split("\n").filter((line) => line.length > 0);
  const width = lines[0].length;

  const treeLoc = new Set<string>();
  lines.forEach((line, y) => {
    line.split("").forEach((char, x) => {
      if (char === "#") treeLoc.add(`${x},${y}`);
    });
  });

  return { treeLoc, width, height: lines.length };
};

const makeIsTreeAt = (treeLoc: TreeLoc, width: number) => ({ x, y }: Coord) => {
  while (x >= width) {
    x -= width;
  }
  return treeLoc.has(`${x},${y}`);
};

const file = fs.readFileSync("./3.input.txt", "utf-8");
const { treeLoc, width, height } = parseTreeMap(file);
const isTreeAtLocation = makeIsTreeAt(treeLoc, width);

let treeCount = 0;
const curPos = { x: 0, y: 0 };
while (curPos.y < height) {
  if (isTreeAtLocation(curPos)) treeCount += 1;
  curPos.x += 1;
  curPos.y += 3;
}

// not 38

console.log("treeCount", treeCount);

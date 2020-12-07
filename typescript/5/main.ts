import * as fs from "fs";

const FILENAME = "../input/5.input.txt";

const parseInput = (filename: string) => {
  return fs
    .readFileSync(filename, "utf-8")
    .split("\n")
    .filter((l) => l.length);
};

type Pass = { row: number; col: number };
type Range = { lower: number; upper: number };

const parsePass = (pass: string): Pass => {
  let row: number | Range = { lower: 0, upper: 127 };
  pass
    .slice(0, 7)
    .split("")
    .forEach((letter) => {
      if (typeof row === "number") throw new Error("couldn't parse pass row");
      row = binarySplit(row, letter === "F");
    });

  let col: number | Range = { lower: 0, upper: 7 };
  pass
    .slice(7, 10)
    .split("")
    .forEach((letter) => {
      if (typeof col === "number") throw new Error("couldn't parse pass col");
      col = binarySplit(col, letter === "L");
    });

  if (typeof row !== "number" || typeof col !== "number")
    throw new Error("couldn't parse pass");

  return { row, col };
};

// will blow up if not given a even number
const binarySplit = ({ lower, upper }: Range, takeLower: boolean) => {
  const range = upper + 1 - lower;
  if (range == 2) return takeLower ? lower : upper;

  let newRange;
  if (takeLower) {
    newRange = { lower, upper: upper - range / 2 };
  } else {
    newRange = { lower: lower + range / 2, upper };
  }
  return newRange;
};

const calcPassId = ({ row, col }: Pass): number => row * 8 + col;

const bordingPasses = parseInput(FILENAME);

let maxId = 0;
bordingPasses.forEach((p) => {
  const pass = parsePass(p);
  const id = calcPassId(pass);
  if (id > maxId) maxId = id;
});

// ans 996
console.log("part 1: ", maxId);

// -- part 2 --

const seatMap = Array.from(Array(128)).map(() =>
  Array.from(Array(8)).map(() => " ")
);

bordingPasses.forEach((p) => {
  const pass = parsePass(p);
  seatMap[pass.row][pass.col] = "#";
});

let printableSeatMap = "";
seatMap.forEach((row, rowIndex) => {
  if (rowIndex % 8 === 0) {
    printableSeatMap += "\n";
  }
  row.forEach((seat, colIndex) => {
    if (colIndex === 4) {
      printableSeatMap += " ";
    }
    printableSeatMap += seat;
  });
  printableSeatMap += ` [row ${rowIndex}]\n`;
});

console.log("printableSeatMap", printableSeatMap);

// from the printed map
const mySeat = { row: 83, col: 7 };

// ans 671
console.log("part 2: ", calcPassId(mySeat));

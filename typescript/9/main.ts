import * as fs from "fs";

const FILENAME = "../input/9.input.txt";
const PREAMBLE_LENGTH = 25;

const parseInput = (filename: string) => {
  return fs
    .readFileSync(filename, "utf-8")
    .split("\n")
    .filter((r) => r.length)
    .map((line) => parseInt(line, 10));
};

const nums = parseInput(FILENAME);

const isValid = (num: number, trailingNums: number[]) => {
  for (const i in trailingNums) {
    const n1 = trailingNums[i];
    const nums2 = [...trailingNums];
    nums2.splice(parseInt(i), 1);
    for (const n2 of nums2) {
      if (n1 + n2 === num) {
        return true;
      }
    }
  }
  return false;
};

let ptr = PREAMBLE_LENGTH;
while (ptr < nums.length) {
  const num = nums[ptr];
  const trailingNums = nums.slice(ptr - PREAMBLE_LENGTH, ptr);

  if (!isValid(num, trailingNums)) {
    console.log("part 1: ", num);
    break
  }

  ptr++;
}

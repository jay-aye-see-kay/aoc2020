import * as fs from "fs";

const FILENAME = "../input/6.input.txt";

const parseInput = (filename: string) => {
  return fs
    .readFileSync(filename, "utf-8")
    .split("\n\n")
    .map((group) => {
      const answers = group.split("\n");
      return answers.map((ans) => new Set(ans));
    });
};

const groups = parseInput(FILENAME);

const groupTotals = groups.map((group) => {
  const sharedAnswers = group.reduce(
    (acc, answer) => new Set([...acc, ...answer])
  );
  return sharedAnswers.size;
});

// ans 6633
console.log(
  "part 1: ",
  groupTotals.reduce((sum, t) => sum + t)
);

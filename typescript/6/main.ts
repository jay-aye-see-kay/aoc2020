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

const sum = (a: number[]) => a.reduce((sum, n) => sum + n);

// ans 6633
console.log("part 1: ", sum(groupTotals));

// -- part 2 --

const intersect = (a: Set<string>, b: Set<string>) =>
  new Set([...a].filter((x) => b.has(x)));

const groupTotals2 = groups.map((group) => {
  const sharedAnswers = group.reduce((acc, answer) => {
    return intersect(acc, answer);
  });
  return sharedAnswers.size;
});

// ans 3202
console.log("part 2: ", sum(groupTotals2));

import * as fs from "fs";

const FILENAME = "../input/7.input.txt";

type Condition = { count: number; bagName: string };
type Rules = Record<string, Condition[]>;

const parseInput = (filename: string) => {
  return fs
    .readFileSync(filename, "utf-8")
    .split("\n")
    .filter((r) => r.length);
};

const parseRule = (ruleStr: string) => {
  const [bagName, condStr] = ruleStr.split(" bags contain ");

  if (condStr === "no other bags.") return { bagName, conditions: [] };

  const conditions = condStr.split(", ").map((cond) => {
    const condArr = cond.split(" ");
    return {
      count: parseInt(condArr[0], 10),
      bagName: condArr.filter((cond) => !cond.match(/\d|bags?.?/)).join(" "),
    };
  });

  return { bagName, conditions };
};

const rules = parseInput(FILENAME).reduce((acc, rule) => {
  const { bagName, conditions } = parseRule(rule);
  acc[bagName] = conditions;
  return acc;
}, {} as Rules);
const bags = Object.keys(rules);

const getParents = (bagName: string): string[] =>
  bags.filter((bag) => rules[bag].map((c) => c.bagName).includes(bagName));

const allBagsFound = new Set();
let bagsJustFound = ["shiny gold"];

while (bagsJustFound.length) {
  const bagsToLookUp = bagsJustFound;
  bagsJustFound = [];
  bagsToLookUp.forEach((bag) => {
    bagsJustFound.push(...getParents(bag));
  });

  bagsJustFound.forEach((b) => allBagsFound.add(b));
}

// ans 115
console.log("part 1: ", allBagsFound.size);

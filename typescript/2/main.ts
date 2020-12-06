import * as fs from "fs";

type Policy = {
  letter: string;
  lower: number;
  upper: number;
};

const parsePolicy = (policyStr: string): Policy => {
  const [range, letter] = policyStr.split(" ");
  const [lower, upper] = range.split("-");
  return {
    letter,
    lower: parseInt(lower, 10),
    upper: parseInt(upper, 10),
  };
};

const isPasswordValid = (password: string, policy: Policy): boolean => {
  const count = password.split("").reduce((sum, l) => {
    return policy.letter === l ? sum + 1 : sum;
  }, 0);
  return count >= policy.lower && count <= policy.upper;
};

const file = fs.readFileSync("./2/input.txt", "utf-8");
const lines = file.split("\n").filter((line) => line.length > 0);

let validCount = 0;

lines.forEach((line) => {
  const [policyStr, password] = line.split(": ");
  const policy = parsePolicy(policyStr);
  if (isPasswordValid(password, policy)) {
    validCount++;
  }
});

console.log("part 1 answer:", validCount);

const isPasswordValid2 = (password: string, policy: Policy): boolean => {
  const lowerMatch = password[policy.lower - 1] === policy.letter;
  const upperMatch = password[policy.upper - 1] === policy.letter;

  if (lowerMatch && upperMatch) return false;
  return lowerMatch || upperMatch;
};

let validCount2 = 0;

lines.forEach((line) => {
  const [policyStr, password] = line.split(": ");
  const policy = parsePolicy(policyStr);
  if (isPasswordValid2(password, policy)) {
    validCount2++;
  }
});

console.log("part 2 answer:", validCount2);

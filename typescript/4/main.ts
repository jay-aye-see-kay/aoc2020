import * as fs from "fs";

const FILENAME = "../input/4.input.txt";

const parseInput = (filename: string) => {
  return fs
    .readFileSync(filename, "utf-8")
    .split("\n\n")
    .map((p) => p.replace(/\n/g, " "));
};

const requiredFields = ["byr", "iyr", "eyr", "hgt", "hcl", "ecl", "pid"];

const hasField = (checkField: string, passportFields: string[]) =>
  passportFields.some((pf) => pf.startsWith(checkField));

const isPassportValid = (passport: string) => {
  const passportFields = passport.split(" ").filter((f) => f.length);
  return requiredFields.every((rf) => hasField(rf, passportFields));
};

const passports = parseInput(FILENAME);

const validPasspostCount = passports
  .map(isPassportValid)
  .reduce((sum, valid) => (valid ? sum + 1 : sum), 0);

console.log("part 1: ", validPasspostCount);

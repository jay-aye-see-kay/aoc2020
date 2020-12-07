import * as fs from "fs";

const FILENAME = "../input/4.input.txt";

const parseInput = (filename: string) => {
  return fs
    .readFileSync(filename, "utf-8")
    .split("\n\n")
    .map((p) => p.replace(/\n/g, " "));
};

const requiredFields = [
  "byr",
  "iyr",
  "eyr",
  "hgt",
  "hcl",
  "ecl",
  "pid",
] as const;

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

// ans 210
console.log("part 1: ", validPasspostCount);

// --- part 2 ---

const validate = {
  byr: (input: string) => {
    const asNum = parseInt(input, 10);
    return asNum >= 1920 && asNum <= 2002;
  },
  iyr: (input: string) => {
    const asNum = parseInt(input, 10);
    return asNum >= 2010 && asNum <= 2020;
  },
  eyr: (input: string) => {
    const asNum = parseInt(input, 10);
    return asNum >= 2020 && asNum <= 2030;
  },
  hgt: (input: string) => {
    const height = parseInt(input.slice(0, input.length - 2), 10);
    const unit = input.slice(input.length - 2);
    switch (unit) {
      case "cm":
        return height >= 150 && height <= 193;
      case "in":
        return height >= 59 && height <= 76;
      default:
        return false;
    }
  },
  hcl: (input: string) => !!input.match(/^#[a-fA-F0-9]{6}$/),
  ecl: (input: string) => {
    const validEyeColors = ["amb", "blu", "brn", "gry", "grn", "hzl", "oth"];
    return validEyeColors.includes(input);
  },
  pid: (input: string) => !!input.match(/^[0-9]{9}$/),
};

const isPassportReallyValid = (passport: string) => {
  const passportFields = passport.split(" ").filter((f) => f.length);

  const validations = requiredFields.map((requiredField) => {
    const field = passportFields.find((pf) => pf.startsWith(requiredField));
    if (!field) return false;

    const [_, fieldValue] = field.split(":");
    return validate[requiredField](fieldValue);
  });

  return validations.every((v) => v === true);
};

const validPasspostCount2 = passports
  .map(isPassportReallyValid)
  .reduce((sum, valid) => (valid ? sum + 1 : sum), 0);

// ans 131
console.log("part 2: ", validPasspostCount2);

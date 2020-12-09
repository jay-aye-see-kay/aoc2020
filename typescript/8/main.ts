import * as fs from "fs";

const FILENAME = "../input/8.input.txt";

const validOperations = ["nop", "acc", "jmp"] as const;
type Operation = typeof validOperations[number];
type Instruction = { op: Operation; arg: number };

const isOpValid = (op: any): op is Operation => validOperations.includes(op);

const assertNever = (x: never): never => {
  throw new Error("Unexpected object: " + JSON.stringify(x));
};

const parseInput = (filename: string): Instruction[] => {
  return fs
    .readFileSync(filename, "utf-8")
    .split("\n")
    .filter((r) => r.length)
    .map((line) => {
      const [op, argStr] = line.split(" ");
      if (!isOpValid(op)) {
        throw new Error("invalid op code: " + op);
      }
      return { op, arg: parseInt(argStr, 10) };
    });
};

const instructions = parseInput(FILENAME);

let ptr = 0;
const ptrHistory: number[] = [];
let acc = 0;

while (true) {
  const instruction = instructions[ptr];

  if (ptrHistory.includes(ptr)) {
    throw new Error(
      `Loop detected at ptr: ${ptr}, (previous at ${
        ptrHistory[ptrHistory.length - 1]
      }). Accumulator value: ${acc}.`
    );
  }
  ptrHistory.push(ptr);

  switch (instruction.op) {
    case "nop":
      ptr++;
      break;
    case "jmp":
      ptr += instruction.arg;
      break;
    case "acc":
      acc += instruction.arg;
      ptr++;
      break;
    default:
      assertNever(instruction.op);
  }
}

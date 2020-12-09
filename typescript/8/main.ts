import * as fs from "fs";

const FILENAME = "../input/8.input.txt";

const validOperations = ["nop", "acc", "jmp"] as const;
type Operation = typeof validOperations[number];
type Instruction = { op: Operation; arg: number };
type Result =
  | { kind: "success"; acc: number }
  | { kind: "failure"; acc: number; message: string };

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

const runInstructions = (instructions: Instruction[]): Result => {
  let ptr = 0;
  const ptrHistory: number[] = [];
  let acc = 0;

  while (true) {
    if ((ptr === instructions.length)) {
      return { kind: "success", acc };
    }

    const instruction = instructions[ptr];

    if (ptrHistory.includes(ptr)) {
      const prevPtr = ptrHistory[ptrHistory.length - 1];
      return {
        kind: "failure",
        acc,
        message: `Loop detected at ptr: ${ptr}, (previous at ${prevPtr}). Accumulator value: ${acc}.`,
      };
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
};

const instructions = parseInput(FILENAME);
const part1 = runInstructions(instructions);
// ans 1087
console.log("part 1: ", part1.acc);

// -- part 2 --

const modInstruction = (i: number, instruction: Instruction): Instruction[] => {
  const newInstructions = [...instructions];
  newInstructions[i] = instruction
  return newInstructions;
}

const alternativeInstructions: Instruction[][] = [];

instructions.forEach((instruction, i) => {
  if (instruction.op === "jmp") {
    alternativeInstructions.push(modInstruction(i, {op: "nop", arg: instruction.arg }))
  }else  if (instruction.op === "nop") {
    alternativeInstructions.push(modInstruction(i, {op: "jmp", arg: instruction.arg }))
  }
})

alternativeInstructions.forEach(instructions => {
  const result = runInstructions(instructions);
  if (result.kind === "success") {
    // ans 780
    console.log("part 2: ", result.acc)
  }
})

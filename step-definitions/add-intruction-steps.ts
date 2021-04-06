import { Emulator } from '../domains/emulator/emulator';
import { InstructionFactory } from '../domains/emulator/instruction/instructionFactory';
import {
  Instruction,
  ArithmeticInstructionType,
} from '../domains/emulator/instruction/instruction';
import { InstructionSet } from '../domains/emulator/instructionSet';
import { Given } from 'cucumber';

Given(
  'an emulator with add register {word} to register {word} instruction',
  async function (r1, r2: string) {
    const instruction = InstructionFactory.buildRegisterToRegister(
      ArithmeticInstructionType.ADD,
      r1,
      r2,
    );
    this.emulator = buildEmulator(instruction);
  },
);

Given(
  'an emulator with add const {int} to register {word} instruction',
  async function (c: number, r: string) {
    const instruction = InstructionFactory.buildConstToRegister(
      ArithmeticInstructionType.ADD,
      c,
      r,
    );
    this.emulator = buildEmulator(instruction);
  },
);

Given(
  'an emulator with add const {int} to ptr {word} instruction',
  async function (c: number, reg: string) {
    const instruction = InstructionFactory.buildConstToPointer(
      ArithmeticInstructionType.ADD,
      c,
      reg,
    );
    this.emulator = buildEmulator(instruction);
  },
);

function buildEmulator(instruction: Instruction): Emulator {
  const instructionSet: InstructionSet = new InstructionSet();
  instructionSet.addInstruction(instruction);
  return new Emulator(instructionSet);
}

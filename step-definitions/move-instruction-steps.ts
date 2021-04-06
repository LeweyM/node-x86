import { Emulator } from '../domains/emulator/emulator';
import { InstructionFactory } from '../domains/emulator/instruction/instructionFactory';
import {
  Instruction,
  ArithmeticInstructionType,
} from '../domains/emulator/instruction/instruction';
import { InstructionSet } from '../domains/emulator/instructionSet';
import { Given } from 'cucumber';

Given(
  'an emulator with move const {int} to register {word} instruction',
  async function (constant: number, reg: string) {
    const instruction = InstructionFactory.buildConstToRegister(
      ArithmeticInstructionType.MOVE,
      constant,
      reg,
    );
    this.emulator = buildEmulator(instruction);
  },
);

Given('an emulator with move {word} to {word} instruction', async function (r1, r2: string) {
  const instruction = InstructionFactory.buildRegisterToRegister(
    ArithmeticInstructionType.MOVE,
    r1,
    r2,
  );
  this.emulator = buildEmulator(instruction);
});

Given(
  'an emulator with move const {int} to ptr {word} instruction',
  async function (constant: number, ptr: string) {
    const instruction = InstructionFactory.buildConstToPointer(
      ArithmeticInstructionType.MOVE,
      constant,
      ptr,
    );
    this.emulator = buildEmulator(instruction);
  },
);

function buildEmulator(instruction: Instruction): Emulator {
  const instructionSet: InstructionSet = new InstructionSet();
  instructionSet.addInstruction(instruction);
  return new Emulator(instructionSet);
}

import { Emulator } from '../domains/emulator/emulator';
import { Instruction } from '../domains/emulator/instruction/instruction';
import { InstructionSet } from '../domains/emulator/instructionSet';
import { MoveInstruction } from '../domains/emulator/instruction/moveInstruction';
import {
  ImmediateSource,
  RegisterSource,
  RegisterTarget,
} from '../domains/emulator/instruction/source';
import { Given } from 'cucumber';

Given(
  'an emulator with move const {int} to register {word} instruction',
  async function (constant: number, register: string) {
    const instruction = new MoveInstruction(
      new ImmediateSource(constant),
      new RegisterTarget(register),
    );
    this.emulator = buildEmulator(instruction);
  },
);

Given('an emulator with move {word} to {word} instruction', async function (r1, r2: string) {
  const instruction = new MoveInstruction(new RegisterSource(r1), new RegisterTarget(r2));
  this.emulator = buildEmulator(instruction);
});

Given(
  'an emulator with move const {int} to ptr {word} instruction with offset of {int}',
  async function (constant: number, register: string, offset: number) {
    const instruction = new MoveInstruction(
      new ImmediateSource(constant),
      new RegisterTarget(register, true, offset),
    );
    this.emulator = buildEmulator(instruction);
  },
);

Given(
  'an emulator with move const {int} to ptr {word} instruction',
  async function (constant: number, register: string) {
    const instruction = new MoveInstruction(
      new ImmediateSource(constant),
      new RegisterTarget(register, true, 0),
    );
    this.emulator = buildEmulator(instruction);
  },
);

function buildEmulator(instruction: Instruction): Emulator {
  const instructionSet: InstructionSet = new InstructionSet();
  instructionSet.addInstruction(instruction);
  return new Emulator(instructionSet);
}

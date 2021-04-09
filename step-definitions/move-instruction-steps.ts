import { Emulator } from '../domains/emulator/emulator';
import { InstructionSet } from '../domains/emulator/instructionSet';
import { MoveInstruction } from '../domains/emulator/instruction/moveInstruction';
import { ImmediateSource, RegisterAccessor } from '../domains/emulator/memoryAccessors';
import { Given } from 'cucumber';

Given(
  'an emulator with move const {int} to register {word} instruction',
  async function (constant: number, register: string) {
    const instructionSet = new InstructionSet();
    this.emulator = new Emulator(instructionSet);
    const instruction = new MoveInstruction(
      this.emulator,
      new ImmediateSource(constant),
      new RegisterAccessor(register),
    );
    instructionSet.addInstruction(instruction);
  },
);

Given('an emulator with move {word} to {word} instruction', async function (r1, r2: string) {
  const instructionSet = new InstructionSet();
  this.emulator = new Emulator(instructionSet);
  const instruction = new MoveInstruction(
    this.emulator,
    new RegisterAccessor(r1),
    new RegisterAccessor(r2),
  );
  instructionSet.addInstruction(instruction);
});

Given(
  'an emulator with move const {int} to ptr {word} instruction with offset of {int}',
  async function (constant: number, register: string, offset: number) {
    const instructionSet = new InstructionSet();
    this.emulator = new Emulator(instructionSet);
    const instruction = new MoveInstruction(
      this.emulator,
      new ImmediateSource(constant),
      new RegisterAccessor(register, true, offset),
    );
    instructionSet.addInstruction(instruction);
  },
);

Given(
  'an emulator with move const {int} to ptr {word} instruction',
  async function (constant: number, register: string) {
    const instructionSet = new InstructionSet();
    this.emulator = new Emulator(instructionSet);
    const instruction = new MoveInstruction(
      this.emulator,
      new ImmediateSource(constant),
      new RegisterAccessor(register, true, 0),
    );
    instructionSet.addInstruction(instruction);
  },
);

import { Emulator } from '../domains/emulator/emulator';
import { InstructionSet } from '../domains/emulator/instructionSet';
import { MoveInstruction } from '../domains/emulator/instruction/moveInstruction';
import { ImmediateSource, RegisterSource, RegisterTarget } from '../domains/emulator/source';
import { Given } from 'cucumber';

Given(
  'an emulator with move const {int} to register {word} instruction',
  async function (constant: number, register: string) {
    const instructionSet = new InstructionSet();
    this.emulator = new Emulator(instructionSet);
    const instruction = new MoveInstruction(
      this.emulator,
      new ImmediateSource(constant),
      new RegisterTarget(register),
    );
    instructionSet.addInstruction(instruction);
  },
);

Given('an emulator with move {word} to {word} instruction', async function (r1, r2: string) {
  const instructionSet = new InstructionSet();
  this.emulator = new Emulator(instructionSet);
  const instruction = new MoveInstruction(
    this.emulator,
    new RegisterSource(r1),
    new RegisterTarget(r2),
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
      new RegisterTarget(register, true, offset),
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
      new RegisterTarget(register, true, 0),
    );
    instructionSet.addInstruction(instruction);
  },
);

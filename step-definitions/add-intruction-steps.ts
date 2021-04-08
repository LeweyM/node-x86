import { Emulator } from '../domains/emulator/emulator';
import { InstructionSet } from '../domains/emulator/instructionSet';
import { AddInstruction } from '../domains/emulator/instruction/addInstruction';
import { ImmediateSource, RegisterSource, RegisterTarget } from '../domains/emulator/source';
import { Given } from 'cucumber';

Given(
  'an emulator with add register {word} to register {word} instruction',
  async function (r1, r2: string) {
    const instructionSet = new InstructionSet();
    this.emulator = new Emulator(instructionSet);
    const instruction = new AddInstruction(
      this.emulator,
      new RegisterSource(r1),
      new RegisterTarget(r2),
    );
    instructionSet.addInstruction(instruction);
  },
);

Given(
  'an emulator with add const {int} to register {word} instruction',
  async function (constant: number, register: string) {
    const instructionSet = new InstructionSet();
    this.emulator = new Emulator(instructionSet);
    const instruction = new AddInstruction(
      this.emulator,
      new ImmediateSource(constant),
      new RegisterTarget(register),
    );
    instructionSet.addInstruction(instruction);
  },
);

Given(
  'an emulator with add const {int} to ptr {word} instruction',
  async function (constant: number, register: string) {
    const instructionSet = new InstructionSet();
    this.emulator = new Emulator(instructionSet);
    const instruction = new AddInstruction(
      this.emulator,
      new ImmediateSource(constant),
      new RegisterTarget(register, true),
    );
    instructionSet.addInstruction(instruction);
  },
);

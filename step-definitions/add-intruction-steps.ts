import { Emulator } from '../domains/emulator/emulator';
import { InstructionSet } from '../domains/emulator/instructionSet';
import { AddInstruction } from '../domains/emulator/instruction/addInstruction';
import { ImmediateSource, RegisterAccessor } from '../domains/emulator/memoryAccessors';
import { RegisterId } from '../domains/emulator/registerTypes';
import { Given } from 'cucumber';

Given(
  'an emulator with add register {word} to register {word} instruction',
  async function (r1, r2: string) {
    const instructionSet = new InstructionSet();
    this.emulator = new Emulator(instructionSet);
    const instruction = new AddInstruction(
      this.emulator,
      new RegisterAccessor(r1 as RegisterId),
      new RegisterAccessor(r2 as RegisterId),
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
      new ImmediateSource(BigInt(constant)),
      new RegisterAccessor(register as RegisterId),
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
      new ImmediateSource(BigInt(constant)),
      new RegisterAccessor(register as RegisterId, true),
    );
    instructionSet.addInstruction(instruction);
  },
);

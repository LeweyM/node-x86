import { Emulator } from '../domains/emulator/emulator';
import { InstructionSet } from '../domains/emulator/instructionSet';
import { MoveInstruction } from '../domains/emulator/instruction/moveInstruction';
import { ImmediateSource, RegisterAccessor } from '../domains/emulator/memoryAccessors';
import { RegisterId } from '../domains/emulator/registers/registerConfig';
import { Given } from 'cucumber';

Given(
  'an emulator with move const {int} to register {word} instruction',
  async function (constant: number, register: string) {
    const instructionSet = new InstructionSet();
    this.emulator = new Emulator(instructionSet);
    const instruction = new MoveInstruction(
      this.emulator,
      new ImmediateSource(BigInt(constant)),
      new RegisterAccessor(register as RegisterId),
    );
    instructionSet.addInstruction(instruction);
  },
);

Given('an emulator with move {word} to {word} instruction', async function (r1, r2: string) {
  const instructionSet = new InstructionSet();
  this.emulator = new Emulator(instructionSet);
  const instruction = new MoveInstruction(
    this.emulator,
    new RegisterAccessor(r1 as RegisterId),
    new RegisterAccessor(r2 as RegisterId),
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
      new ImmediateSource(BigInt(constant)),
      new RegisterAccessor(register as RegisterId, true, offset),
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
      new ImmediateSource(BigInt(constant)),
      new RegisterAccessor(register as RegisterId, true, 0),
    );
    instructionSet.addInstruction(instruction);
  },
);

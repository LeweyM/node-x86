import { Emulator } from '../domains/emulator/emulator';
import { InstructionSet } from '../domains/emulator/instructionSet';
import { RegisterAccessor } from '../domains/emulator/memoryAccessors';
import { RegisterId } from '../domains/emulator/registers/registerConfig';
import { PushInstruction } from '../domains/emulator/instruction/pushInstruction';
import { Given, Then } from 'cucumber';
import expect from 'expect';

Given('an emulator with push instruction to {word}', async function (register: string) {
  const instructionSet = new InstructionSet();
  this.emulator = new Emulator(instructionSet);
  const instruction = new PushInstruction(
    this.emulator,
    new RegisterAccessor(register as RegisterId),
  );
  instructionSet.addInstruction(instruction);
});

Then('emulator should throw a stackoverflow error', async function () {
  expect(() => this.emulator.run()).toThrowError();
});

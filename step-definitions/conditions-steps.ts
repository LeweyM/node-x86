import { Emulator } from '../domains/emulator/emulator';
import { InstructionSet } from '../domains/emulator/instructionSet';
import { RegisterAccessor } from '../domains/emulator/memoryAccessors';
import { RegisterId } from '../domains/emulator/registers/registerConfig';
import { CompareInstruction } from '../domains/emulator/instruction/compareInstruction';
import { Given, Then } from 'cucumber';
import expect from 'expect';

Given(
  'an emulator with compare instruction of {word} and {word}',
  async function (r1: string, r2: string) {
    const instructionSet = new InstructionSet();
    this.emulator = new Emulator(instructionSet);
    const instruction = new CompareInstruction(
      this.emulator,
      new RegisterAccessor(r1 as RegisterId),
      new RegisterAccessor(r2 as RegisterId),
    );
    instructionSet.addInstruction(instruction);
  },
);

Then('zero compare code should be {word}', async function (code: string) {
  const codeSet = code == 'true';
  expect(this.emulator.zeroFlag()).toEqual(codeSet);
});
Then('negative compare code should be {word}', async function (code: string) {
  const codeSet = code == 'true';
  expect(this.emulator.signFlag()).toEqual(codeSet);
});
Then('overflow compare code should be {word}', async function (code: string) {
  const codeSet = code == 'true';
  expect(this.emulator.overflowFlag()).toEqual(codeSet);
});

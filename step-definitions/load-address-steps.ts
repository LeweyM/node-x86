import { Emulator } from '../domains/emulator/emulator';
import { LoadAddressInstruction } from '../domains/emulator/instruction/loadAddressInstruction';
import { InstructionSet } from '../domains/emulator/instructionSet';
import { RegisterAccessor } from '../domains/emulator/memoryAccessors';
import { Given } from 'cucumber';

Given(
  'an emulator with leaq instruction, left: {int}, {word}, {word}, {int}, right: {word}',
  async function (
    leftOffset: number,
    leftBaseReg: string,
    leftIndexReg: string,
    leftScale: number,
    rightReg: string,
  ) {
    const instructionSet = new InstructionSet();
    this.emulator = new Emulator(instructionSet);
    const instruction = new LoadAddressInstruction(
      this.emulator,
      new RegisterAccessor(leftBaseReg, true, leftOffset, leftScale as 1 | 2 | 4 | 8, leftIndexReg),
      new RegisterAccessor(rightReg),
    );
    instructionSet.addInstruction(instruction);
  },
);

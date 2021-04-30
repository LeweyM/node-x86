import { Emulator } from '../domains/emulator/emulator';
import { SignExtendedMoveInstruction } from '../domains/emulator/instruction/signExtendedMoveInstruction';
import { InstructionSet } from '../domains/emulator/instructionSet';
import { RegisterAccessor } from '../domains/emulator/memoryAccessors';
import { RegisterId } from '../domains/emulator/registers/registerConfig';
import { Given } from 'cucumber';

Given(
  'an emulator with sign extended move {word} to {word} instruction',
  async function (r1, r2: string) {
    const instructionSet = new InstructionSet();
    this.emulator = new Emulator(instructionSet);
    const instruction = new SignExtendedMoveInstruction(
      this.emulator,
      new RegisterAccessor(r1 as RegisterId),
      new RegisterAccessor(r2 as RegisterId),
    );
    instructionSet.addInstruction(instruction);
  },
);

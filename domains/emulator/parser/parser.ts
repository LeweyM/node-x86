import { Emulator } from '../emulator';
import { AddInstruction } from '../instruction/addInstruction';
import { MoveInstruction } from '../instruction/moveInstruction';
import { PopInstruction } from '../instruction/popInstruction';
import { PushInstruction } from '../instruction/pushInstruction';
import { InstructionSet } from '../instructionSet';
import { ImmediateSource, MemReader, MemWriter, RegisterAccessor } from '../memoryAccessors';
import { RegisterId } from '../registers/registerConfig';

export class Parser {
  toInstructions(rawInput: string): InstructionSet {
    const trimmed = rawInput.trim();
    const words = trimmed.split(' ');

    const instructions = new InstructionSet();
    const e = new Emulator(instructions); // problem

    if (trimmed.startsWith('mov')) {
      instructions.addInstruction(
        new MoveInstruction(e, this.getReaderAccessor(words[1]), this.getWriterAccessor(words[2])),
      );
      return instructions;
    } else if (trimmed.startsWith('add')) {
      instructions.addInstruction(
        new AddInstruction(e, this.getReaderAccessor(words[1]), this.getWriterAccessor(words[2])),
      );
      return instructions;
    } else if (trimmed.startsWith('push')) {
      instructions.addInstruction(new PushInstruction(e, this.getReaderAccessor(words[1])));
      return instructions;
    } else if (trimmed.startsWith('pop')) {
      instructions.addInstruction(new PopInstruction(e, this.getWriterAccessor(words[1])));
      return instructions;
    } else {
      throw new Error('cannot parse');
    }
  }

  private getWriterAccessor(input: string): MemReader & MemWriter {
    return new RegisterAccessor(input as RegisterId);
  }

  private getReaderAccessor(input: string): MemReader {
    if (input.startsWith('$')) {
      return new ImmediateSource(BigInt(parseInt(input.substring(1), 10)));
    } else {
      const register = input as RegisterId;
      return new RegisterAccessor(register);
    }
  }
}

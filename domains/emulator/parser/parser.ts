import { Emulator } from '../emulator';
import { AddInstruction } from '../instruction/addInstruction';
import { CallInstruction } from '../instruction/callInstruction';
import { CompareInstruction } from '../instruction/compareInstruction';
import { JumpInstruction } from '../instruction/jumpInstruction';
import { LoadAddressInstruction } from '../instruction/loadAddressInstruction';
import { MoveInstruction } from '../instruction/moveInstruction';
import { PopInstruction } from '../instruction/popInstruction';
import { PushInstruction } from '../instruction/pushInstruction';
import { ReturnInstruction } from '../instruction/returnInstruction';
import { SignExtendedMoveInstruction } from '../instruction/signExtendedMoveInstruction';
import { InstructionSet } from '../instructionSet';
import { ImmediateSource, MemReader, MemWriter, RegisterAccessor } from '../memoryAccessors';
import { RegisterId } from '../registers/registerConfig';

export class Parser {
  toEmulator(rawInput: string): Emulator {
    const trimmed = rawInput.trim();
    const lines = trimmed.split(/\n+/).map((l) => l.trim());
    const instructions = new InstructionSet();
    const e = new Emulator(instructions); // problem
    lines.forEach((line) => {
      this.parseLine(
        line.split(' ').filter((w) => w !== ''),
        instructions,
        e,
      );
    });
    return e;
  }

  private parseLine(line: string[], instructions: InstructionSet, e: Emulator) {
    if (line[0].startsWith('mov')) {
      instructions.addInstruction(
        new MoveInstruction(e, this.getReaderAccessor(line[1]), this.getWriterAccessor(line[2])),
      );
      return;
    } else if (line[0].startsWith('add')) {
      instructions.addInstruction(
        new AddInstruction(e, this.getReaderAccessor(line[1]), this.getWriterAccessor(line[2])),
      );
      return;
    } else if (line[0].startsWith('push')) {
      instructions.addInstruction(new PushInstruction(e, this.getReaderAccessor(line[1])));
      return;
    } else if (line[0].startsWith('pop')) {
      instructions.addInstruction(new PopInstruction(e, this.getWriterAccessor(line[1])));
      return;
    } else if (line[0].startsWith('call')) {
      instructions.addInstruction(new CallInstruction(e, line[1]));
      return;
    } else if (line[0].startsWith('ret')) {
      instructions.addInstruction(new ReturnInstruction(e));
      return;
    } else if (line[0].startsWith('jmp')) {
      instructions.addInstruction(new JumpInstruction(e, line[1].replace(remove, '')));
    } else if (line[0].startsWith('leaq')) {
      instructions.addInstruction(
        new LoadAddressInstruction(
          e,
          this.getWriterAccessor(line[1]),
          this.getWriterAccessor(line[2]),
        ),
      );
    } else if (line[0].startsWith('cmpl')) {
      instructions.addInstruction(
        new CompareInstruction(e, this.getWriterAccessor(line[1]), this.getWriterAccessor(line[2])),
      );
    } else if (line[0].startsWith('cltq')) {
      instructions.addInstruction(
        new SignExtendedMoveInstruction(
          e,
          this.getWriterAccessor('rax') as RegisterAccessor,
          this.getWriterAccessor('eax') as RegisterAccessor,
        ),
      );
    } else if (line[0].endsWith(':')) {
      instructions.addLabel(line[0].slice(0, line[0].length - 1));
    } else {
      throw new Error('cannot parse: ' + line.join(' '));
    }
  }

  private getWriterAccessor(input: string): MemReader & MemWriter {
    return new RegisterAccessor(input.replace(remove, '') as RegisterId);
  }

  private getReaderAccessor(input: string): MemReader {
    if (input.startsWith('$')) {
      return new ImmediateSource(BigInt(parseInt(input.replace(remove, ''), 10)));
    } else {
      const register = input.replace(remove, '') as RegisterId;
      return new RegisterAccessor(register);
    }
  }
}

const remove = /[,%$.]/g;

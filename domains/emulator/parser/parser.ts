import { Emulator } from '../emulator';
import { AddInstruction } from '../instruction/addInstruction';
import { CallInstruction } from '../instruction/callInstruction';
import { CompareInstruction } from '../instruction/compareInstruction';
import { JumpIfLessInstruction } from '../instruction/jumpIfLessInstruction';
import { JumpInstruction } from '../instruction/jumpInstruction';
import { LoadAddressInstruction } from '../instruction/loadAddressInstruction';
import { MoveInstruction } from '../instruction/moveInstruction';
import { PopInstruction } from '../instruction/popInstruction';
import { PushInstruction } from '../instruction/pushInstruction';
import { ReturnInstruction } from '../instruction/returnInstruction';
import { SignExtendedMoveInstruction } from '../instruction/signExtendedMoveInstruction';
import { SubInstruction } from '../instruction/subInstruction';
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
      const bytes = this.parseBytes(line[0][3]);
      instructions.addInstruction(
        new MoveInstruction(
          e,
          this.getReaderAccessor(line[1], bytes),
          this.getWriterAccessor(line[2], bytes),
        ),
      );
      return;
    } else if (line[0].startsWith('add')) {
      const bytes = this.parseBytes(line[0][3]);
      instructions.addInstruction(
        new AddInstruction(
          e,
          this.getReaderAccessor(line[1], bytes),
          this.getWriterAccessor(line[2], bytes),
        ),
      );
      return;
    } else if (line[0].startsWith('sub')) {
      instructions.addInstruction(
        new SubInstruction(e, this.getReaderAccessor(line[1]), this.getWriterAccessor(line[2])),
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
      instructions.addInstruction(new JumpInstruction(e, line[1]));
    } else if (line[0].startsWith('jl')) {
      instructions.addInstruction(new JumpIfLessInstruction(e, line[1]));
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
          this.getWriterAccessor('%rax') as RegisterAccessor,
          this.getWriterAccessor('%eax') as RegisterAccessor,
        ),
      );
    } else if (line[0].endsWith(':')) {
      instructions.addLabel(line[0].slice(0, line[0].length - 1));
    } else {
      throw new Error('cannot parse: ' + line.join(' '));
    }
  }

  private parseBytes(letter: string): number {
    const map: Record<string, number> = { q: 8, l: 4, w: 2, b: 1 };
    return map[letter];
  }

  private getWriterAccessor(input: string, bytes = 8): MemReader & MemWriter {
    return this.parseRegister(input, bytes);
  }

  private getReaderAccessor(input: string, bytes = 8): MemReader {
    if (input.startsWith('$')) {
      return new ImmediateSource(BigInt(parseInt(input.replace(remove, ''), 10)));
    } else {
      return this.parseRegister(input, bytes);
    }
  }

  private parseRegister(input: string, bytes: number): RegisterAccessor {
    if (input.endsWith(',')) {
      input = input.slice(0, input.length - 1);
    }
    if (/,.*,/.test(input)) {
      const regex = /(-?\d+)?\((%[a-z]+)?,(%[a-z]+),(\d+)?\)/;
      const match = input.match(regex);
      if (!match) {
        throw new Error('cannot parse input:' + input);
      }

      const offset = match[1] ? parseInt(match[1], 10) : undefined;
      const isPointer = true;
      const baseRegister = (match[2] ? match[2].replace(remove, '') : '') as RegisterId;
      const indexRegister = match[3].replace(remove, '') as RegisterId;
      const scale = match[4] && parseInt(match[4], 10);

      return new RegisterAccessor(
        baseRegister,
        isPointer,
        offset,
        scale as 1 | 2 | 4 | 8,
        indexRegister,
        bytes,
      );
    }

    const commas = input.match(/,/g);
    if (commas && commas.length == 1) {
      const regex = /(-?\d+)?\((%[a-z]+)?,(%[a-z]+)\)/;
      const match = input.match(regex);
      if (!match) {
        throw new Error('cannot parse input:' + input);
      }

      const offset = match[1] ? parseInt(match[1], 10) : undefined;
      const isPointer = true;
      const baseRegister = match[2] ? (match[2].replace(remove, '') as RegisterId) : '';
      const indexRegister = match[3].replace(remove, '') as RegisterId;
      const scale = match[4] && parseInt(match[4], 10);

      return new RegisterAccessor(
        indexRegister,
        isPointer,
        offset,
        scale as 1 | 2 | 4 | 8,
        baseRegister,
        bytes,
      );
    }

    const regex = /(-?\d+)?(\()?(%[a-z]+)\)?/;
    const match = input.match(regex);
    if (!match) {
      throw new Error('cannot parse input:' + input);
    }

    const offset = match[1] ? parseInt(match[1], 10) : undefined;
    const isPointer = match[2] == '(';
    const baseRegister = match[3].replace(remove, '') as RegisterId;
    const indexRegister = '';
    const scale = 1;

    return new RegisterAccessor(
      baseRegister,
      isPointer,
      offset,
      scale as 1 | 2 | 4 | 8,
      indexRegister,
      bytes,
    );
  }
}

const remove = /[,%$.]/g;

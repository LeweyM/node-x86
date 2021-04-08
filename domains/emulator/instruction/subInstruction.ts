import { Instruction } from './instruction';
import { MemReader, MemWriter } from '../source';
import { Emulator } from '../emulator';
export class SubInstruction implements Instruction {
  left;
  right;
  e: Emulator;
  constructor(e: Emulator, left: MemReader, right: MemReader & MemWriter) {
    this.e = e;
    this.left = left;
    this.right = right;
  }

  execute(): void {
    const leftValue = this.left.read(this.e);
    const rightValue = this.right.read(this.e);

    this.right.write(this.e, rightValue - leftValue);
  }
}

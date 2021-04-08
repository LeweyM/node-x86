import { Instruction } from './instruction';
import { MemReader, MemWriter } from '../source';
import { Emulator } from '../emulator';
export class MoveInstruction implements Instruction {
  left;
  right;
  e: Emulator;
  constructor(e: Emulator, left: MemReader, right: MemWriter) {
    this.e = e;
    this.left = left;
    this.right = right;
  }

  execute(): void {
    this.right.write(this.e, this.left.read(this.e));
  }
}

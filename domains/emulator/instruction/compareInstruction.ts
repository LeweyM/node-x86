import { Instruction } from './instruction';
import { MemReader } from '../memoryAccessors';
import { Emulator } from '../emulator';
export class CompareInstruction implements Instruction {
  left;
  right;
  e: Emulator;
  constructor(e: Emulator, left: MemReader, right: MemReader) {
    this.e = e;
    this.left = left;
    this.right = right;
  }
  execute(): void {
    this.e.zeroCond = this.right.read(this.e) - this.left.read(this.e) == BigInt(0);
    this.e.negativeCond = this.right.read(this.e) - this.left.read(this.e) < BigInt(0);
  }
}

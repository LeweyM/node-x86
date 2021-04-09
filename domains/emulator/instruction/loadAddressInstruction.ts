import { Instruction } from './instruction';
import { MemWriter } from '../memoryAccessors';
import { Emulator } from '../emulator';
export class LoadAddressInstruction implements Instruction {
  left;
  right;
  e: Emulator;
  constructor(e: Emulator, left: MemWriter, right: MemWriter) {
    this.e = e;
    this.left = left;
    this.right = right;
  }
  execute(): void {
    this.right.write(this.e, this.left.address(this.e));
  }
}

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
    const l = this.left.read(this.e);
    const r = this.right.read(this.e);
    const result = r - l;
    this.e.zeroCond = result == BigInt(0);
    // sign bit set to 1 if 2s complement integer is < 0
    this.e.signCond = result < BigInt(0);
    this.setOverflowFlag(l, r);
  }

  private setOverflowFlag(l: bigint, r: bigint) {
    // for 2s complement integers
    // -l because a - b == a + -(b)

    // if summing two negatives produce a positive
    const a = r < 0 && -l < 0 && BigInt.asIntN(this.left.size(), r - l) > BigInt(0);
    // if two positives produce a negative
    const b = r > 0 && -l > 0 && BigInt.asIntN(this.left.size(), r - l) < BigInt(0);
    // set overflow flag

    this.e.overflowCond = a || b;
  }
}

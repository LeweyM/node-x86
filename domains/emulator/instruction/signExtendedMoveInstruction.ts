import { Instruction } from './instruction';
import { RegisterAccessor } from '../memoryAccessors';
import { Emulator } from '../emulator';
export class SignExtendedMoveInstruction implements Instruction {
  left;
  right;
  e: Emulator;
  constructor(e: Emulator, left: RegisterAccessor, right: RegisterAccessor) {
    this.e = e;
    this.left = left;
    this.right = right;
  }

  execute(): void {
    const signExtendedValue = this.signExtend(this.left.read(this.e), this.left.size());
    this.right.write(this.e, signExtendedValue);
  }

  private signExtend(n: bigint, s: number): bigint {
    // console.log('significantbitmask ' + (2 ** s).toString(2));
    const nHex = n.toString(16);
    const nBinary = n.toString(2);
    const sign = nBinary.length == s ? 1 : 0;
    const maskString = String(sign).repeat(64 - s) + '0'.repeat(s);
    const mask = BigInt('0b' + maskString);
    const maskBinary = mask.toString(2);
    console.log({ n });
    console.log({ nHex });
    console.log({ nBinary });
    console.log({ s });
    console.log({ sign });
    console.log({ maskBinary });

    const res = n | mask;
    const resBinary = res.toString(2);
    console.log({ resBinary });
    return res;
  }
}

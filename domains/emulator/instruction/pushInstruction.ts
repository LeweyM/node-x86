import { Instruction } from './instruction';
import { MemReader } from '../memoryAccessors';
import { Emulator } from '../emulator';
import { QuadRegister } from '../registers/registerConfig';
export class PushInstruction implements Instruction {
  left: MemReader;
  e: Emulator;
  constructor(e: Emulator, left: MemReader) {
    this.e = e;
    this.left = left;
  }
  execute(): void {
    const stackPointer = this.e.registers.read(QuadRegister.rsp) - BigInt(8);
    if (stackPointer <= 0) {
      throw new Error('Stack Overflow');
    }
    this.e.registers.write(QuadRegister.rsp, stackPointer);

    this.e.writeBytesToMemory(8, Number(stackPointer), this.left.read(this.e));
  }
}

import { Instruction } from './instruction';
import { MemWriter, RegisterAccessor } from '../memoryAccessors';
import { Emulator } from '../emulator';
import { QuadRegister } from '../registers/registerConfig';
export class PopInstruction implements Instruction {
  left: MemWriter;
  e: Emulator;
  private readonly stackPointerAccessor = new RegisterAccessor(QuadRegister.rsp);
  private readonly valueAtStackPointerAccessor = new RegisterAccessor(QuadRegister.rsp, true);

  constructor(e: Emulator, left: MemWriter) {
    this.e = e;
    this.left = left;
  }
  execute(): void {
    const stackPointer = this.stackPointerAccessor.read(this.e);

    this.left.write(this.e, this.valueAtStackPointerAccessor.read(this.e));
    this.stackPointerAccessor.write(this.e, stackPointer + BigInt(8));
  }
}

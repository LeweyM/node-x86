import { Instruction } from './instruction';
import { Emulator } from '../emulator';
import { QuadRegister } from '../registers/registerConfig';
export class ReturnInstruction implements Instruction {
  e: Emulator;
  constructor(e: Emulator) {
    this.e = e;
  }
  execute(): void {
    const stackPointer = this.e.registers.read(QuadRegister.rsp);

    // pop value off stack
    const stackValue = this.e.memory[Number(stackPointer)];
    // set program counter to value at stack
    this.e.registers.write(QuadRegister.rip, stackValue);

    // increment stack
    this.e.registers.write(QuadRegister.rsp, stackPointer + BigInt(8));
  }
}

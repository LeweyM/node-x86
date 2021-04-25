import { Instruction } from './instruction';
import { Emulator } from '../emulator';
import { QuadRegister } from '../registers/registerConfig';
export class CallInstruction implements Instruction {
  label: string;
  e: Emulator;
  constructor(e: Emulator, label: string) {
    this.e = e;
    this.label = label;
  }
  execute(): void {
    const stackPointer = this.e.registers.read(QuadRegister.rsp) - BigInt(8);
    if (stackPointer <= 0) {
      throw new Error('Stack Overflow');
    }
    // decrement the stack
    this.e.registers.write(QuadRegister.rsp, stackPointer);

    const programCounter = this.e.registers.read(QuadRegister.rip);

    // push the current program counter value onto the stack
    this.e.setMemory(Number(stackPointer), programCounter);

    // jump to byte before instruction at label
    this.e.registers.write(
      QuadRegister.rip,
      BigInt(this.e.instructionSet.getInstructionLocationFromLabel(this.label)) - BigInt(8),
    );
  }
}

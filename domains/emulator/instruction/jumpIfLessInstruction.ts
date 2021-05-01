import { Instruction } from './instruction';
import { Emulator } from '../emulator';
import { QuadRegister } from '../registers/registerConfig';
export class JumpIfLessInstruction implements Instruction {
  label;
  e: Emulator;
  constructor(e: Emulator, label: string) {
    this.e = e;
    this.label = label;
  }

  execute(): void {
    if (this.e.signFlag() != this.e.overflowFlag()) {
      this.e.registers.write(
        QuadRegister.rip,
        BigInt(this.e.instructionSet.getInstructionLocationFromLabel(this.label)) - BigInt(8),
      );
    }
  }
}

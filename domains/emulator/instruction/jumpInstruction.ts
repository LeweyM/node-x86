import { Instruction } from './instruction';
import { Emulator } from '../emulator';
export class JumpInstruction implements Instruction {
  label;
  e: Emulator;
  constructor(e: Emulator, label: string) {
    this.e = e;
    this.label = label;
  }

  execute(): void {
    const nextInstruction = this.e.instructionSet.getInstructionLocationFromLabel(this.label);
    this.e.instructionCounter = nextInstruction - 1;
  }
}

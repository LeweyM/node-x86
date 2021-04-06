/* eslint-disable @typescript-eslint/no-unused-vars */
import { Instruction, LabelInstructionArg } from './instruction';
import { Emulator } from '../emulator';
export class JumpInstruction extends Instruction {
  left;
  constructor(left: LabelInstructionArg) {
    super();
    this.left = left;
  }

  execute(e: Emulator): void {
    const nextInstruction = e.instructionSet.getInstructionLocationFromLabel(this.left.label);
    e.instructionCounter = nextInstruction - 1;
  }
}

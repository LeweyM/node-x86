import {
  Instruction,
  InstructionArgType,
  LeftInstructionArg,
  RightInstructionArg,
} from './instruction';
import { Emulator } from '../emulator';
export class SubInstruction extends Instruction {
  left;
  right;
  constructor(left: LeftInstructionArg, right: RightInstructionArg) {
    super();
    this.left = left;
    this.right = right;
  }

  execute(e: Emulator): void {
    const newValue = super.getLeftValue(e, this.left);

    if (this.right.type == InstructionArgType.REGISTER) {
      const target = this.right.value;
      e.setRegister(target, e.registers[target] - newValue);
    }
    if (this.right.type == InstructionArgType.POINTER) {
      const memAddress = e.registers[this.right.value];
      e.setMemory(memAddress, e.memory[memAddress] - newValue);
    }
  }
}

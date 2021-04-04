import {
  Instruction,
  InstructionArgType,
  LeftInstructionArg,
  RightInstructionArg,
} from './instruction';
import { Emulator } from '../emulator';
export class MoveInstruction extends Instruction implements Instruction {
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
      e.setRegister(target, newValue);
    }
    if (this.right.type == InstructionArgType.POINTER) {
      const memAddress = e.registers[this.right.value];
      e.setMemory(memAddress, newValue);
    }
  }
}

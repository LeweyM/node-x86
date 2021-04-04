import {
  Instruction,
  InstructionArgType,
  LeftInstructionArg,
  RightInstructionArg,
} from './instruction';
import { Emulator } from '../emulator';
export class MoveInstruction implements Instruction {
  left;
  right;
  constructor(left: LeftInstructionArg, right: RightInstructionArg) {
    this.left = left;
    this.right = right;
  }

  execute(e: Emulator): void {
    let newValue;
    switch (this.left.type) {
      case InstructionArgType.CONSTANT:
        newValue = this.left.value;
        break;
      case InstructionArgType.REGISTER:
        newValue = e.registers[this.left.value];
        break;
    }

    if (this.right.type == InstructionArgType.REGISTER) {
      const target = this.right.value;
      e.setRegister(target, newValue);
    }
    if (this.right.type == InstructionArgType.POINTER) {
      const memAddress = e.registers[this.right.value];
      e.memory[memAddress] = newValue;
    }
  }
}

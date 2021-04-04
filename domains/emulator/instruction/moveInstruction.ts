import { Instruction } from './instruction';
import { Emulator } from '../emulator';
export class MoveInstruction implements Instruction {
  left;
  right;
  constructor(left: string, right: string) {
    this.left = left;
    this.right = right;
  }
  execute(e: Emulator): void {
    let rightValue;
    if (isNumeric(this.right)) {
      rightValue = parseInt(this.right, 10);
    } else {
      rightValue = e.registers[this.right];
    }

    e.setRegister(this.left, rightValue);
  }
}

function isNumeric(rightValue: any) {
  return !isNaN(rightValue);
}

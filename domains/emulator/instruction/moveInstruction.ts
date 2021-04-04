import { Instruction, InstructionArg } from './instruction';
import { Emulator } from '../emulator';
export class MoveInstruction implements Instruction {
  left;
  right;
  private constructor(left: InstructionArg, right: InstructionArg) {
    this.left = left;
    this.right = right;
  }

  static ConstToPtr(constant: number, register: string): MoveInstruction {
    return new MoveInstruction(
      { type: 'constant', value: constant },
      { type: 'pointer', value: register },
    );
  }

  static ConstToRegister(constant: number, register: string): MoveInstruction {
    return new MoveInstruction(
      { type: 'constant', value: constant },
      { type: 'register', value: register },
    );
  }

  static RegisterToRegister(register1: string, register2: string): MoveInstruction {
    return new MoveInstruction(
      { type: 'register', value: register1 },
      { type: 'register', value: register2 },
    );
  }
  execute(e: Emulator): void {
    let newValue;
    if (this.left.type == 'constant') {
      newValue = this.left.value;
    }
    if (this.left.type == 'register') {
      newValue = e.registers[this.left.value];
    }

    if (this.right.type == 'register') {
      const target = this.right.value;
      e.setRegister(target, newValue);
    }
    if (this.right.type == 'pointer') {
      const memAddress = e.registers[this.right.value];
      e.setMemory(memAddress, newValue);
    }
  }
}

import { AddInstruction } from './addInstruction';
import {
  Instruction,
  InstructionArgType,
  InstructionType,
  LeftInstructionArg,
  RightInstructionArg,
} from './instruction';
import { MoveInstruction } from './moveInstruction';

export class InstructionFactory {
  static buildConstToRegister(
    type: InstructionType,
    constant: number,
    register: string,
  ): Instruction {
    const lhs: LeftInstructionArg = { type: InstructionArgType.CONSTANT, value: constant };
    const rhs: RightInstructionArg = { type: InstructionArgType.REGISTER, value: register };
    return InstructionFactory.createInstruction(type, lhs, rhs);
  }

  static buildRegisterToRegister(
    type: InstructionType,
    register1: string,
    register2: string,
  ): Instruction {
    const lhs: LeftInstructionArg = { type: InstructionArgType.REGISTER, value: register1 };
    const rhs: RightInstructionArg = { type: InstructionArgType.REGISTER, value: register2 };
    return InstructionFactory.createInstruction(type, lhs, rhs);
  }
  static buildConstToPointer(
    type: InstructionType,
    constant: number,
    pointer: string,
  ): Instruction {
    const lhs: LeftInstructionArg = { type: InstructionArgType.CONSTANT, value: constant };
    const rhs: RightInstructionArg = { type: InstructionArgType.POINTER, value: pointer };
    return InstructionFactory.createInstruction(type, lhs, rhs);
  }
  private static createInstruction(
    type: InstructionType,
    lhs: LeftInstructionArg,
    rhs: RightInstructionArg,
  ) {
    switch (type) {
      case InstructionType.ADD:
        return new AddInstruction(lhs, rhs);
      case InstructionType.MOVE:
        return new MoveInstruction(lhs, rhs);
    }
  }
}

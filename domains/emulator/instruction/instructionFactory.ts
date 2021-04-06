import { AddInstruction } from './addInstruction';
import {
  Instruction,
  InstructionArgType,
  ArithmeticInstructionType,
  LeftInstructionArg,
  RightInstructionArg,
  SingleInstructionArg,
  InstructionType,
} from './instruction';
import { JumpInstruction } from './jumpInstruction';
import { MoveInstruction } from './moveInstruction';
import { SubInstruction } from './subInstruction';

export class InstructionFactory {
  static build(type: InstructionType, label: string): Instruction {
    const arg: SingleInstructionArg = { type: InstructionArgType.LABEL, label: label };
    return InstructionFactory.createInstruction(type, arg);
  }
  static buildConstToRegister(
    type: ArithmeticInstructionType,
    constant: number,
    register: string,
  ): Instruction {
    const lhs: LeftInstructionArg = { type: InstructionArgType.CONSTANT, value: constant };
    const rhs: RightInstructionArg = { type: InstructionArgType.REGISTER, value: register };
    return InstructionFactory.createArithmeticInstruction(type, lhs, rhs);
  }

  static buildRegisterToRegister(
    type: ArithmeticInstructionType,
    register1: string,
    register2: string,
  ): Instruction {
    const lhs: LeftInstructionArg = { type: InstructionArgType.REGISTER, value: register1 };
    const rhs: RightInstructionArg = { type: InstructionArgType.REGISTER, value: register2 };
    return InstructionFactory.createArithmeticInstruction(type, lhs, rhs);
  }
  static buildConstToPointer(
    type: ArithmeticInstructionType,
    constant: number,
    pointer: string,
  ): Instruction {
    const lhs: LeftInstructionArg = { type: InstructionArgType.CONSTANT, value: constant };
    const rhs: RightInstructionArg = { type: InstructionArgType.POINTER, value: pointer };
    return InstructionFactory.createArithmeticInstruction(type, lhs, rhs);
  }
  private static createArithmeticInstruction(
    type: ArithmeticInstructionType,
    lhs: LeftInstructionArg,
    rhs: RightInstructionArg,
  ) {
    switch (type) {
      case ArithmeticInstructionType.ADD:
        return new AddInstruction(lhs, rhs);
      case ArithmeticInstructionType.MOVE:
        return new MoveInstruction(lhs, rhs);
      case ArithmeticInstructionType.SUB:
        return new SubInstruction(lhs, rhs);
    }
  }
  private static createInstruction(type: InstructionType, lhs: SingleInstructionArg) {
    switch (type) {
      case InstructionType.JUMP:
        return new JumpInstruction(lhs);
    }
  }
}

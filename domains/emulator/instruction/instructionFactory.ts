import { AddInstruction } from './addInstruction';
import * as instruction from './instruction';
import { JumpInstruction } from './jumpInstruction';
import { SubInstruction } from './subInstruction';

export class InstructionFactory {
  static build(type: instruction.InstructionType, label: string): instruction.Instruction {
    const arg: instruction.SingleInstructionArg = {
      type: instruction.InstructionArgType.LABEL,
      label: label,
    };
    return InstructionFactory.createInstruction(type, arg);
  }
  static buildConstToRegister(
    type: instruction.ArithmeticInstructionType,
    constant: number,
    register: string,
  ): instruction.Instruction {
    const lhs: instruction.LeftInstructionArg = {
      type: instruction.InstructionArgType.CONSTANT,
      value: constant,
    };
    const rhs: instruction.RightInstructionArg = {
      type: instruction.InstructionArgType.REGISTER,
      value: register,
    };
    return InstructionFactory.createArithmeticInstruction(type, lhs, rhs);
  }

  static buildRegisterToRegister(
    type: instruction.ArithmeticInstructionType,
    register1: string,
    register2: string,
  ): instruction.Instruction {
    const lhs: instruction.LeftInstructionArg = {
      type: instruction.InstructionArgType.REGISTER,
      value: register1,
    };
    const rhs: instruction.RightInstructionArg = {
      type: instruction.InstructionArgType.REGISTER,
      value: register2,
    };
    return InstructionFactory.createArithmeticInstruction(type, lhs, rhs);
  }
  static buildConstToPointer(
    type: instruction.ArithmeticInstructionType,
    constant: number,
    pointer: string,
  ): instruction.Instruction {
    const lhs: instruction.LeftInstructionArg = {
      type: instruction.InstructionArgType.CONSTANT,
      value: constant,
    };
    const rhs: instruction.RightInstructionArg = {
      type: instruction.InstructionArgType.POINTER,
      value: pointer,
    };
    return InstructionFactory.createArithmeticInstruction(type, lhs, rhs);
  }
  private static createArithmeticInstruction(
    type: instruction.ArithmeticInstructionType,
    lhs: instruction.LeftInstructionArg,
    rhs: instruction.RightInstructionArg,
  ) {
    switch (type) {
      case instruction.ArithmeticInstructionType.ADD:
        return new AddInstruction(lhs, rhs);
      case instruction.ArithmeticInstructionType.MOVE:
        throw new Error('move should not use the factory. workaround!');
      case instruction.ArithmeticInstructionType.SUB:
        return new SubInstruction(lhs, rhs);
    }
  }
  private static createInstruction(
    type: instruction.InstructionType,
    lhs: instruction.SingleInstructionArg,
  ) {
    switch (type) {
      case instruction.InstructionType.JUMP:
        return new JumpInstruction(lhs);
    }
  }
}

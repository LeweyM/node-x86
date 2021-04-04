import { Emulator } from '../emulator';

export interface Instruction {
  execute(e: Emulator): void;
}

export abstract class Instruction {
  getLeftValue(e: Emulator, left: LeftInstructionArg): number {
    switch (left.type) {
      case InstructionArgType.CONSTANT:
        return left.value;
      case InstructionArgType.REGISTER:
        return e.registers[left.value];
    }
  }
}

export enum InstructionType {
  MOVE,
  ADD,
  SUB,
}

export type LeftInstructionArg = ConstantInstructionArg | RegisterInstructionArg;
export type RightInstructionArg = RegisterInstructionArg | PointerInstructionArg;

export type ConstantInstructionArg = {
  type: InstructionArgType.CONSTANT;
  value: number;
};

export type RegisterInstructionArg = {
  type: InstructionArgType.REGISTER;
  value: string;
};

export type PointerInstructionArg = {
  type: InstructionArgType.POINTER;
  value: string;
};
export enum InstructionArgType {
  CONSTANT,
  REGISTER,
  POINTER,
}

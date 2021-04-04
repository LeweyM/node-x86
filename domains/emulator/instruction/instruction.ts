import { Emulator } from '../emulator';

export interface Instruction {
  execute(e: Emulator): void;
}
export type InstructionArg = {
  type: string;
  value: any;
};

export enum InstructionType {
  MOVE,
  ADD,
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

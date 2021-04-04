import { Emulator } from '../emulator';

export interface Instruction {
  execute(e: Emulator): void;
}
export type InstructionArg = {
  type: string;
  value: any;
};

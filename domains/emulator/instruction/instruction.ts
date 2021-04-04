import { Emulator } from './emulator';

export interface Instruction {
  execute(e: Emulator): void;
}

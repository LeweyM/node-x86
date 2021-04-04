import { Instruction } from './instruction/instruction';

export class InstructionSet {
  instructions: Array<Instruction>;
  constructor() {
    this.instructions = [];
  }

  add(instruction: Instruction): void {
    this.instructions.push(instruction);
  }

  process(): void {
    const nextInstruction = this.getNextInstruction();
    return;
  }
  getNextInstruction(): Instruction {
    const sp = this.emulator.getStackPointer();
    return this.instructions[sp];
  }
}

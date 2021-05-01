import { Instruction } from './instruction/instruction';

export class InstructionSet {
  instructions: Instruction[];
  labels: Record<string, number>;

  constructor() {
    this.instructions = [];
    this.labels = {};
  }
  addInstruction(i: Instruction): void {
    this.instructions.push(i);
  }

  addLabel(label: string): void {
    this.labels[label] = this.instructions.length;
  }

  getInstruction(n: number): Instruction {
    const i = n / 8;
    return this.instructions[i];
  }

  getInstructionLocationFromLabel(l: string): number {
    const instructionIndex = this.labels[l] * 8;
    if (isNaN(instructionIndex)) {
      throw new Error('Cannot process label: ' + l);
    }
    return instructionIndex;
  }

  hasInstruction(n: number): boolean {
    const i = n / 8;
    return i >= 0 && i < this.instructions.length;
  }
}

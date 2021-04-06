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
    return this.instructions[n];
  }

  getInstructionLocationFromLabel(l: string): number {
    return this.labels[l];
  }

  hasInstruction(n: number): boolean {
    return n >= 0 && n < this.instructions.length;
  }
}

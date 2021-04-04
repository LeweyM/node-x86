import { Instruction } from './instruction/instruction';

export class Emulator {
  registers: Record<string, number>;
  instructions: Instruction[];
  instructionCounter = -1;
  constructor(instructions: Instruction[]) {
    this.registers = {
      rax: 0,
      rbx: 0,
    };
    this.instructions = instructions;
  }

  setRegister(reg: string, val: number): void {
    this.registers[reg] = val;
    return;
  }

  step(): void {
    this.instructionCounter++;
    this.instructions[this.instructionCounter].execute(this);
  }
}

import { Instruction } from './instruction/instruction';

export class Emulator {
  registers: Record<string, number>;
  instructions: Instruction[];
  instructionCounter = 0;
  memory = new Array(100);
  constructor(instructions: Instruction[]) {
    this.registers = {
      rax: 0,
      rbx: 0,
    };
    this.instructions = instructions;
    this.memory.fill(0);
  }

  setRegister(reg: string, val: number): void {
    this.registers[reg] = val;
  }

  setMemory(address: number, val: number): void {
    this.memory[address] = val;
  }

  step(): void {
    this.instructions[this.instructionCounter].execute(this);
    this.instructionCounter++;
  }
}

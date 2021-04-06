import { InstructionSet } from './instructionSet';

export class Emulator {
  registers: Record<string, number>;
  instructionSet: InstructionSet;
  instructionCounter = 0;
  memory = new Array(100);
  constructor(instructionSet: InstructionSet) {
    this.registers = {
      rax: 0,
      rbx: 0,
      eax: 0,
    };
    this.instructionSet = instructionSet;
    this.memory.fill(0);
  }

  setRegister(reg: string, val: number): void {
    this.registers[reg] = val;
  }

  setMemory(address: number, val: number): void {
    this.memory[address] = val;
  }

  step(): void {
    this.instructionSet.getInstruction(this.instructionCounter).execute(this);
    this.instructionCounter++;
  }

  run(): void {
    while (this.instructionSet.hasInstruction(this.instructionCounter)) {
      this.step();
    }
  }
}

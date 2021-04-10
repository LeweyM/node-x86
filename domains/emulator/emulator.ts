import { InstructionSet } from './instructionSet';

export class Emulator {
  registers: Record<string, bigint>;
  instructionSet: InstructionSet;
  instructionCounter = 0;
  memory: bigint[] = new Array(100);
  constructor(instructionSet: InstructionSet) {
    this.registers = {
      rax: BigInt(0),
      rbx: BigInt(0),
      eax: BigInt(0),
    };
    this.instructionSet = instructionSet;
    this.memory.fill(BigInt(0));
  }

  setRegister(reg: string, val: bigint): void {
    this.registers[reg] = val;
  }

  setMemory(address: number, val: bigint): void {
    this.memory[address] = val;
  }

  step(): void {
    this.instructionSet.getInstruction(this.instructionCounter).execute();
    this.instructionCounter++;
  }

  run(): void {
    while (this.instructionSet.hasInstruction(this.instructionCounter)) {
      this.step();
    }
  }
}

import { InstructionSet } from './instructionSet';
import { Registers } from './registers';
import { RegisterId } from './registerTypes';

export class Emulator {
  registers: Registers;
  instructionSet: InstructionSet;
  instructionCounter = 0;
  memory: bigint[] = new Array(100);
  constructor(instructionSet: InstructionSet) {
    this.registers = new Registers();
    this.instructionSet = instructionSet;
    this.memory.fill(BigInt(0));
  }

  setRegister(reg: RegisterId, val: bigint): void {
    this.registers.write(reg, val);
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

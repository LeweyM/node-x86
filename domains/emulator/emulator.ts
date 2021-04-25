import { InstructionSet } from './instructionSet';
import { Registers } from './registers/registers';
import { QuadRegister, RegisterId } from './registers/registerConfig';

export class Emulator {
  registers: Registers;
  instructionSet: InstructionSet;
  memory: bigint[] = new Array(100);
  zeroCond: boolean;
  negativeCond: boolean;
  constructor(instructionSet: InstructionSet) {
    this.registers = new Registers();
    this.instructionSet = instructionSet;
    this.memory.fill(BigInt(0));
    this.zeroCond = false;
    this.negativeCond = false;
  }

  setRegister(reg: RegisterId, val: bigint): void {
    this.registers.write(reg, val);
  }

  setMemory(address: number, val: bigint): void {
    this.memory[address] = val;
  }

  zeroCondition(): boolean {
    return this.zeroCond;
  }
  negativeCondition(): boolean {
    return this.negativeCond;
  }

  step(): void {
    const instruction = this.instructionSet.getInstruction(
      Number(this.registers.read(QuadRegister.rip)),
    );
    instruction.execute();
    this.registers.write(QuadRegister.rip, this.registers.read(QuadRegister.rip) + BigInt(8));
  }
  run(): void {
    while (this.instructionSet.hasInstruction(Number(this.registers.read(QuadRegister.rip)))) {
      this.step();
    }
  }
}

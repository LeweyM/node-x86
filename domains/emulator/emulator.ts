import { InstructionSet } from './instructionSet';
import { Registers } from './registers/registers';
import { QuadRegister, RegisterId } from './registers/registerConfig';

export class Emulator {
  registers: Registers;
  instructionSet: InstructionSet;
  memory: bigint[] = new Array(100);
  zeroCond: boolean;
  overflowCond: boolean;
  signCond: boolean;
  constructor(instructionSet: InstructionSet) {
    this.registers = new Registers();
    this.instructionSet = instructionSet;
    this.memory.fill(BigInt(0));
    this.overflowCond = false;
    this.zeroCond = false;
    this.signCond = false;
  }

  setRegister(reg: RegisterId, val: bigint): void {
    this.registers.write(reg, val);
  }

  setMemory(address: number, val: bigint): void {
    this.memory[address] = val;
  }

  zeroFlag(): boolean {
    return this.zeroCond;
  }
  signFlag(): boolean {
    return this.signCond;
  }
  overflowFlag(): boolean {
    return this.overflowCond;
  }

  step(): void {
    console.log(this.registers.read(QuadRegister.rip));
    const instruction = this.instructionSet.getInstruction(
      Number(this.registers.read(QuadRegister.rip)),
    );
    console.log('EXECUTING: ', instruction.constructor.name);
    instruction.execute();
    console.log('FINISHED EXECUTING');
    this.registers.write(QuadRegister.rip, this.registers.read(QuadRegister.rip) + BigInt(8));
    console.log('REG: ', this.registers);
    console.log(
      'MEM: ',
      this.memory.map((v, i) => ({ index: i, value: v })).filter((v) => v.value > 0),
    );
    // console.log(this);
  }
  run(): void {
    console.log(this);
    // console.log(this.instructionSet.getInstruction(32));
    while (this.instructionSet.hasInstruction(Number(this.registers.read(QuadRegister.rip)))) {
      this.step();
    }
  }
}

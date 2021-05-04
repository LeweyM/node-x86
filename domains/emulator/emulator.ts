import { InstructionSet } from './instructionSet';
import { allRegisters, QuadRegister } from './registers/registerConfig';
import { Registers } from './registers/registers';

export class Emulator {
  registers: Registers;
  instructionSet: InstructionSet;
  bytes: Uint8Array = new Uint8Array(1000);
  zeroCond: boolean;
  overflowCond: boolean;
  signCond: boolean;
  constructor(instructionSet: InstructionSet) {
    this.registers = new Registers();
    this.instructionSet = instructionSet;
    this.overflowCond = false;
    this.zeroCond = false;
    this.signCond = false;
  }

  writeBytesToMemory(_bytes: number, address: number, val: bigint): void {
    for (let i = 0; i < _bytes; i++) {
      const mask: bigint = (BigInt(2) ** BigInt(8) - BigInt(1)) << BigInt(8 * i);
      const res = (val & BigInt(mask)) >> BigInt(8 * i);
      const index = address + _bytes - (i + 1);
      this.bytes[index] = Number(res);
    }
  }
  readBytesFromMemory(_bytes: number, address: bigint): bigint {
    let v = BigInt.asIntN(_bytes * 8, BigInt(0));
    for (let i = 0; i < _bytes; i++) {
      const byte = BigInt(this.bytes[Number(address) + i]);
      v += byte << BigInt(8 * (_bytes - 1 - i));
    }
    return v;
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
    console.log('======================= EXECUTING: ', instruction.constructor.name);
    instruction.execute();
    console.log('FINISHED EXECUTING');
    this.registers.write(QuadRegister.rip, this.registers.read(QuadRegister.rip) + BigInt(8));
    console.log(
      'REG: ',
      this.registers.registerData.reduce<any>((prev, curr, i) => {
        if (curr > BigInt(0)) {
          prev[Object.keys(allRegisters).slice(0, 17)[i]] = curr;
        }
        return prev;
      }, {}),
    );
    console.log(
      'MEM: ',
      Array.from(this.bytes)
        .map((v, i) => ({ index: i, value: v }))
        .filter((v) => v.value > 0)
        .map((v) => ({ index: v.index, value: v.value.toString(16) })),
    );
  }
  run(): void {
    console.log(this);
    // console.log(this.instructionSet.getInstruction(32));
    while (this.instructionSet.hasInstruction(Number(this.registers.read(QuadRegister.rip)))) {
      this.step();
    }
  }
}

import { InstructionSet } from './instructionSet';
import { Registers } from './registers/registers';
import { allRegisters, QuadRegister, RegisterId } from './registers/registerConfig';

export class Emulator {
  registers: Registers;
  instructionSet: InstructionSet;
  memory: bigint[] = new Array(1000);
  bytes: Uint8Array = new Uint8Array(1000);
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
    // and
    this.bytes[address] = Number(BigInt.asUintN(8, val));
  }

  writeBytesToMemory(_bytes: number, address: number, val: bigint): void {
    for (let i = 0; i < _bytes; i++) {
      const mask: bigint = (BigInt(2) ** BigInt(8) - BigInt(1)) << BigInt(8 * i);
      const res = (val & BigInt(mask)) >> BigInt(8 * i);

      console.log('mask:', mask.toString(16));
      console.log('val:', val.toString(16));
      console.log('res:', res.toString(16));
      this.bytes[address + _bytes - (i + 1)] = Number(res);
    }
  }
  readMemory(address: bigint): bigint {
    return this.memory[Number(address)];
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
      this.memory.map((v, i) => ({ index: i, value: v })).filter((v) => v.value > 0),
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

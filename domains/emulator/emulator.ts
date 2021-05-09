import { InstructionSet } from './instructionSet';
import { allRegisters, QuadRegister } from './registers/registerConfig';
import { Registers } from './registers/registers';

export class Emulator {
  registers: Registers;
  instructionSet: InstructionSet;
  bytes: Uint8Array = new Uint8Array(800);
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
    console.log('writeBytesToMemory');
    console.log({ _bytes });
    console.log({ address });
    console.log({ val });

    const valHex = val.toString(16).padStart(_bytes * 2, '0');
    console.log({ valHex });
    const reversedValhex = reverseBytes(valHex);
    console.log({ reversedValhex });
    for (let i = 0; i < _bytes; i++) {
      const index = address + i;
      const hex = '0x' + reversedValhex[i * 2] + reversedValhex[i * 2 + 1];
      this.bytes[index] = Number(hex);
    }
  }
  readBytesFromMemory(_bytes: number, address: bigint): bigint {
    console.log('readBytesFromMemory');
    console.log({ _bytes });
    console.log({ address });

    let binaryString = '';
    for (let i = 0; i < _bytes; i++) {
      const hex = this.bytes[Number(address) + i].toString(16);
      binaryString += hex.padStart(2, '0');
    }
    binaryString = '0x' + reverseBytes(binaryString);
    console.log({ binaryString });
    console.log({ numBinaryString: BigInt(binaryString) });
    return BigInt(binaryString);
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
          prev[Object.keys(allRegisters).slice(0, 17)[i]] = curr.toString(16);
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

function reverseBytes(input: string): string {
  const bytes = [];
  const hex = input.split('');
  for (let i = 0; i < hex.length; i += 2) {
    const char1 = hex[i];
    const char2 = hex[i + 1];
    bytes.push([char1, char2]);
  }
  let res: string[] = [];
  bytes.reverse().forEach((a) => (res = res.concat(a)));

  return res.join('');
}

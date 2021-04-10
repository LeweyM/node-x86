import {
  QuadRegister,
  DoubleRegister,
  RegisterId,
  WordRegister,
  ByteRegister,
} from './registerTypes';

type Register = {
  registerIndex: number;
  size: 8 | 16 | 32 | 64;
};

export class Registers {
  registerData: bigint[];
  registers: Record<RegisterId, Register>;
  constructor() {
    this.registerData = Array(16).fill(BigInt(0));
    this.registers = {
      // quad
      [QuadRegister.rax]: { registerIndex: 0, size: 64 },
      [QuadRegister.rbx]: { registerIndex: 1, size: 64 },
      // double
      [DoubleRegister.eax]: { registerIndex: 0, size: 32 },
      [DoubleRegister.ebx]: { registerIndex: 1, size: 32 },
      // word
      [WordRegister.ax]: { registerIndex: 0, size: 16 },
      [WordRegister.bx]: { registerIndex: 1, size: 16 },
      // byte
      [ByteRegister.al]: { registerIndex: 0, size: 8 },
      [ByteRegister.bl]: { registerIndex: 1, size: 8 },
    };
  }

  read(registerName: RegisterId): bigint {
    const register = this.registers[registerName];
    const registerValue = this.registerData[register.registerIndex];
    const mask = BigInt(2 ** register.size) - BigInt(1);
    const endBits = mask & registerValue;
    return endBits;
  }

  write(registerName: RegisterId, value: bigint): void {
    const register = this.registers[registerName];
    const originalValue = this.registerData[register.registerIndex];
    const overwrittenValue = this.overwriteEnd(register.size, originalValue, value);
    this.registerData[register.registerIndex] = overwrittenValue;
  }

  private overwriteEnd(bytes: number, newEnd: bigint, value: bigint) {
    const valueWithZeroedEnd = (newEnd >> BigInt(bytes)) << BigInt(bytes);
    const valueWithNewEnd = valueWithZeroedEnd ^ value;
    return valueWithNewEnd;
  }
}

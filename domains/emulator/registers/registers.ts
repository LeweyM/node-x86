import { allRegisters as AllRegisters, RegisterId } from './registerConfig';

export class Registers {
  registerData: bigint[];
  constructor() {
    this.registerData = Array(17).fill(BigInt(0));
  }

  read(registerName: RegisterId): bigint {
    const register = AllRegisters[registerName];
    const registerData = this.registerData[register.registerIndex];
    return this.lowerOrderBits(register.size, registerData);
  }
  write(registerName: RegisterId, value: bigint): void {
    const register = AllRegisters[registerName];
    const originalValue = this.registerData[register.registerIndex];

    // 32 and 64 bit instructions zero out higher order bits
    if (register.size >= 32) {
      this.registerData[register.registerIndex] = value;
    } else {
      const overwrittenValue = this.overwriteHigherOrderBits(register.size, originalValue, value);
      this.registerData[register.registerIndex] = overwrittenValue;
    }
  }

  private lowerOrderBits(bytes: number, value: bigint) {
    const mask = BigInt(2 ** bytes) - BigInt(1);
    const endBits = mask & value;
    return endBits;
  }
  private overwriteHigherOrderBits(bytes: number, newEnd: bigint, value: bigint) {
    const valueWithZeroedEnd = (newEnd >> BigInt(bytes)) << BigInt(bytes);
    const valueWithNewEnd = valueWithZeroedEnd ^ value;
    return valueWithNewEnd;
  }
}
